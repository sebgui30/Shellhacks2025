import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingProvider } from '../screens/onboarding/OnboardingContext';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import { AuthScreen } from '../screens/onboarding/AuthScreen';
import { ProfileDetailsScreen } from '../screens/onboarding/ProfileDetailsScreen';
import { FounderDetailsScreen } from '../screens/onboarding/FounderDetailsScreen';
import { PhotoUploadScreen } from '../screens/onboarding/PhotoUploadScreen';
import { ReviewScreen } from '../screens/onboarding/ReviewScreen';

export type OnboardingStackParamList = {
  Welcome: undefined;
  Auth: undefined;
  ProfileDetails: undefined;
  FounderDetails: undefined;
  PhotoUpload: undefined;
  Review: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator = () => (
  <OnboardingProvider>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
      <Stack.Screen name="FounderDetails" component={FounderDetailsScreen} />
      <Stack.Screen name="PhotoUpload" component={PhotoUploadScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
    </Stack.Navigator>
  </OnboardingProvider>
);
