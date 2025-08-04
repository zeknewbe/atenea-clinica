'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Configuracion } from '@/types'

const Navbar = () => {
  const pathname = usePathname()
  const [config, setConfig] = useState<Configuracion | null>(null)

  useEffect(() => {
    const fetchConfig = async () => {
      const { data } = await supabase.from('configuracion').select('*').eq('id', 1).single()
      setConfig(data)
    }
    fetchConfig()
  }, [])

  const isActive = (path: string) => pathname.startsWith(path)

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-gray-100 border-r p-4 flex flex-col">
      <div className="mb-8 flex items-center gap-2">
        {config?.mostrarLogo && config.logoURL && (
          <Image
            src={config.logoURL}
            alt="Logo"
            width={40}
            height={40}
            className="rounded"
          />
        )}
        <h1 className="text-lg font-bold">Atenea Clínica</h1>
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          href="/pacientes"
          className={`px-3 py-2 rounded ${
            isActive('/pacientes')
              ? 'bg-blue-600 text-white'
              : 'hover:bg-blue-100'
          }`}
        >
          Pacientes
        </Link>
        <Link
          href="/configuracion"
          className={`px-3 py-2 rounded ${
            isActive('/configuracion')
              ? 'bg-blue-600 text-white'
              : 'hover:bg-blue-100'
          }`}
        >
          Configuración
        </Link>
        {/* Futuro: botón de cerrar sesión, ayuda, etc. */}
      </nav>
    </aside>
  )
}

export default Navbar