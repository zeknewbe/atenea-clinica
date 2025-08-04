// app/pacientes/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import PacientesTable from '@/components/PacientesTable'
import PacienteForm from '@/components/PacienteForm'

export default function PacientesPage() {
  const supabase = createClient()
  const [pacientes, setPacientes] = useState<any[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  useEffect(() => {
    async function fetchPacientes() {
      const { data, error } = await supabase.from('patients').select('*').order('created_at', { ascending: false })
      if (!error) setPacientes(data)
    }

    fetchPacientes()
  }, [mostrarFormulario])

  const pacientesFiltrados = pacientes.filter(p =>
    p.name.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.diagnostico?.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Pacientes</h2>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {mostrarFormulario ? 'Cancelar' : 'Nuevo Paciente'}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="mb-6">
          <PacienteForm onClose={() => setMostrarFormulario(false)} />
        </div>
      )}

      <input
        type="text"
        placeholder="Buscar por nombre o diagnóstico..."
        className="mb-4 p-2 w-full border rounded"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      <PacientesTable pacientes={pacientesFiltrados} />
    </div>
  )
}