import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, Text, View } from 'react-native';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';

export const WelcomeScreen = ({ navigation }: NativeStackScreenProps<OnboardingStackParamList, 'Welcome'>) => {
  return (
    <SafeAreaView className="flex-1 bg-background px-6 py-12">
      <View className="flex-1 justify-between">
        <View>
          <Text className="text-sm uppercase tracking-[4px] text-primary/80">Founder Connect</Text>
          <Text className="mt-6 text-4xl font-bold text-white">Meet founders building at your pace.</Text>
          <Text className="mt-4 text-base text-white/70">
            Swipe through curated founders, match on mutual interest, and start collaborating.
          </Text>
        </View>
        <View className="gap-4">
          <Pressable
            onPress={() => navigation.navigate('Auth')}
            style={{
              width: '100%',
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: 'center',
              backgroundColor: '#2563eb',
            }}
          >
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>Get started</Text>
          </Pressable>
          <Text className="text-center text-xs text-white/40">
            By continuing you agree to our community guidelines.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
