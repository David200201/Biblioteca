'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import BookCatalog from '../components/BookCatalog'
import LoginModal from '../components/LoginModal'
import RegisterModal from '../components/RegisterModal'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Biblioteca Online</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
                Iniciar Sesión
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
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
                <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-colors">
                  Explorar Catálogo
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg text-lg transition-colors">
                  Registrarse Gratis
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Características Principales
              </h2>
              <p className="text-lg text-gray-600">
                Todo lo que necesitas para gestionar tu biblioteca digital
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Catálogo Completo</h3>
                <p className="text-gray-600">
                  Miles de libros disponibles en diferentes formatos
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Acceso 24/7</h3>
                <p className="text-gray-600">
                  Lee desde cualquier dispositivo, en cualquier momento
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Recomendaciones</h3>
                <p className="text-gray-600">
                  Descubre nuevos libros basados en tus intereses
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Books Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Libros Destacados
              </h2>
              <p className="text-lg text-gray-600">
                Explora nuestra colección de libros más populares
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="bg-gray-200 rounded-lg w-full h-64 mb-4 flex items-center justify-center">
                    <span className="text-gray-500">Libro {i}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Título del Libro {i}
                  </h3>
                  <p className="text-gray-600 mb-2">Autor del Libro</p>
                  <p className="text-sm text-gray-500 mb-3">Categoría</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-yellow-500">⭐</span>
                      <span className="ml-1 text-sm text-gray-600">4.5</span>
                    </div>
                    
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Prestar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Biblioteca Online</h3>
            <p className="text-gray-300 mb-4">
              Tu biblioteca digital de confianza
            </p>
            <p className="text-gray-400">
              © 2024 Biblioteca Online. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 