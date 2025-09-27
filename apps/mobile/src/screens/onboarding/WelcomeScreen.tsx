import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { PrimaryButton } from '../../components/PrimaryButton';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';

const MIN_HEIGHT = Dimensions.get('window').height * 0.9;

export const WelcomeScreen = ({ navigation }: NativeStackScreenProps<OnboardingStackParamList, 'Welcome'>) => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 48, paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={{ minHeight: MIN_HEIGHT }} className="flex-1 justify-between">
          <View>
            <Text className="text-sm uppercase tracking-[4px] text-primary/80">Founder Connect</Text>
            <Text className="mt-6 text-4xl font-bold text-white">Meet founders building at your pace.</Text>
            <Text className="mt-4 text-base text-white/70">
              Swipe through curated founders, match on mutual interest, and start collaborating.
            </Text>
          </View>
          <View className="mt-10 gap-4">
            <PrimaryButton title="Get started" onPress={() => navigation.navigate('Auth')} />
            <Text className="text-center text-xs text-white/40">
              By continuing you agree to our community guidelines.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
