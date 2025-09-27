import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../screens/home/HomeScreen';

export type MainStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Founder Connect',
        headerStyle: { backgroundColor: '#0f172a' },
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);
