/// <reference types="nativewind/types" />
declare module '*.css' {}

// Ensure NativeWind className augmentation is visible when tsc traverses
// into packages/shared from this compilation root.
import 'react-native-css-interop/types';
