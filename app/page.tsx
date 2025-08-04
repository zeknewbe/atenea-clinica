// app/page.tsx

import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a <span className="text-blue-600">Atenea Clínica</span></h1>
      <p className="text-lg mb-6">Explorá los pacientes desde el menú o creá uno nuevo para comenzar.</p>
      <Link
        href="/pacientes"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Ir al panel de pacientes
      </Link>
    </main>
  )
}