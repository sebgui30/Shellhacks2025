import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { supabase } from './supabase';

type NotificationPermissionState = 'granted' | 'denied' | 'undetermined';

export interface PushRegistrationResult {
    permission: NotificationPermissionState;
    expoPushToken?: string;
    errorMessage?: string;
  }

  const ANDROID_CHANNEL_ID = 'default';

  async function ensureAndroidChannel() {
    if (Platform.OS !== 'android') return;

    await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
      name: 'General',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  export async function requestNotificationPermission(): Promise<NotificationPermissionState> {
    if (!Device.isDevice) {
      console.warn('Push notifications need a physical device.');
      return 'denied';
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    if (existingStatus === 'granted') return 'granted';

    const { status } = await Notifications.requestPermissionsAsync();
    return status;
  }

  export async function registerForPushNotifications(userId: string): Promise<PushRegistrationResult> {
    try {
      const permission = await requestNotificationPermission();
      if (permission !== 'granted') {
        return { permission, errorMessage: 'Notifications permission not granted.' };
      }

      await ensureAndroidChannel();

      const projectId = Notifications.getExpoPushTokenAsync.length > 0
        ? undefined
        : { projectId: process.env.EXPO_PUBLIC_EXPO_PROJECT_ID ?? undefined };

      const expoPushToken = (
        await Notifications.getExpoPushTokenAsync(projectId)
      ).data;

      await upsertPushToken(userId, expoPushToken);

      return { permission, expoPushToken };
    } catch (error) {
      console.error('Failed to register push notifications', error);
      return { permission: 'denied', errorMessage: (error as Error).message };
    }
  }

  export async function upsertPushToken(userId: string, expoPushToken: string) {
    const deviceOs = Platform.OS;

    const { error } = await supabase.from('push_subscriptions').upsert(
      {
        user_id: userId,
        expo_token: expoPushToken,
        device_os: deviceOs,
        last_seen_at: new Date().toISOString(),
        is_active: true,
      },
      { onConflict: 'expo_token' },
    );

    if (error) throw error;
  }

  export async function deactivatePushToken(expoPushToken: string) {
    const { error } = await supabase.from('push_subscriptions').update(
      { is_active: false },
    ).eq('expo_token', expoPushToken);

    if (error) throw error;
}