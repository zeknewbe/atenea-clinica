// app/layout.tsx
export const metadata = {
  title: "Atenea Clínica",
  description: "Sistema clínico integral",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}