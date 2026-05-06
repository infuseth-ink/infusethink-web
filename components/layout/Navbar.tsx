'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
  { label: 'Learn', href: '/learn' },
  { label: 'Teach', href: '/teach' },
  { label: 'Pricing', href: '/pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed inset-x-0 inset-bs-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? '#0d1f12' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(225,193,84,0.10)' : '1px solid transparent',
      }}
    >
      <nav className="mx-auto flex items-center gap-8 px-6 py-3 max-inline-6xl">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo-final-square.png"
            alt="infuseth.ink"
            width={36}
            height={36}
            className="rounded-md"
            priority
          />
        </Link>

        {/* Nav links */}
        <div className="flex flex-1 items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Button
          size="sm"
          className="rounded-full px-5 font-semibold"
          style={{ backgroundColor: '#e1c154', color: '#1a2e20' }}
        >
          Sign in
        </Button>
      </nav>
    </header>
  )
}
