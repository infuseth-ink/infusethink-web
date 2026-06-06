import '../global.css';

import { GluestackUIProvider } from '@infuseth-ink/shared-ui';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="system">
      <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>
  );
}
