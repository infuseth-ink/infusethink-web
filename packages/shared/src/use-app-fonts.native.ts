import { Fraunces_600SemiBold, Fraunces_700Bold } from '@expo-google-fonts/fraunces';
import { useFonts } from 'expo-font';

export function useAppFonts(): [boolean] {
  const [loaded] = useFonts({ Fraunces_600SemiBold, Fraunces_700Bold });
  return [loaded];
}
