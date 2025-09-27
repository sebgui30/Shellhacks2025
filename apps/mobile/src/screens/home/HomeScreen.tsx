import { SafeAreaView, Text, View } from 'react-native';
import { useProfileContext } from '../../providers/ProfileProvider';

export const HomeScreen = () => {
  const { profile } = useProfileContext();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center gap-4 px-6">
        <Text className="text-sm uppercase tracking-[4px] text-primary/80">Matches coming soon</Text>
        <Text className="text-center text-3xl font-semibold text-white">
          Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}.
        </Text>
        <Text className="text-center text-base text-white/60">
          Once swipe deck is ready this will show your daily batch of founders to connect with.
        </Text>
      </View>
    </SafeAreaView>
  );
};
