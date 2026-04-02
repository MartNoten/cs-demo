import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.DB_DEMO_DB_HOST,
  port: Number(process.env.DB_DEMO_DB_PORT) || 5432,
  user: process.env.DB_DEMO_DB_USERNAME,
  password: process.env.DB_DEMO_DB_PASSWORD,
  database: process.env.DB_DEMO_DB_DATABASE,
  ssl: { rejectUnauthorized: false },
})

export async function GET() {
  const client = await pool.connect()
  try {
    // Seed table on first call
    await client.query(`
      CREATE TABLE IF NOT EXISTS ns_stations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        city TEXT NOT NULL,
        platforms INTEGER NOT NULL,
        daily_passengers INTEGER NOT NULL,
        opened_year INTEGER NOT NULL,
        fun_fact TEXT NOT NULL
      )
    `)

    const { rowCount } = await client.query('SELECT 1 FROM ns_stations LIMIT 1')
    if (!rowCount) {
      await client.query(`
        INSERT INTO ns_stations (name, city, platforms, daily_passengers, opened_year, fun_fact) VALUES
        ('Amsterdam Centraal', 'Amsterdam', 15, 200000, 1889, 'Gebouwd op 8687 houten palen'),
        ('Utrecht Centraal', 'Utrecht', 16, 110000, 1843, 'Drukste transferstation van Nederland'),
        ('Rotterdam Centraal', 'Rotterdam', 13, 110000, 1957, 'Ontworpen als een ruimteschip'),
        ('Den Haag Centraal', 'Den Haag', 8, 75000, 1973, 'Pal naast het regeringscentrum'),
        ('Eindhoven', 'Eindhoven', 6, 60000, 1866, 'Thuisstad van Philips en ASML'),
        ('Schiphol Airport', 'Haarlemmermeer', 4, 50000, 1978, 'Enige NS-station onder zeeniveau'),
        ('Leiden Centraal', 'Leiden', 7, 45000, 1842, 'Oudste station in gebruik in NL'),
        ('Groningen', 'Groningen', 5, 35000, 1866, 'Verst van Amsterdam op het hoofdnet')
      `)
    }

    const { rows: stations } = await client.query(
      'SELECT * FROM ns_stations ORDER BY daily_passengers DESC'
    )

    const { rows: meta } = await client.query(`
      SELECT version() AS pg_version, current_database() AS db_name, now() AS server_time
    `)

    return NextResponse.json({ stations, meta: meta[0] })
  } finally {
    client.release()
  }
}
