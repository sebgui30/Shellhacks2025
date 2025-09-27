import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

export interface OnboardingProfile {
  fullName: string;
  headline: string;
  bio: string;
  industry: string;
  stage: string;
  location: string;
  photoUri?: string;
}

interface OnboardingContextValue {
  data: OnboardingProfile;
  update: (values: Partial<OnboardingProfile>) => void;
  reset: () => void;
}

const defaultValues: OnboardingProfile = {
  fullName: '',
  headline: '',
  bio: '',
  industry: '',
  stage: '',
  location: '',
  photoUri: undefined,
};

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined);

export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<OnboardingProfile>(defaultValues);

  const value = useMemo<OnboardingContextValue>(
    () => ({
      data,
      update: (values) => setData((prev) => ({ ...prev, ...values })),
      reset: () => setData(defaultValues),
    }),
    [data],
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
