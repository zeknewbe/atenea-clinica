// Tipos para paciente
export interface Paciente {
  id: string;
  nombre: string;
  edad: number;
  diagnostico: string;
  eneagrama: string;
  disenoHumano: string;
  observaciones?: string;
  sesiones?: string;
  created_at?: string;
}

// Tipos para configuración visual de la app
export interface ConfiguracionVisual {
  fondo: string;
  encabezado: string;
  botones: string;
  acento: string;
  tipografia: string;
  logo?: string; // URL al logo si se sube
  mostrarLogoEn?: "encabezado" | "login" | "fichas";
  ubicacionPanelGPT?: "lateral" | "seccion";
}

// Opcional: tipo para entrada de historial de conversación con GPT
export interface EntradaConversacion {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: string;
}