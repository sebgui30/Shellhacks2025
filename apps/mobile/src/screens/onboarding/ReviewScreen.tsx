import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { PrimaryButton } from '../../components/PrimaryButton';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { useOnboarding } from './OnboardingContext';
import { useSession } from '../../providers/SessionProvider';
import { saveProfile } from '../../lib/profile';
import { useProfileContext } from '../../providers/ProfileProvider';

export const ReviewScreen = ({
  navigation,
}: NativeStackScreenProps<OnboardingStackParamList, 'Review'>) => {
  const { data, reset } = useOnboarding();
  const { session } = useSession();
  const { refresh: refreshProfile } = useProfileContext();
  const [saving, setSaving] = useState(false);

  const handleFinish = async () => {
    if (!session?.user?.id) {
      Alert.alert('Not signed in', 'Please sign in again to continue onboarding.');
      navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
      return;
    }

    try {
      setSaving(true);
      await saveProfile(session.user.id, data);
      await refreshProfile();
      reset();
      Alert.alert("You're in!", "We'll take you to the swipe deck now.");
    } catch (error) {
      console.error('Failed to save profile', error);
      Alert.alert('Could not save profile', 'Please try again in a few seconds.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6 py-10" contentContainerStyle={{ paddingBottom: 40 }}>
        <Text className="text-sm uppercase tracking-[4px] text-primary/80">Review</Text>
        <Text className="mt-4 text-3xl font-semibold text-white">Preview your profile before we launch you.</Text>

        <View className="mt-8 gap-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <View className="flex-row gap-4">
            {data.photoUri ? (
              <Image source={{ uri: data.photoUri }} className="h-24 w-20 rounded-2xl" />
            ) : null}
            <View className="flex-1 gap-2">
              <Text className="text-xl font-semibold text-white">{data.fullName}</Text>
              <Text className="text-sm text-primary/80">{data.headline}</Text>
              <Text className="text-sm text-white/60">{data.location}</Text>
            </View>
          </View>

          <View className="gap-2">
            <Text className="text-sm font-semibold uppercase tracking-[3px] text-white/50">About</Text>
            <Text className="text-base leading-6 text-white/80">{data.bio}</Text>
          </View>

          <View className="flex-row gap-3">
            <View className="rounded-full bg-white/10 px-3 py-1">
              <Text className="text-xs font-medium text-white/80">{data.industry}</Text>
            </View>
            <View className="rounded-full bg-white/10 px-3 py-1">
              <Text className="text-xs font-medium text-white/80">{data.stage}</Text>
            </View>
          </View>
        </View>

        <View className="mt-8 gap-3">
          <PrimaryButton title="Launch my profile" onPress={handleFinish} loading={saving} />
          <Text className="text-center text-xs text-white/40">
            You can update your profile anytime from settings once inside the app.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
