import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, Image, SafeAreaView, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { OnboardingHeader } from '../../components/OnboardingHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { useOnboarding } from './OnboardingContext';

export const PhotoUploadScreen = ({
  navigation,
}: NativeStackScreenProps<OnboardingStackParamList, 'PhotoUpload'>) => {
  const { data, update } = useOnboarding();
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    try {
      setUploading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 5],
        quality: 0.9,
      });

      if (!result.canceled && result.assets.length > 0) {
        update({ photoUri: result.assets[0].uri });
      }
    } catch (error) {
      console.error('Failed to select image', error);
      Alert.alert('Image selection failed', 'Please try choosing a different photo.');
    } finally {
      setUploading(false);
    }
  };

  const handleContinue = () => {
    if (!data.photoUri) {
      Alert.alert('Profile photo required', 'Add a headshot so founders can recognize you.');
      return;
    }

    navigation.navigate('Review');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 py-10">
        <OnboardingHeader
          title="Add a friendly photo"
          subtitle="A clear headshot increases match rates. Square or vertical works best."
        />

        <View className="flex-1 items-center justify-center gap-6">
          {data.photoUri ? (
            <Image
              source={{ uri: data.photoUri }}
              className="h-56 w-44 rounded-3xl"
              resizeMode="cover"
            />
          ) : (
            <View className="h-56 w-44 items-center justify-center rounded-3xl border-2 border-dashed border-white/20 bg-white/5">
              <Text className="text-center text-white/50">Tap below to upload your photo</Text>
            </View>
          )}

          <PrimaryButton title="Choose photo" onPress={pickImage} loading={uploading} />
        </View>

        <View className="mt-8">
          <PrimaryButton title="Continue" onPress={handleContinue} />
        </View>
      </View>
    </SafeAreaView>
  );
};
