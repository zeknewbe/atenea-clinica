// app/pacientes/[id]/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import ChatPanel from '@/components/ChatPanel'

export default function PacienteDetalle() {
  const supabase = createClient()
  const params = useParams()
  const [paciente, setPaciente] = useState<any>(null)

  useEffect(() => {
    async function fetchPaciente() {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('id', params.id)
        .single()

      if (!error) setPaciente(data)
    }

    fetchPaciente()
  }, [params.id])

  if (!paciente) return <div className="p-6">Cargando ficha del paciente...</div>

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">{paciente.name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p><strong>Edad:</strong> {paciente.edad}</p>
          <p><strong>Diagnóstico:</strong> {paciente.diagnostico}</p>
          <p><strong>Eneagrama:</strong> {paciente.eneagrama}</p>
          <p><strong>Diseño Humano:</strong> {paciente.diseno_humano}</p>
          <p><strong>Domicilio:</strong> {paciente.domicilio}</p>
          <p><strong>Teléfono:</strong> {paciente.telefono}</p>
          <p><strong>Tax ID:</strong> {paciente.tax_id}</p>
          <p><strong>Precio por sesión:</strong> {paciente.precio_sesion} {paciente.frecuencia && `(${paciente.frecuencia})`}</p>
        </div>
        <div>
          <p><strong>Fecha de nacimiento:</strong> {paciente.fecha_nacimiento}</p>
          <p><strong>Hora de nacimiento:</strong> {paciente.hora_nacimiento}</p>
          <p><strong>Lugar de nacimiento:</strong> {paciente.lugar_nacimiento}</p>
          <p><strong>Observaciones:</strong> {paciente.observaciones}</p>
        </div>
      </div>

      <div className="mt-8">
        <ChatPanel paciente={paciente} />
      </div>
    </div>
  )
}