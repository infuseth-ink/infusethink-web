'use client';
import React from 'react';
import { type VariantProps } from '@gluestack-ui/utils/nativewind-utils';
import { buttonStyle, buttonTextStyle, buttonGroupStyle } from './styles';

type Action = 'primary' | 'secondary' | 'positive' | 'negative' | 'default';
type Variant = 'solid' | 'outline' | 'link';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type IButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonStyle> & {
    action?: Action;
    variant?: Variant;
    size?: Size;
  };

function Button({
  ref,
  className,
  variant = 'solid',
  size = 'md',
  action = 'primary',
  ...props
}: IButtonProps) {
  return (
    <button
      ref={ref}
      {...props}
      className={buttonStyle({ variant, size, action, class: className })}
    />
  );
}

type IButtonTextProps = React.ComponentProps<'span'> &
  VariantProps<typeof buttonTextStyle> & {
    action?: Action;
    variant?: Variant;
    size?: Size;
  };

function ButtonText({ ref, className, variant, size, action, ...props }: IButtonTextProps) {
  return (
    <span
      ref={ref}
      {...props}
      className={buttonTextStyle({
        parentVariants: { variant, size, action },
        class: className,
      })}
    />
  );
}

type IButtonGroupProps = React.ComponentProps<'div'> & VariantProps<typeof buttonGroupStyle>;

function ButtonGroup({
  ref,
  className,
  space = 'md',
  isAttached = false,
  flexDirection = 'row',
  ...props
}: IButtonGroupProps) {
  return (
    <div
      ref={ref}
      {...props}
      className={buttonGroupStyle({ space, isAttached, flexDirection, class: className })}
    />
  );
}

function ButtonSpinner({ className, ...props }: React.ComponentProps<'span'>) {
  return <span role="status" aria-label="Loading" className={className} {...props} />;
}

function ButtonIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return <span className={className} {...props} />;
}

Button.displayName = 'Button';
ButtonText.displayName = 'ButtonText';
ButtonSpinner.displayName = 'ButtonSpinner';
ButtonIcon.displayName = 'ButtonIcon';
ButtonGroup.displayName = 'ButtonGroup';

export { Button, ButtonText, ButtonSpinner, ButtonIcon, ButtonGroup };
