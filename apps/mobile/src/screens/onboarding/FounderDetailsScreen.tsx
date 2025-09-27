import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, Text, View } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardingHeader } from '../../components/OnboardingHeader';
import { OptionPill } from '../../components/OptionPill';
import { PrimaryButton } from '../../components/PrimaryButton';
import { TextField } from '../../components/TextField';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { useOnboarding } from './OnboardingContext';

const industries = [
  'AI / ML',
  'Climate',
  'Developer Tools',
  'Fintech',
  'Healthcare',
  'Marketplace',
  'SaaS',
  'Web3',
];

const stages = ['Idea', 'MVP', 'Pre-seed', 'Seed', 'Series A+'];

const schema = z.object({
  industry: z.string().min(1, 'Choose an industry'),
  stage: z.string().min(1, 'Select your stage'),
  location: z.string().min(2, 'Where are you based?'),
});

type FormValues = z.infer<typeof schema>;

export const FounderDetailsScreen = ({
  navigation,
}: NativeStackScreenProps<OnboardingStackParamList, 'FounderDetails'>) => {
  const { data, update } = useOnboarding();

  const { control, handleSubmit, setValue, watch, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      industry: data.industry,
      stage: data.stage,
      location: data.location,
    },
  });

  const selectedIndustry = watch('industry');
  const selectedStage = watch('stage');

  const onNext = handleSubmit((values) => {
    update(values);
    navigation.navigate('PhotoUpload');
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 py-10">
        <OnboardingHeader
          title="Dial in your context"
          subtitle="We use this to match you with similar founders."
        />

        <View className="flex-1 gap-6">
          <View>
            <Text className="mb-3 text-sm font-medium uppercase tracking-[3px] text-white/50">Industry</Text>
            <View className="flex-row flex-wrap gap-2">
              {industries.map((item) => (
                <OptionPill
                  key={item}
                  label={item}
                  selected={selectedIndustry === item}
                  onPress={() => setValue('industry', item, { shouldValidate: true })}
                />
              ))}
            </View>
            {formState.errors.industry ? (
              <Text className="mt-1 text-xs text-red-400">{formState.errors.industry.message}</Text>
            ) : null}
          </View>

          <View>
            <Text className="mb-3 text-sm font-medium uppercase tracking-[3px] text-white/50">Stage</Text>
            <View className="flex-row flex-wrap gap-2">
              {stages.map((item) => (
                <OptionPill
                  key={item}
                  label={item}
                  selected={selectedStage === item}
                  onPress={() => setValue('stage', item, { shouldValidate: true })}
                />
              ))}
            </View>
            {formState.errors.stage ? (
              <Text className="mt-1 text-xs text-red-400">{formState.errors.stage.message}</Text>
            ) : null}
          </View>

          <Controller
            control={control}
            name="location"
            render={({ field: { onBlur, onChange, value } }) => (
              <TextField
                label="Primary location"
                placeholder="Miami, FL"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={formState.errors.location?.message}
              />
            )}
          />
        </View>

        <View className="mt-8">
          <PrimaryButton title="Continue" onPress={onNext} />
        </View>
      </View>
    </SafeAreaView>
  );
};
