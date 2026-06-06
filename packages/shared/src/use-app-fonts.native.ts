import { Fraunces_600SemiBold, Fraunces_700Bold } from '@expo-google-fonts/fraunces';
import { useFonts } from 'expo-font';

export function useAppFonts(): [boolean, Error | null] {
  const [loaded, error] = useFonts({ Fraunces_600SemiBold, Fraunces_700Bold });
  return [loaded, error ?? null];
}
