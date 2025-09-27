import { ActivityIndicator, Pressable, Text } from 'react-native';
import { clsx } from 'clsx';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const PrimaryButton = ({ title, onPress, disabled, loading }: PrimaryButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      className={clsx('w-full rounded-xl bg-primary py-4', isDisabled && 'opacity-60')}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-center text-base font-semibold text-white">{title}</Text>
      )}
    </Pressable>
  );
};
