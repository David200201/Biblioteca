const express = require('express');
const router = express.Router();

// Obtener perfil del usuario
router.get('/profile/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Simular perfil de usuario
        const userProfile = {
            id: parseInt(userId),
            firstName: "Juan",
            lastName: "Pérez",
            email: "juan.perez@email.com",
            phone: "+34 123 456 789",
            address: "Calle Mayor 123, Madrid",
            memberSince: "2023-01-15",
            membershipType: "Premium",
            totalLoans: 25,
            activeLoans: 2,
            favoriteCategories: ["Fantasía", "Ciencia Ficción"],
            readingPreferences: {
                preferredLanguages: ["Español", "Inglés"],
                preferredFormats: ["Físico", "Digital"],
                notifications: {
                    email: true,
                    sms: false,
                    push: true
                }
            }
        };

        res.json(userProfile);

    } catch (error) {
        console.error('Error obteniendo perfil:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar perfil del usuario
router.put('/profile/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;

        // Simular actualización
        const updatedProfile = {
            id: parseInt(userId),
            ...updateData,
            updatedAt: new Date().toISOString()
        };

        res.json({
            message: 'Perfil actualizado exitosamente',
            profile: updatedProfile
        });

    } catch (error) {
        console.error('Error actualizando perfil:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener historial de préstamos del usuario
router.get('/:userId/loan-history', async (req, res) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        // Simular historial de préstamos
        const loanHistory = [
            {
                id: 1,
                bookTitle: "El Señor de los Anillos",
                bookAuthor: "J.R.R. Tolkien",
                bookCover: "https://via.placeholder.com/100x150/3b82f6/ffffff?text=Libro+1",
                loanDate: "2024-01-10",
                returnDate: "2024-02-10",
                status: "returned",
                rating: 5,
                review: "Excelente libro, muy recomendado."
            },
            {
                id: 2,
                bookTitle: "1984",
                bookAuthor: "George Orwell",
                bookCover: "https://via.placeholder.com/100x150/ef4444/ffffff?text=Libro+2",
                loanDate: "2023-12-15",
                returnDate: "2024-01-15",
                status: "returned",
                rating: 4,
                review: "Muy interesante y actual."
            },
            {
                id: 3,
                bookTitle: "Cien años de soledad",
                bookAuthor: "Gabriel García Márquez",
                bookCover: "https://via.placeholder.com/100x150/10b981/ffffff?text=Libro+3",
                loanDate: "2023-11-20",
                returnDate: "2023-12-20",
                status: "returned",
                rating: 5,
                review: "Una obra maestra de la literatura latinoamericana."
            }
        ];

        // Paginación
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedHistory = loanHistory.slice(startIndex, endIndex);

        res.json({
            history: paginatedHistory,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(loanHistory.length / limit),
                totalItems: loanHistory.length,
                hasNext: endIndex < loanHistory.length,
                hasPrev: page > 1
            }
        });

    } catch (error) {
        console.error('Error obteniendo historial:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener recomendaciones para el usuario
router.get('/:userId/recommendations', async (req, res) => {
    try {
        const { userId } = req.params;

        // Simular recomendaciones basadas en preferencias
        const recommendations = [
            {
                id: 4,
                title: "El Hobbit",
                author: "J.R.R. Tolkien",
                cover: "https://via.placeholder.com/150x200/3b82f6/ffffff?text=Hobbit",
                category: "Fantasía",
                rating: 4.7,
                reason: "Basado en tu interés en El Señor de los Anillos"
            },
            {
                id: 5,
                title: "Rebelión en la granja",
                author: "George Orwell",
                cover: "https://via.placeholder.com/150x200/ef4444/ffffff?text=Rebelion",
                category: "Literatura",
                rating: 4.5,
                reason: "Similar a 1984 que has leído"
            },
            {
                id: 6,
                title: "Crónica de una muerte anunciada",
                author: "Gabriel García Márquez",
                cover: "https://via.placeholder.com/150x200/10b981/ffffff?text=Cronica",
                category: "Literatura",
                rating: 4.6,
                reason: "Del mismo autor que Cien años de soledad"
            }
        ];

        res.json(recommendations);

    } catch (error) {
        console.error('Error obteniendo recomendaciones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Cambiar contraseña
router.put('/:userId/change-password', async (req, res) => {
    try {
        const { userId } = req.params;
        const { currentPassword, newPassword } = req.body;

        // Aquí se validaría la contraseña actual y se cambiaría por la nueva
        // Por ahora simulamos el cambio

        res.json({
            message: 'Contraseña cambiada exitosamente'
        });

    } catch (error) {
        console.error('Error cambiando contraseña:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router; 