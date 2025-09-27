import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, Text, View } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardingHeader } from '../../components/OnboardingHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { TextField } from '../../components/TextField';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { useOnboarding } from './OnboardingContext';

const schema = z.object({
  fullName: z.string().min(2, 'Tell us your name'),
  headline: z.string().min(10, 'Add a short headline about what you are building'),
  bio: z.string().min(20, 'Share a quick intro (20+ characters)'),
});

type FormValues = z.infer<typeof schema>;

export const ProfileDetailsScreen = ({
  navigation,
}: NativeStackScreenProps<OnboardingStackParamList, 'ProfileDetails'>) => {
  const { data, update } = useOnboarding();

  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: data.fullName,
      headline: data.headline,
      bio: data.bio,
    },
  });

  const onNext = handleSubmit((values) => {
    update(values);
    navigation.navigate('FounderDetails');
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 py-10">
        <OnboardingHeader
          title="Let’s start with the basics"
          subtitle="Founders will see this on your profile. Make it personal and specific."
        />

        <View className="mt-2 flex-1 gap-5">
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="Full name"
                autoCapitalize="words"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={formState.errors.fullName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="headline"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="Founder headline"
                placeholder="Building AI ops tools at Seed stage"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={formState.errors.headline?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="bio"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="Quick intro"
                placeholder="2 sentences on what you’re building and what you need."
                multiline
                numberOfLines={4}
                style={{ textAlignVertical: 'top' }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={formState.errors.bio?.message}
              />
            )}
          />
        </View>

        <View className="mt-8">
          <PrimaryButton title="Continue" onPress={onNext} />
        </View>
      </View>
    </SafeAreaView>
  );
};
