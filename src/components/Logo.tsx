type Props = {
  className?: string
  /** "ink" (dark), "bone" (light), or "mobileBone" (bone on mobile, ink on md+). */
  tone?: 'ink' | 'bone' | 'mobileBone'
}

export default function Logo({ className = '', tone = 'ink' }: Props) {
  const color =
    tone === 'bone'
      ? 'text-bone'
      : tone === 'mobileBone'
        ? 'text-bone md:text-ink'
        : 'text-ink'
  return (
    <div className={`flex items-center gap-2 ${color} ${className}`}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M11 1.5L13.8 8.2L20.5 11L13.8 13.8L11 20.5L8.2 13.8L1.5 11L8.2 8.2L11 1.5Z"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-serif text-[1.05rem] tracking-[0.32em] uppercase">Imperial</span>
    </div>
  )
}
