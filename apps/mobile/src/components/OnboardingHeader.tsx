import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

interface OnboardingHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
}

export const OnboardingHeader = ({ title, subtitle, showBackButton = true }: OnboardingHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View className="mb-8 gap-3 pt-2">
      {showBackButton ? (
        <Pressable
          className="mb-4 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 p-2"
          onPress={() => navigation.canGoBack() && navigation.goBack()}
        >
          <ArrowLeft color="white" size={18} />
        </Pressable>
      ) : null}
      <Text className="text-3xl font-semibold text-white">{title}</Text>
      {subtitle ? <Text className="text-base text-white/60">{subtitle}</Text> : null}
    </View>
  );
};
