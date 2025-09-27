import { supabase } from './supabase';
import { OnboardingProfile } from '../screens/onboarding/OnboardingContext';

export const saveProfile = async (userId: string, profile: OnboardingProfile) => {
  const { error } = await supabase.from('profiles').upsert(
    {
      id: userId,
      full_name: profile.fullName,
      headline: profile.headline,
      bio: profile.bio,
      industry: profile.industry,
      stage: profile.stage,
      location: profile.location,
      avatar_url: profile.photoUri ?? null,
      is_onboarded: true,
    },
    { onConflict: 'id' },
  );

  if (error) {
    throw error;
  }
};
