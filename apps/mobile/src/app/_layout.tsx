import '../global.css';

import { GluestackUIProvider } from '@infuseth-ink/shared-ui';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <GluestackUIProvider mode={colorScheme === 'dark' ? 'dark' : 'light'}>
      <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>
  );
}
