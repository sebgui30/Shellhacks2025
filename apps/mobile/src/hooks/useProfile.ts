import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface Profile {
  id: string;
  full_name: string;
  headline: string;
  bio: string;
  industry: string;
  stage: string;
  location: string;
  avatar_url: string | null;
  is_onboarded: boolean;
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  refetch: () => void;
}

export const useProfile = (userId: string | undefined): ProfileState => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(!!userId);

  const loadProfile = useCallback(async () => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        throw error;
      }
      setProfile(data ?? null);
    } catch (error) {
      console.error('Failed to load profile', error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return {
    profile,
    loading,
    refetch: loadProfile,
  };
};
