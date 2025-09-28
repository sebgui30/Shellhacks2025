import { useEffect, useMemo, useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { useProfileContext } from '../../providers/ProfileProvider';
import { useNotifications } from '../../providers/NotificationProvider';

type NotificationBanner = {
  title: string;
  body?: string;
};

export const HomeScreen = () => {
  const { profile } = useProfileContext();
  const { lastNotification, status, permission, errorMessage, markNotificationConsumed } = useNotifications();
  const [banner, setBanner] = useState<NotificationBanner | null>(null);

  useEffect(() => {
    if (!lastNotification) return;

    const { title, body: notificationBody } = lastNotification.request.content;
    setBanner({
      title: title ?? 'New notification',
      body: notificationBody ?? undefined,
    });

    markNotificationConsumed();
  }, [lastNotification, markNotificationConsumed]);

  useEffect(() => {
    if (!banner) return;

    const timeout = setTimeout(() => {
      setBanner(null);
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [banner]);

  const bannerContent = useMemo(() => {
    if (banner) return banner;

    if (status === 'error') {
      return {
        title: 'Push notifications inactive',
        body: errorMessage ?? 'We were unable to register this device.',
      } satisfies NotificationBanner;
    }

    if (permission === 'denied') {
      return {
        title: 'Notifications blocked',
        body: 'Enable notifications in settings to see match and chat alerts.',
      } satisfies NotificationBanner;
    }

    return null;
  }, [banner, status, permission, errorMessage]);

  const handleDismissBanner = () => {
    setBanner(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 gap-4 px-6">
        {bannerContent ? (
          <View className="mt-6 rounded-2xl bg-primary/90 px-5 py-4">
            <Text className="text-sm font-semibold text-white">{bannerContent.title}</Text>
            {bannerContent.body ? (
              <Text className="mt-1 text-xs text-white/80">{bannerContent.body}</Text>
            ) : null}
            <Pressable onPress={handleDismissBanner} className="mt-3 self-end">
              <Text className="text-[11px] font-semibold uppercase tracking-[1px] text-white/70">Dismiss</Text>
            </Pressable>
          </View>
        ) : null}

        <View className="flex-1 items-center justify-center gap-4">
          <Text className="text-sm uppercase tracking-[4px] text-primary/80">Matches coming soon</Text>
          <Text className="text-center text-3xl font-semibold text-white">
            Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}.
          </Text>
          <Text className="text-center text-base text-white/60">
            Once swipe deck is ready this will show your daily batch of founders to connect with.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
