import React from 'react';
import { Text, View } from 'react-native';
import type { TextProps, ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

function Card({ className, ...props }: ViewProps) {
  return (
    <View
      className={twMerge(
        'border-outline-200 bg-background-50 flex flex-col gap-4 overflow-hidden rounded-xl border py-4',
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: ViewProps) {
  return <View className={twMerge('gap-1 px-4', className)} {...props} />;
}

function CardTitle({ className, ...props }: TextProps) {
  return (
    <Text className={twMerge('text-typography-900 text-base font-medium', className)} {...props} />
  );
}

function CardDescription({ className, ...props }: TextProps) {
  return <Text className={twMerge('text-typography-500 text-sm', className)} {...props} />;
}

function CardAction({ className, ...props }: ViewProps) {
  return <View className={twMerge('self-start', className)} {...props} />;
}

function CardContent({ className, ...props }: ViewProps) {
  return <View className={twMerge('px-4', className)} {...props} />;
}

function CardFooter({ className, ...props }: ViewProps) {
  return <View className={twMerge('flex-row items-center p-4', className)} {...props} />;
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
