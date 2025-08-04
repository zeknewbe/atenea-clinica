// Formatear fecha (ej: "2025-07-30" → "30/07/2025")
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Validar campos obligatorios del paciente
export function validatePacienteData(data: any): string[] {
  const errors: string[] = [];

  if (!data.nombre || data.nombre.trim() === "") {
    errors.push("El nombre es obligatorio.");
  }
  if (!data.edad || isNaN(data.edad)) {
    errors.push("La edad debe ser un número válido.");
  }
  if (!data.diagnostico || data.diagnostico.trim() === "") {
    errors.push("El diagnóstico es obligatorio.");
  }

  return errors;
}

// Generar iniciales del paciente (ej: "Juan Pérez" → "JP")
export function getInitials(nombre: string): string {
  const palabras = nombre.trim().split(" ");
  if (palabras.length === 1) return palabras[0][0].toUpperCase();
  return (palabras[0][0] + palabras[1][0]).toUpperCase();
}