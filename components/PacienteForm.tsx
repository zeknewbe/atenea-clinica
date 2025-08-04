"use client";

import { useState } from "react";
import { Paciente } from "@/types";
import { createPaciente, updatePaciente } from "@/lib/supabase";

type Props = {
  paciente?: Paciente;
  onSave?: () => void;
};

export default function PacienteForm({ paciente, onSave }: Props) {
  const [formData, setFormData] = useState<Paciente>(
    paciente || {
      id: 0,
      nombre: "",
      edad: 0,
      diagnostico: "",
      eneagrama: "",
      diseno_humano: "",
      observaciones: "",
      sesiones: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paciente) {
      await updatePaciente(formData);
    } else {
      await createPaciente(formData);
    }
    if (onSave) onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="edad"
        value={formData.edad}
        onChange={handleChange}
        placeholder="Edad"
        className="w-full p-2 border rounded"
      />
      <input
        name="diagnostico"
        value={formData.diagnostico}
        onChange={handleChange}
        placeholder="Diagnóstico"
        className="w-full p-2 border rounded"
      />
      <input
        name="eneagrama"
        value={formData.eneagrama}
        onChange={handleChange}
        placeholder="Eneagrama"
        className="w-full p-2 border rounded"
      />
      <input
        name="diseno_humano"
        value={formData.diseno_humano}
        onChange={handleChange}
        placeholder="Diseño Humano"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="observaciones"
        value={formData.observaciones}
        onChange={handleChange}
        placeholder="Observaciones"
        className="w-full p-2 border rounded"
        rows={3}
      />
      <textarea
        name="sesiones"
        value={formData.sesiones}
        onChange={handleChange}
        placeholder="Sesiones"
        className="w-full p-2 border rounded"
        rows={5}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Guardar
      </button>
    </form>
  );
}