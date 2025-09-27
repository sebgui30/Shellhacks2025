import { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

interface ScreenContainerProps {
  scrollable?: boolean;
}

export const ScreenContainer = ({ children, scrollable }: PropsWithChildren<ScreenContainerProps>) => {
  const content = scrollable ? (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">
      {children}
    </ScrollView>
  ) : (
    <View className="flex-1 px-6">{children}</View>
  );

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      {content}
    </KeyboardAvoidingView>
  );
};
