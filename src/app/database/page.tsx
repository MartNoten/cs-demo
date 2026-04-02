'use client'

import { useEffect, useState } from 'react'

const NS_YELLOW = '#FFC917'
const NS_BLUE = '#003082'

interface Station {
  id: number
  name: string
  city: string
  platforms: number
  daily_passengers: number
  opened_year: number
  fun_fact: string
}

interface DbMeta {
  pg_version: string
  db_name: string
  server_time: string
}

function PlatformDots({ count }: { count: number }) {
  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{ width: 8, height: 8, backgroundColor: NS_YELLOW, opacity: 0.85 }}
        />
      ))}
    </div>
  )
}

function PassengerBar({ value, max }: { value: number; max: number }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height: 8, backgroundColor: 'rgba(255,255,255,0.1)' }}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, backgroundColor: NS_YELLOW }}
      />
    </div>
  )
}

function StatusBadge({ ok }: { ok: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
      style={{ backgroundColor: ok ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', color: ok ? '#4ade80' : '#f87171' }}
    >
      <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: ok ? '#4ade80' : '#f87171' }} />
      {ok ? 'Verbonden · Connected' : 'Geen verbinding · No connection'}
    </span>
  )
}

export default function DatabasePage() {
  const [stations, setStations] = useState<Station[]>([])
  const [meta, setMeta] = useState<DbMeta | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/db')
      .then((r) => r.json())
      .then((data) => {
        if (data.stations) {
          setStations(data.stations)
          setMeta(data.meta)
        } else {
          setError(data.error || 'Unknown error')
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const maxPassengers = stations[0]?.daily_passengers ?? 1

  return (
    <main
      className="min-h-screen px-4 py-12"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, #0055cc 0%, ${NS_BLUE} 45%, #001847 100%)`,
      }}
    >
      {/* Grid overlay */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,201,23,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,201,23,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <a
            href="/"
            className="mb-6 inline-block text-sm font-semibold tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: NS_YELLOW }}
          >
            ← Terug · Back
          </a>
          <div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-black shadow-xl"
            style={{ backgroundColor: NS_YELLOW, color: NS_BLUE }}
          >
            DB
          </div>
          <h1 className="text-4xl font-black text-white md:text-5xl">Database Demo</h1>
          <p className="mt-2 text-sm tracking-widest text-white/50 uppercase">Live PostgreSQL · NS Stations</p>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div
              className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-transparent"
              style={{ borderTopColor: NS_YELLOW }}
            />
            <p className="text-white/60 text-sm">Verbinding maken · Connecting…</p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
            <p className="text-red-400 font-bold">Verbindingsfout · Connection error</p>
            <p className="mt-1 text-sm text-red-300/70">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Connection meta card */}
            <div
              className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <StatusBadge ok={true} />
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/50">
                  <span><span style={{ color: NS_YELLOW }}>Database:</span> {meta?.db_name}</span>
                  <span><span style={{ color: NS_YELLOW }}>Server tijd:</span> {meta ? new Date(meta.server_time).toLocaleTimeString('nl-NL') : ''}</span>
                  <span><span style={{ color: NS_YELLOW }}>PostgreSQL:</span> {meta?.pg_version.split(' ').slice(0, 2).join(' ')}</span>
                </div>
              </div>
            </div>

            {/* Station leaderboard */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
              <div className="border-b border-white/10 px-6 py-4 flex items-center gap-3">
                <div className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: NS_YELLOW }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: NS_YELLOW }}>
                  Stationsranglijst · Station Leaderboard
                </span>
              </div>

              <div className="divide-y divide-white/5">
                {stations.map((s, idx) => (
                  <div key={s.id} className="px-6 py-5 hover:bg-white/5 transition-colors">
                    <div className="flex items-start gap-4">
                      {/* Rank */}
                      <div
                        className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full text-sm font-black"
                        style={{
                          backgroundColor: idx === 0 ? NS_YELLOW : 'rgba(255,255,255,0.08)',
                          color: idx === 0 ? NS_BLUE : 'white',
                        }}
                      >
                        {idx + 1}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="text-base font-bold text-white">{s.name}</span>
                          <span className="text-xs text-white/40">{s.city} · geopend {s.opened_year}</span>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2">
                          {/* Passenger bar */}
                          <div className="flex-1 min-w-[120px]">
                            <div className="mb-1 flex justify-between text-xs text-white/50">
                              <span>Reizigers/dag</span>
                              <span style={{ color: NS_YELLOW }}>{s.daily_passengers.toLocaleString('nl-NL')}</span>
                            </div>
                            <PassengerBar value={s.daily_passengers} max={maxPassengers} />
                          </div>

                          {/* Platforms */}
                          <div className="text-center">
                            <div className="text-xs text-white/50 mb-1">Sporen</div>
                            <PlatformDots count={s.platforms} />
                          </div>
                        </div>

                        {/* Fun fact */}
                        <p className="mt-2 text-xs italic text-white/35">💡 {s.fun_fact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 px-6 py-3 text-center text-xs text-white/25">
                {stations.length} stations · Live uit PostgreSQL
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
