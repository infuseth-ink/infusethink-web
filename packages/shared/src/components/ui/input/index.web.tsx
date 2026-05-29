'use client';
import React from 'react';
import { tva, type VariantProps } from '@gluestack-ui/utils/nativewind-utils';

const inputStyle = tva({
  base: 'border-background-300 flex flex-row overflow-hidden content-center hover:border-outline-400 focus-within:border-primary-700 disabled:opacity-40 items-center',
  variants: {
    size: { xl: 'h-12', lg: 'h-11', md: 'h-10', sm: 'h-9' },
    variant: {
      underlined: 'rounded-none border-b',
      outline:
        'rounded border focus-within:ring-1 focus-within:ring-inset focus-within:ring-indicator-primary',
      rounded:
        'rounded-full border focus-within:ring-1 focus-within:ring-inset focus-within:ring-indicator-primary',
    },
  },
});

const inputFieldStyle = tva({
  base: 'flex-1 text-typography-900 py-0 px-3 placeholder:text-typography-500 h-full cursor-text outline-none bg-transparent border-0',
  parentVariants: {
    variant: {
      underlined: 'px-0',
      outline: '',
      rounded: 'px-4',
    },
    size: {
      '2xs': 'text-2xs',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
  },
});

type IInputProps = React.ComponentProps<'div'> &
  VariantProps<typeof inputStyle> & {
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
  };

function Input({ ref, className, variant = 'outline', size = 'md', ...props }: IInputProps) {
  return <div ref={ref} {...props} className={inputStyle({ variant, size, class: className })} />;
}

type IInputFieldProps = React.ComponentProps<'input'> & VariantProps<typeof inputFieldStyle>;

function InputField({ ref, className, ...props }: IInputFieldProps) {
  return <input ref={ref} {...props} className={inputFieldStyle({ class: className })} />;
}

function InputSlot({ ref, className, ...props }: React.ComponentProps<'button'>) {
  return (
    <button
      ref={ref}
      type="button"
      className={`flex items-center justify-center disabled:cursor-not-allowed ${className ?? ''}`}
      {...props}
    />
  );
}

function InputIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={`text-typography-400 flex items-center justify-center ${className ?? ''}`}
      {...props}
    />
  );
}

Input.displayName = 'Input';
InputField.displayName = 'InputField';
InputSlot.displayName = 'InputSlot';
InputIcon.displayName = 'InputIcon';

export { Input, InputField, InputIcon, InputSlot };
