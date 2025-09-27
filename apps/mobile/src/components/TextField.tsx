import { forwardRef } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { clsx } from 'clsx';

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export const TextField = forwardRef<TextInput, TextFieldProps>(({ label, error, className, ...rest }, ref) => (
  <View className="w-full">
    <Text className="mb-2 text-sm font-medium text-white/80">{label}</Text>
    <TextInput
      ref={ref}
      className={clsx(
        'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white',
        error && 'border-red-500/70',
        className,
      )}
      placeholderTextColor="rgba(148, 163, 184, 0.9)"
      {...rest}
    />
    {error ? <Text className="mt-1 text-xs text-red-400">{error}</Text> : null}
  </View>
));

TextField.displayName = 'TextField';
