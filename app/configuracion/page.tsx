'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import ConfiguracionPanel from '@/components/ConfiguracionPanel'

export default function ConfiguracionPage() {
  const supabase = createClient()
  const [config, setConfig] = useState<any>(null)

  useEffect(() => {
    async function fetchConfig() {
      const { data, error } = await supabase
        .from('configuracion')
        .select('*')
        .single()

      if (!error) setConfig(data)
    }

    fetchConfig()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Configuración de diseño</h2>
      {config ? (
        <ConfiguracionPanel config={config} />
      ) : (
        <p>Cargando configuración...</p>
      )}
    </div>
  )
}