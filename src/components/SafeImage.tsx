import { useState, type ImgHTMLAttributes } from 'react'

type Props = ImgHTMLAttributes<HTMLImageElement>

export default function SafeImage({ className = '', alt = '', ...rest }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center ${className}`}
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.35), transparent 55%), linear-gradient(135deg, #E3C9B0 0%, #8B6F47 100%)',
        }}
      >
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="text-bone/55">
          <path
            d="M28 6l3.2 8.3L40 16.8l-6.4 5.9 1.9 9.3L28 27.6l-7.5 4.4 1.9-9.3L16 16.8l8.8-2.5L28 6z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  }

  return (
    <img
      {...rest}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      loading={rest.loading ?? 'lazy'}
    />
  )
}
