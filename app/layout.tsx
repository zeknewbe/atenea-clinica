// app/layout.tsx

import '../styles/globals.css'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Atenea Clínica',
  description: 'Gestión integral de pacientes con enfoque clínico y psicológico.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className + ' bg-gray-50 text-gray-900'}>
        {children}
      </body>
    </html>
  )
}