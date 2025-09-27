import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSession } from '../providers/SessionProvider';
import { useProfileContext } from '../providers/ProfileProvider';
import { LoadingScreen } from '../components/LoadingScreen';
import { OnboardingNavigator } from './OnboardingNavigator';
import { MainNavigator } from './main/MainNavigator';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { session, loading: loadingSession } = useSession();
  const { profile, loading: loadingProfile } = useProfileContext();

  const isLoading = loadingSession || loadingProfile;
  const shouldOnboard = !session || !profile || !profile.is_onboarded;

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {shouldOnboard ? (
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      ) : (
        <Stack.Screen name="Main" component={MainNavigator} />
      )}
    </Stack.Navigator>
  );
};
