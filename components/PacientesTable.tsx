'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Patient } from '@/types'

interface PacientesTableProps {
  pacientes: Patient[]
}

export default function PacientesTable({ pacientes }: PacientesTableProps) {
  const [search, setSearch] = useState('')

  const filtered = pacientes.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 w-full">
      <input
        type="text"
        placeholder="Buscar paciente por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="overflow-auto rounded shadow">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">Nombre</th>
              <th className="py-2 px-4">Edad</th>
              <th className="py-2 px-4">Diagnóstico</th>
              <th className="py-2 px-4">Eneagrama</th>
              <th className="py-2 px-4">Diseño Humano</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((paciente) => (
              <tr
                key={paciente.id}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="py-2 px-4">
                  <Link href={`/pacientes/${paciente.id}`}>{paciente.name}</Link>
                </td>
                <td className="py-2 px-4">{paciente.age}</td>
                <td className="py-2 px-4">{paciente.diagnosis}</td>
                <td className="py-2 px-4">{paciente.enneagram}</td>
                <td className="py-2 px-4">{paciente.humanDesign}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}