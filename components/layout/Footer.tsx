import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0d1f12] text-white/60">
      <div className="mx-auto flex flex-col items-center gap-4 p-6 max-inline-6xl sm:flex-row sm:justify-between">
        <span className="font-display text-sm font-semibold tracking-tight text-white">
          infuseth.ink
        </span>

        <p className="text-xs">© {new Date().getFullYear()} infuseth.ink. All rights reserved.</p>
      </div>
    </footer>
  );
}
