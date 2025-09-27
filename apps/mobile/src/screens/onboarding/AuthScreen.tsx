import { useEffect, useState } from 'react';
import { Alert, SafeAreaView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PrimaryButton } from '../../components/PrimaryButton';
import { TextField } from '../../components/TextField';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { supabase } from '../../lib/supabase';
import { useSession } from '../../providers/SessionProvider';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
});

type FormValues = z.infer<typeof schema>;

export const AuthScreen = ({ navigation }: NativeStackScreenProps<OnboardingStackParamList, 'Auth'>) => {
  const { session } = useSession();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    if (session) {
      navigation.replace('ProfileDetails');
    }
  }, [navigation, session]);

  const onSubmit = handleSubmit(async ({ email }) => {
    try {
      setLoading(true);
      const redirectUrl = process.env.EXPO_PUBLIC_SUPABASE_AUTH_REDIRECT;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: redirectUrl ? { emailRedirectTo: redirectUrl } : undefined,
      });

      if (error) {
        Alert.alert('Sign-in failed', error.message);
        return;
      }

      setOtpSent(true);
      Alert.alert('Magic link sent', 'Check your email to continue onboarding.');
    } catch (error) {
      console.error('Failed to send magic link', error);
      Alert.alert('Unexpected error', 'Could not send magic link. Try again.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-between px-6 py-10">
        <View className="gap-6">
          <View>
            <Text className="text-sm uppercase tracking-[4px] text-primary/80">Sign in</Text>
            <Text className="mt-4 text-3xl font-semibold text-white">
              Use your email or Google to start connecting with founders.
            </Text>
          </View>

          <View className="gap-4">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  label="Work email"
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  placeholder="founder@startup.com"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={formState.errors.email?.message}
                />
              )}
            />
            <PrimaryButton
              title={otpSent ? 'Resend magic link' : 'Email me a magic link'}
              onPress={onSubmit}
              loading={loading}
            />
            <Text className="text-center text-xs text-white/50">
              We'll send a sign-in link to your inbox. No password required.
            </Text>
          </View>
        </View>

        <View className="gap-3">
          <PrimaryButton
            title="Continue with Google (coming soon)"
            onPress={() => Alert.alert('Coming soon', 'Google sign-in will be enabled before demo day.')}
            disabled
          />
          <Text className="text-center text-xs text-white/40">
            Already have the app open on another device? Complete the login there and return.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
