import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';

export const WelcomeScreen = ({ navigation }: NativeStackScreenProps<OnboardingStackParamList, 'Welcome'>) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.copyBlock}>
          <Text style={styles.badge}>Founder Connect</Text>
          <Text style={styles.title}>Meet founders building at your pace.</Text>
          <Text style={styles.subtitle}>
            Swipe through curated founders, match on mutual interest, and start collaborating.
          </Text>
        </View>
        <View style={styles.ctaBlock}>
          <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('Auth')}>
            <Text style={styles.primaryButtonLabel}>Get started</Text>
          </Pressable>
          <Text style={styles.footnote}>By continuing you agree to our community guidelines.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  copyBlock: {
    gap: 16,
  },
  badge: {
    textTransform: 'uppercase',
    letterSpacing: 4,
    color: 'rgba(59, 130, 246, 0.8)',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 44,
  },
  subtitle: {
    color: 'rgba(226, 232, 240, 0.8)',
    fontSize: 16,
    lineHeight: 24,
  },
  ctaBlock: {
    gap: 16,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d4ed8',
  },
  primaryButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footnote: {
    color: 'rgba(148, 163, 184, 0.7)',
    fontSize: 12,
    textAlign: 'center',
  },
});
