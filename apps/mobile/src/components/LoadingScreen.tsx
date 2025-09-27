import { ActivityIndicator, View } from 'react-native';

export const LoadingScreen = () => (
  <View className="flex-1 items-center justify-center bg-background">
    <ActivityIndicator size="large" color="#2563eb" />
  </View>
);
