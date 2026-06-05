// Web entry point — used by apps/web for TypeScript type resolution.
// Next.js / webpack resolves .web.tsx extensions at bundle time;
// tsc --noEmit needs this explicit entry so it sees web types instead of native.
export { GluestackUIProvider } from './components/ui/gluestack-ui-provider/index.web';
export { Button, buttonVariants } from './components/ui/button/index.web';
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from './components/ui/card/index.web';
export { Text } from './components/ui/text/index.web';
export { Input, InputField, InputIcon, InputSlot } from './components/ui/input';
