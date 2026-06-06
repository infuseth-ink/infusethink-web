import '../global.css';

import { GluestackUIProvider, useAppFonts } from '@infuseth-ink/shared-ui';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useAppFonts();

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <GluestackUIProvider mode="system">
      <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>
  );
}
