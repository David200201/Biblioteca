import './globals.css'

export const metadata = {
  title: 'Biblioteca Online',
  description: 'Sistema de gestión de biblioteca online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  )
} 