const express = require('express');
const router = express.Router();

// Obtener todos los libros
router.get('/', async (req, res) => {
    try {
        const { search, category, page = 1, limit = 10 } = req.query;

        // Simular datos de libros
        const books = [
            {
                id: 1,
                title: "El Señor de los Anillos",
                author: "J.R.R. Tolkien",
                isbn: "978-84-450-7179-3",
                category: "Fantasía",
                description: "Una épica historia de fantasía sobre la lucha contra el mal.",
                cover: "https://via.placeholder.com/150x200/3b82f6/ffffff?text=Libro+1",
                rating: 4.8,
                available: true,
                totalCopies: 5,
                availableCopies: 3,
                publishedYear: 1954,
                pages: 1216
            },
            {
                id: 2,
                title: "1984",
                author: "George Orwell",
                isbn: "978-84-397-2077-5",
                category: "Ciencia Ficción",
                description: "Una distopía sobre el control totalitario y la vigilancia.",
                cover: "https://via.placeholder.com/150x200/ef4444/ffffff?text=Libro+2",
                rating: 4.6,
                available: true,
                totalCopies: 3,
                availableCopies: 2,
                publishedYear: 1949,
                pages: 352
            },
            {
                id: 3,
                title: "Cien años de soledad",
                author: "Gabriel García Márquez",
                isbn: "978-84-397-2077-6",
                category: "Literatura",
                description: "La historia de la familia Buendía a lo largo de siete generaciones.",
                cover: "https://via.placeholder.com/150x200/10b981/ffffff?text=Libro+3",
                rating: 4.9,
                available: false,
                totalCopies: 4,
                availableCopies: 0,
                publishedYear: 1967,
                pages: 496
            }
        ];

        // Filtrar por búsqueda
        let filteredBooks = books;
        if (search) {
            filteredBooks = books.filter(book =>
                book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.author.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Filtrar por categoría
        if (category && category !== 'all') {
            filteredBooks = filteredBooks.filter(book => book.category === category);
        }

        // Paginación
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

        res.json({
            books: paginatedBooks,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(filteredBooks.length / limit),
                totalBooks: filteredBooks.length,
                hasNext: endIndex < filteredBooks.length,
                hasPrev: page > 1
            }
        });

    } catch (error) {
        console.error('Error obteniendo libros:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener un libro por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Simular búsqueda de libro
        const book = {
            id: parseInt(id),
            title: "El Señor de los Anillos",
            author: "J.R.R. Tolkien",
            isbn: "978-84-450-7179-3",
            category: "Fantasía",
            description: "Una épica historia de fantasía sobre la lucha contra el mal. La historia sigue a Frodo Bolsón, un hobbit que debe destruir un anillo poderoso para salvar a la Tierra Media.",
            cover: "https://via.placeholder.com/300x400/3b82f6/ffffff?text=Libro+1",
            rating: 4.8,
            available: true,
            totalCopies: 5,
            availableCopies: 3,
            publishedYear: 1954,
            pages: 1216,
            language: "Español",
            publisher: "Minotauro",
            reviews: [
                {
                    id: 1,
                    user: "María García",
                    rating: 5,
                    comment: "Una obra maestra de la literatura fantástica.",
                    date: "2024-01-15"
                },
                {
                    id: 2,
                    user: "Carlos López",
                    rating: 4,
                    comment: "Muy buena historia, aunque algo larga.",
                    date: "2024-01-10"
                }
            ]
        };

        if (!book) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }

        res.json(book);

    } catch (error) {
        console.error('Error obteniendo libro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener categorías de libros
router.get('/categories/list', async (req, res) => {
    try {
        const categories = [
            { id: 1, name: "Fantasía", count: 25 },
            { id: 2, name: "Ciencia Ficción", count: 18 },
            { id: 3, name: "Literatura", count: 32 },
            { id: 4, name: "Historia", count: 15 },
            { id: 5, name: "Tecnología", count: 12 },
            { id: 6, name: "Filosofía", count: 8 },
            { id: 7, name: "Biografía", count: 20 },
            { id: 8, name: "Poesía", count: 10 }
        ];

        res.json(categories);

    } catch (error) {
        console.error('Error obteniendo categorías:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router; 