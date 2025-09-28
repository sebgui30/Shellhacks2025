import {
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import * as Notifications from 'expo-notifications';
import { Notification } from 'expo-notifications';
import { registerForPushNotifications } from '../lib/notifications';
import { useSession } from './SessionProvider';

type RegistrationStatus = 'idle' | 'registering' | 'registered' | 'error';
type NotificationPermissionState = 'granted' | 'denied' | 'undetermined';

interface NotificationContextValue {
    status: RegistrationStatus;
    permission: NotificationPermissionState;
    lastNotification: Notification | null;
    errorMessage?: string;
    markNotificationConsumed: () => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider = ({ children }: PropsWithChildren) => {
    const { session } = useSession();
    const [status, setStatus] = useState<RegistrationStatus>('idle');
    const [permission, setPermission] = useState<NotificationPermissionState>('undetermined');
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [lastNotification, setLastNotification] = useState<Notification | null>(null);

    useEffect(() => {
        const receivedSub = Notifications.addNotificationReceivedListener((notification) => {
            setLastNotification(notification);
        });

        return () => {
            receivedSub.remove();
        };
    }, []);

    useEffect(() => {
        const userId = session?.user?.id;
        if (!userId) {
            setStatus('idle');
            setPermission('undetermined');
            setErrorMessage(undefined);
            setLastNotification(null);
            return;
        }

        let cancelled = false;

        const runRegistration = async () => {
            setStatus('registering');
            const result = await registerForPushNotifications(userId);

            if (cancelled) return;

            setPermission(result.permission);
            if (result.expoPushToken) {
                setStatus('registered');
                setErrorMessage(undefined);
            } else {
                setStatus('error');
                setErrorMessage(result.errorMessage ?? 'Unable to register for push notifications.');
            }
        };

        runRegistration();

        return () => {
            cancelled = true;
        };
    }, [session?.user?.id]);

    const markNotificationConsumed = useCallback(() => {
        setLastNotification(null);
    }, []);

    const value = useMemo<NotificationContextValue>(
        () => ({
            status,
            permission,
            lastNotification,
            errorMessage,
            markNotificationConsumed,
        }),
        [status, permission, lastNotification, errorMessage, markNotificationConsumed],
    );

    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};