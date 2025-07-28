import React from 'react'

interface HeaderProps {
  onLogin: () => void
  onRegister: () => void
  isLoggedIn: boolean
}

const Header: React.FC<HeaderProps> = ({ onLogin, onRegister, isLoggedIn }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">Biblioteca Online</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
              Inicio
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
              Catálogo
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
              Mis Préstamos
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
              Contacto
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={onLogin}
                  className="btn-secondary"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={onRegister}
                  className="btn-primary"
                >
                  Registrarse
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Bienvenido, Usuario</span>
                <button className="btn-secondary">
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 