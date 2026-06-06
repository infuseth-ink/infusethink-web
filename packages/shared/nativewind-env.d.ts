/// <reference types="nativewind/types" />

// Augment react-native from THIS file's resolution context so the className
// prop is visible when mobile's tsc traverses packages/shared source files.
// (pnpm places a different physical react-native under packages/shared/node_modules
// than the root, so the augmentation in react-native-css-interop/types doesn't
// reach here — we have to declare it again from the shared context.)
import 'react-native';
declare module 'react-native' {
  interface ViewProps {
    className?: string;
    cssInterop?: boolean;
  }
  interface TextProps {
    className?: string;
    cssInterop?: boolean;
  }
  interface ImagePropsBase {
    className?: string;
    cssInterop?: boolean;
  }
  interface TouchableWithoutFeedbackProps {
    className?: string;
    cssInterop?: boolean;
  }
  interface ScrollViewProps {
    className?: string;
    cssInterop?: boolean;
  }
  interface SwitchProps {
    className?: string;
    cssInterop?: boolean;
  }
}
