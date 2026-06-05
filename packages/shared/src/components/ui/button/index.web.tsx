'use client';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '../../../lib/utils';

/* ─────────────────────────────────────────────────────────────────────
   WEB BUTTON — overrides the Gluestack/Pressable native button.
   Uses a plain <button> element (no Base UI dep) with CVA variants.
   Surface-adaptive marketing/glass variants are web-only (backdrop-blur,
   CSS shadows). On native the Gluestack button/index.tsx handles rendering.
   ───────────────────────────────────────────────────────────────────── */
const buttonVariants = cva(
  `
    group/button inline-flex shrink-0 items-center justify-center rounded-lg
    border border-transparent bg-clip-padding text-sm font-medium
    whitespace-nowrap transition-all outline-none select-none
    focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50
    active:not-aria-[haspopup]:translate-y-px
    disabled:pointer-events-none disabled:opacity-50
    data-[loading=true]:cursor-progress data-[loading=true]:opacity-80
    aria-invalid:border-destructive aria-invalid:ring-3
    aria-invalid:ring-destructive/20
    dark:aria-invalid:border-destructive/50
    dark:aria-invalid:ring-destructive/40
    [&_svg]:pointer-events-none [&_svg]:shrink-0
    [&_svg:not([class*='size-'])]:block-4 [&_svg:not([class*='size-'])]:inline-4
    **:data-arrow:transition-transform **:data-arrow:duration-150
    hover:**:data-arrow:translate-x-0.5
  `,
  {
    variants: {
      variant: {
        default: `
          bg-primary text-primary-foreground
          hover:brightness-95
          [a]:hover:bg-primary/80
        `,
        marketing: `
          bg-brand-gold text-foreground font-bold
          hover:brightness-95
          shadow-on-light
          dark:shadow-on-dark
        `,
        outline: `
          border-border bg-background
          hover:bg-muted hover:text-foreground
          aria-expanded:bg-muted aria-expanded:text-foreground
          dark:border-input dark:bg-input/30
          dark:hover:bg-input/50
        `,
        secondary: `
          bg-secondary text-secondary-foreground
          hover:brightness-95
          aria-expanded:bg-secondary aria-expanded:text-secondary-foreground
        `,
        ghost: `
          hover:bg-muted hover:text-foreground
          aria-expanded:bg-muted aria-expanded:text-foreground
          dark:hover:bg-muted/50
        `,
        glass: `
          bg-white/8 text-white backdrop-blur-sm
          border-white/55
          hover:bg-white/15 hover:border-white/70
        `,
        destructive: `
          bg-destructive/10 text-destructive
          hover:bg-destructive/20
          focus-visible:border-destructive/40 focus-visible:ring-destructive/20
          dark:bg-destructive/20
          dark:hover:bg-destructive/30
          dark:focus-visible:ring-destructive/40
        `,
        link: `
          text-primary underline-offset-4
          hover:underline
        `,
      },
      size: {
        default: `
          gap-1.5 px-3 block-10
          has-data-[icon=inline-end]:pe-2
          has-data-[icon=inline-start]:ps-2
        `,
        xs: `
          gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs block-7
          in-data-[slot=button-group]:rounded-lg
          has-data-[icon=inline-end]:pe-1.5
          has-data-[icon=inline-start]:ps-1.5
          [&_svg:not([class*='size-'])]:block-3
          [&_svg:not([class*='size-'])]:inline-3
        `,
        sm: `
          gap-1 rounded-[min(var(--radius-md),12px)] px-3 text-[0.8rem]
          block-9
          in-data-[slot=button-group]:rounded-lg
          has-data-[icon=inline-end]:pe-2
          has-data-[icon=inline-start]:ps-2
          [&_svg:not([class*='size-'])]:block-3.5
          [&_svg:not([class*='size-'])]:inline-3.5
        `,
        lg: `
          gap-2 px-5 block-12 text-base font-semibold
          has-data-[icon=inline-end]:pe-3
          has-data-[icon=inline-start]:ps-3
        `,
        xl: `
          gap-2 px-8 block-14 text-base font-bold
          has-data-[icon=inline-end]:pe-5
          has-data-[icon=inline-start]:ps-5
        `,
        icon: 'block-10 inline-10',
        'icon-xs': `
          rounded-[min(var(--radius-md),10px)] block-7 inline-7
          in-data-[slot=button-group]:rounded-lg
          [&_svg:not([class*='size-'])]:block-3
          [&_svg:not([class*='size-'])]:inline-3
        `,
        'icon-sm': `
          rounded-[min(var(--radius-md),12px)] block-9 inline-9
          in-data-[slot=button-group]:rounded-lg
        `,
        'icon-lg': 'block-12 inline-12',
      },
      shape: {
        default: '',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { loading?: boolean };

function Button({
  className,
  variant = 'default',
  size = 'default',
  shape = 'default',
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      data-slot="button"
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={loading || disabled}
      className={cn(buttonVariants({ variant, size, shape, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
