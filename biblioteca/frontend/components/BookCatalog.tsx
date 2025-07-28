import React, { useState } from 'react'

interface Book {
  id: number
  title: string
  author: string
  cover: string
  category: string
  rating: number
  available: boolean
}

const BookCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Datos de ejemplo
  const books: Book[] = [
    {
      id: 1,
      title: "El Señor de los Anillos",
      author: "J.R.R. Tolkien",
      cover: "https://via.placeholder.com/150x200/3b82f6/ffffff?text=Libro+1",
      category: "Fantasía",
      rating: 4.8,
      available: true
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      cover: "https://via.placeholder.com/150x200/ef4444/ffffff?text=Libro+2",
      category: "Ciencia Ficción",
      rating: 4.6,
      available: true
    },
    {
      id: 3,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      cover: "https://via.placeholder.com/150x200/10b981/ffffff?text=Libro+3",
      category: "Literatura",
      rating: 4.9,
      available: false
    },
    {
      id: 4,
      title: "Harry Potter y la piedra filosofal",
      author: "J.K. Rowling",
      cover: "https://via.placeholder.com/150x200/f59e0b/ffffff?text=Libro+4",
      category: "Fantasía",
      rating: 4.7,
      available: true
    }
  ]

  const categories = ['all', 'Fantasía', 'Ciencia Ficción', 'Literatura', 'Historia', 'Tecnología']

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Catálogo de Libros
          </h2>
          <p className="text-lg text-gray-600">
            Explora nuestra colección de libros digitales y físicos
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por título o autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Todas las categorías' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid de libros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <div key={book.id} className="card hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                {!book.available && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                    Prestado
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {book.title}
              </h3>
              <p className="text-gray-600 mb-2">{book.author}</p>
              <p className="text-sm text-gray-500 mb-3">{book.category}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-yellow-500">⭐</span>
                  <span className="ml-1 text-sm text-gray-600">{book.rating}</span>
                </div>
                
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    book.available
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!book.available}
                >
                  {book.available ? 'Prestar' : 'No disponible'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron libros que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default BookCatalog 