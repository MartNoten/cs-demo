'use client'

import { useEffect, useState } from 'react'

const NS_YELLOW = '#FFC917'
const NS_BLUE = '#003082'

const CONFETTI_COLORS = [
  '#FFC917', '#FFC917', '#FFC917',
  '#FFFFFF', '#FFFFFF',
  '#FFD700', '#B8D4FF',
]

interface ConfettiPiece {
  id: number
  x: number
  delay: number
  duration: number
  color: string
  width: number
  height: number
  isCircle: boolean
}

interface StarDot {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    setPieces(
      Array.from({ length: 80 }, (_, i) => {
        const size = Math.random() * 10 + 5
        const isRect = Math.random() > 0.6
        return {
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 8,
          duration: Math.random() * 4 + 5,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          width: isRect ? size * 2 : size,
          height: size,
          isCircle: Math.random() > 0.7,
        }
      })
    )
  }, [])

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="animate-confetti-fall pointer-events-none absolute top-0"
          style={{
            left: `${p.x}%`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            backgroundColor: p.color,
            borderRadius: p.isCircle ? '50%' : '2px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </>
  )
}

function StarField() {
  const [stars, setStars] = useState<StarDot[]>([])

  useEffect(() => {
    setStars(
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 80,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 2 + 1.5,
      }))
    )
  }, [])

  return (
    <>
      {stars.map((s) => (
        <div
          key={s.id}
          className="pointer-events-none absolute rounded-full animate-sparkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: NS_YELLOW,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </>
  )
}

function TrainCar({ isEngine }: { isEngine?: boolean }) {
  if (isEngine) {
    return (
      <div className="flex flex-col">
        <div
          className="relative flex h-16 w-32 items-center justify-center rounded-tl-3xl rounded-tr-xl"
          style={{ backgroundColor: NS_YELLOW }}
        >
          {/* Cab window */}
          <div
            className="absolute right-4 top-3 h-6 w-14 rounded"
            style={{ backgroundColor: 'rgba(0,48,130,0.65)' }}
          />
          {/* NS logo */}
          <span className="relative z-10 text-xl font-black" style={{ color: NS_BLUE, letterSpacing: '-1px' }}>
            NS
          </span>
          {/* Front nose */}
          <div
            className="absolute -right-4 top-0 h-full w-4"
            style={{
              backgroundColor: NS_YELLOW,
              clipPath: 'polygon(0 10%, 100% 50%, 0 90%)',
            }}
          />
        </div>
        {/* Wheels */}
        <div className="flex justify-around px-3" style={{ marginTop: '-2px' }}>
          <Wheel color={NS_BLUE} />
          <Wheel color={NS_BLUE} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div
        className="h-12 w-24 rounded-t-lg"
        style={{ backgroundColor: NS_BLUE, border: `2.5px solid ${NS_YELLOW}` }}
      >
        {/* Windows */}
        <div className="flex justify-center gap-1.5 pt-2">
          {[0, 1, 2].map((w) => (
            <div
              key={w}
              className="h-4 w-5 rounded-sm"
              style={{ backgroundColor: 'rgba(255,201,23,0.3)' }}
            />
          ))}
        </div>
      </div>
      {/* Wheels */}
      <div className="flex justify-around px-2" style={{ marginTop: '-2px' }}>
        <Wheel color={NS_YELLOW} size={14} />
        <Wheel color={NS_YELLOW} size={14} />
      </div>
    </div>
  )
}

function Wheel({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <div
      className="animate-wheel-spin rounded-full"
      style={{
        width: size,
        height: size,
        border: `3px solid ${color}`,
        backgroundColor: '#4a4a4a',
      }}
    />
  )
}

function Train() {
  return (
    <div className="absolute bottom-12 animate-train-move">
      <div className="flex items-end gap-0.5">
        <TrainCar isEngine />
        <TrainCar />
        <TrainCar />
        <TrainCar />
      </div>
    </div>
  )
}

function TrackLayer() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-14 overflow-hidden">
      {/* Ballast */}
      <div className="absolute bottom-0 left-0 right-0 h-5" style={{ backgroundColor: '#0f0900' }} />
      {/* Sleepers */}
      <div
        className="absolute bottom-5 left-0 right-0 h-7"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, #5a3e1f 0px, #5a3e1f 18px, transparent 18px, transparent 38px)',
        }}
      />
      {/* Lower rail */}
      <div
        className="absolute left-0 right-0 h-2 rounded-sm"
        style={{ bottom: '22px', backgroundColor: '#9E9E9E' }}
      />
      {/* Upper rail */}
      <div
        className="absolute left-0 right-0 h-2 rounded-sm"
        style={{ bottom: '30px', backgroundColor: '#9E9E9E' }}
      />
    </div>
  )
}

function StationBoard() {
  const items = [
    { label: 'Vertrek', labelEn: 'Departure', value: 'Nu' },
    { label: 'Bestemming', labelEn: 'Destination', value: 'Excellence' },
    { label: 'Spoor', labelEn: 'Platform', value: '1' },
  ]

  return (
    <div
      className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 px-6 py-5 shadow-2xl backdrop-blur-md"
    >
      <div className="mb-3 flex items-center gap-2">
        <div
          className="h-2 w-2 animate-pulse rounded-full"
          style={{ backgroundColor: NS_YELLOW }}
        />
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: NS_YELLOW }}
        >
          Actuele Vertrektijden · Live Departures
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {items.map(({ label, labelEn, value }) => (
          <div
            key={label}
            className="rounded-xl bg-white/5 px-2 py-3 text-center"
          >
            <p
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: NS_YELLOW }}
            >
              {label}
            </p>
            <p className="mt-1 text-xl font-bold text-white">{value}</p>
            <p className="text-xs text-white/40">{labelEn}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const headline = 'Hello, World!'

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, #0055cc 0%, ${NS_BLUE} 45%, #001847 100%)`,
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,201,23,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,201,23,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Stars */}
      {mounted && <StarField />}

      {/* Confetti */}
      {mounted && <Confetti />}

      {/* ── Main content ── */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-20 pt-8">

        {/* NS Badge */}
        <div className="animate-badge-enter mb-8">
          <div
            className="animate-float animate-glow-pulse flex h-24 w-24 items-center justify-center rounded-full text-3xl font-black shadow-2xl"
            style={{ backgroundColor: NS_YELLOW, color: NS_BLUE }}
          >
            NS
          </div>
        </div>

        {/* Hello, World! */}
        <h1
          className="mb-4 text-center"
          aria-label={headline}
          style={{ lineHeight: 1.1 }}
        >
          {headline.split('').map((char, i) => (
            <span
              key={i}
              className="animate-letter-reveal inline-block text-6xl font-black md:text-8xl lg:text-9xl"
              style={{
                animationDelay: `${0.3 + i * 0.06}s`,
                color: char === '!' ? NS_YELLOW : 'white',
                textShadow:
                  char === '!'
                    ? `0 0 40px ${NS_YELLOW}, 0 0 80px rgba(255,201,23,0.4)`
                    : '0 2px 20px rgba(0,0,0,0.4)',
                marginRight: char === ' ' ? '0.2em' : undefined,
              }}
            >
              {char === ' ' ? '\u00a0' : char}
            </span>
          ))}
        </h1>

        {/* Decorative expanding line */}
        <div
          className="animate-expand-line mb-6 h-1.5 w-32 rounded-full"
          style={{ backgroundColor: NS_YELLOW }}
        />

        {/* Subtitle */}
        <p
          className="animate-slide-up mb-2 text-center text-sm font-light tracking-[0.35em] text-white/75 md:text-base"
          style={{ animationDelay: '1.6s' }}
        >
          WELKOM AAN BOORD &nbsp;·&nbsp; WELCOME ABOARD
        </p>

        {/* Station board */}
        <div
          className="animate-slide-up mt-8"
          style={{ animationDelay: '2s' }}
        >
          <StationBoard />
        </div>

        {/* CTA button */}
        <button
          className="animate-slide-up mt-8 rounded-xl px-10 py-4 text-lg font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95"
          style={{
            backgroundColor: NS_YELLOW,
            color: NS_BLUE,
            animationDelay: '2.4s',
            boxShadow: '0 8px 40px rgba(255,201,23,0.4)',
          }}
        >
          Instappen &nbsp;·&nbsp; Board Now →
        </button>

        {/* Dot indicators */}
        <div
          className="animate-slide-up mt-6 flex gap-2"
          style={{ animationDelay: '2.6s' }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === 1 ? '24px' : '8px',
                backgroundColor: i === 1 ? NS_YELLOW : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Track + animated train */}
      <TrackLayer />
      {mounted && <Train />}
    </main>
  )
}
