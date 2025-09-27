import { clsx } from 'clsx';
import { Pressable, Text } from 'react-native';

interface OptionPillProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
}

export const OptionPill = ({ label, selected, onPress }: OptionPillProps) => (
  <Pressable
    className={clsx(
      'rounded-full border border-white/10 px-4 py-2',
      selected ? 'bg-primary border-primary' : 'bg-white/5',
    )}
    onPress={onPress}
  >
    <Text className={clsx('text-sm font-medium', selected ? 'text-white' : 'text-white/70')}>{label}</Text>
  </Pressable>
);
