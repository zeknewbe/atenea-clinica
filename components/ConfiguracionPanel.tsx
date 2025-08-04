'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Configuracion } from '@/types'

const defaultConfig: Configuracion = {
  id: 1,
  fondo: '#ffffff',
  encabezado: '#1e3a8a',
  botones: '#2563eb',
  acento: '#10b981',
  tipografia: 'sans-serif',
  logoURL: '',
  mostrarLogo: true,
  ubicacionPanel: 'derecha', // 'derecha' o 'abajo'
}

export default function ConfiguracionPanel() {
  const [config, setConfig] = useState<Configuracion>(defaultConfig)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchConfig = async () => {
      const { data } = await supabase.from('configuracion').select('*').eq('id', 1).single()
      if (data) setConfig(data)
    }
    fetchConfig()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target
    setConfig((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    const { error } = await supabase
      .from('configuracion')
      .upsert({ ...config, id: 1 })

    if (!error) alert('Configuración guardada')
    else alert('Error al guardar')
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Configuración visual</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Color de fondo</label>
          <input type="color" name="fondo" value={config.fondo} onChange={handleChange} />
        </div>
        <div>
          <label>Encabezado</label>
          <input type="color" name="encabezado" value={config.encabezado} onChange={handleChange} />
        </div>
        <div>
          <label>Botones</label>
          <input type="color" name="botones" value={config.botones} onChange={handleChange} />
        </div>
        <div>
          <label>Acento</label>
          <input type="color" name="acento" value={config.acento} onChange={handleChange} />
        </div>
        <div className="col-span-2">
          <label>Tipografía</label>
          <select name="tipografia" value={config.tipografia} onChange={handleChange}>
            <option value="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
          </select>
        </div>
        <div className="col-span-2">
          <label>URL del logo</label>
          <input
            type="text"
            name="logoURL"
            value={config.logoURL}
            onChange={handleChange}
            className="w-full border rounded p-1"
            placeholder="https://ejemplo.com/logo.png"
          />
        </div>
        <div className="col-span-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="mostrarLogo"
              checked={config.mostrarLogo}
              onChange={handleChange}
            />
            Mostrar logo en encabezado
          </label>
        </div>
        <div className="col-span-2">
          <label>Ubicación del panel GPT</label>
          <select name="ubicacionPanel" value={config.ubicacionPanel} onChange={handleChange}>
            <option value="derecha">Lateral derecha</option>
            <option value="abajo">Debajo de la ficha</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Guardando...' : 'Guardar cambios'}
      </button>
    </div>
  )
}