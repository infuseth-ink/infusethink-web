import React from 'react';
import { Text, View } from 'react-native';
import type { TextProps, ViewProps } from 'react-native';

function Card({ className, ...props }: ViewProps) {
  return (
    <View
      className={`border-outline-200 bg-background-50 flex flex-col gap-4 overflow-hidden rounded-xl border py-4${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: ViewProps) {
  return <View className={`px-4 gap-1${className ? ` ${className}` : ''}`} {...props} />;
}

function CardTitle({ className, ...props }: TextProps) {
  return (
    <Text
      className={`text-base font-medium text-typography-900${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: TextProps) {
  return (
    <Text className={`text-sm text-typography-500${className ? ` ${className}` : ''}`} {...props} />
  );
}

function CardAction({ className, ...props }: ViewProps) {
  return <View className={`self-start${className ? ` ${className}` : ''}`} {...props} />;
}

function CardContent({ className, ...props }: ViewProps) {
  return <View className={`px-4${className ? ` ${className}` : ''}`} {...props} />;
}

function CardFooter({ className, ...props }: ViewProps) {
  return (
    <View className={`flex-row items-center p-4${className ? ` ${className}` : ''}`} {...props} />
  );
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
