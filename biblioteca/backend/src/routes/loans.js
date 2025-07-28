const express = require('express');
const router = express.Router();

// Obtener préstamos del usuario
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Simular préstamos del usuario
        const loans = [
            {
                id: 1,
                bookId: 1,
                bookTitle: "El Señor de los Anillos",
                bookAuthor: "J.R.R. Tolkien",
                bookCover: "https://via.placeholder.com/100x150/3b82f6/ffffff?text=Libro+1",
                loanDate: "2024-01-10",
                dueDate: "2024-02-10",
                returnDate: null,
                status: "active", // active, returned, overdue
                isOverdue: false
            },
            {
                id: 2,
                bookId: 2,
                bookTitle: "1984",
                bookAuthor: "George Orwell",
                bookCover: "https://via.placeholder.com/100x150/ef4444/ffffff?text=Libro+2",
                loanDate: "2024-01-05",
                dueDate: "2024-02-05",
                returnDate: "2024-01-20",
                status: "returned",
                isOverdue: false
            }
        ];

        res.json(loans);

    } catch (error) {
        console.error('Error obteniendo préstamos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Crear nuevo préstamo
router.post('/', async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        // Validar que el libro esté disponible
        // Aquí se verificaría en la base de datos

        // Simular creación de préstamo
        const newLoan = {
            id: Date.now(),
            userId: parseInt(userId),
            bookId: parseInt(bookId),
            bookTitle: "El Señor de los Anillos",
            bookAuthor: "J.R.R. Tolkien",
            bookCover: "https://via.placeholder.com/100x150/3b82f6/ffffff?text=Libro+1",
            loanDate: new Date().toISOString().split('T')[0],
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 días
            returnDate: null,
            status: "active",
            isOverdue: false
        };

        res.status(201).json({
            message: 'Préstamo creado exitosamente',
            loan: newLoan
        });

    } catch (error) {
        console.error('Error creando préstamo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Renovar préstamo
router.put('/:loanId/renew', async (req, res) => {
    try {
        const { loanId } = req.params;

        // Simular renovación
        const updatedLoan = {
            id: parseInt(loanId),
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 días más
            status: "active",
            isOverdue: false
        };

        res.json({
            message: 'Préstamo renovado exitosamente',
            loan: updatedLoan
        });

    } catch (error) {
        console.error('Error renovando préstamo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Devolver libro
router.put('/:loanId/return', async (req, res) => {
    try {
        const { loanId } = req.params;

        // Simular devolución
        const updatedLoan = {
            id: parseInt(loanId),
            returnDate: new Date().toISOString().split('T')[0],
            status: "returned"
        };

        res.json({
            message: 'Libro devuelto exitosamente',
            loan: updatedLoan
        });

    } catch (error) {
        console.error('Error devolviendo libro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener estadísticas de préstamos
router.get('/stats/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Simular estadísticas
        const stats = {
            totalLoans: 15,
            activeLoans: 3,
            returnedLoans: 12,
            overdueLoans: 0,
            favoriteCategory: "Fantasía",
            averageRating: 4.5
        };

        res.json(stats);

    } catch (error) {
        console.error('Error obteniendo estadísticas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router; 