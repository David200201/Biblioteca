import React from 'react'

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bienvenido a tu Biblioteca Digital
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Descubre miles de libros, gestiona tus préstamos y disfruta de la lectura 
            desde cualquier dispositivo, en cualquier momento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              Explorar Catálogo
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              Registrarse Gratis
            </button>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Catálogo Completo</h3>
            <p className="text-primary-100">
              Miles de libros disponibles en diferentes formatos
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Acceso 24/7</h3>
            <p className="text-primary-100">
              Lee desde cualquier dispositivo, en cualquier momento
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Recomendaciones</h3>
            <p className="text-primary-100">
              Descubre nuevos libros basados en tus intereses
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 