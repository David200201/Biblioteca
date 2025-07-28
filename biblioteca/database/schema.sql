-- Esquema de Base de Datos para Biblioteca Online
-- Compatible con Azure SQL Database y SQL Server

-- Crear base de datos (ejecutar en Azure SQL)
-- CREATE DATABASE BibliotecaOnline;
-- GO

USE BibliotecaOnline;
GO

-- Tabla de Usuarios
CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    Phone NVARCHAR(20),
    Address NVARCHAR(200),
    MemberSince DATETIME2 DEFAULT GETDATE(),
    MembershipType NVARCHAR(20) DEFAULT 'Standard',
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE()
);

-- Tabla de Categorías de Libros
CREATE TABLE Categories (
    CategoryID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL UNIQUE,
    Description NVARCHAR(500),
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

-- Tabla de Libros
CREATE TABLE Books (
    BookID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    Author NVARCHAR(100) NOT NULL,
    ISBN NVARCHAR(20) UNIQUE,
    CategoryID INT FOREIGN KEY REFERENCES Categories(CategoryID),
    Description NVARCHAR(1000),
    CoverImage NVARCHAR(500),
    PublishedYear INT,
    Pages INT,
    Language NVARCHAR(20) DEFAULT 'Español',
    Publisher NVARCHAR(100),
    TotalCopies INT DEFAULT 1,
    AvailableCopies INT DEFAULT 1,
    AverageRating DECIMAL(3,2) DEFAULT 0,
    TotalRatings INT DEFAULT 0,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE()
);

-- Tabla de Préstamos
CREATE TABLE Loans (
    LoanID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    BookID INT FOREIGN KEY REFERENCES Books(BookID),
    LoanDate DATETIME2 DEFAULT GETDATE(),
    DueDate DATETIME2 NOT NULL,
    ReturnDate DATETIME2 NULL,
    Status NVARCHAR(20) DEFAULT 'active', -- active, returned, overdue
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE()
);

-- Tabla de Reservas
CREATE TABLE Reservations (
    ReservationID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    BookID INT FOREIGN KEY REFERENCES Books(BookID),
    ReservationDate DATETIME2 DEFAULT GETDATE(),
    ExpiryDate DATETIME2 NOT NULL,
    Status NVARCHAR(20) DEFAULT 'pending', -- pending, fulfilled, cancelled, expired
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

-- Tabla de Valoraciones y Reseñas
CREATE TABLE Reviews (
    ReviewID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    BookID INT FOREIGN KEY REFERENCES Books(BookID),
    Rating INT CHECK (Rating >= 1 AND Rating <= 5),
    Comment NVARCHAR(1000),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE()
);

-- Tabla de Libros Digitales
CREATE TABLE DigitalBooks (
    DigitalBookID INT IDENTITY(1,1) PRIMARY KEY,
    BookID INT FOREIGN KEY REFERENCES Books(BookID),
    FilePath NVARCHAR(500) NOT NULL,
    FileSize BIGINT,
    FileType NVARCHAR(20), -- PDF, EPUB, etc.
    IsAvailable BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

-- Tabla de Acceso a Libros Digitales
CREATE TABLE DigitalAccess (
    AccessID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    DigitalBookID INT FOREIGN KEY REFERENCES DigitalBooks(DigitalBookID),
    AccessDate DATETIME2 DEFAULT GETDATE(),
    ExpiryDate DATETIME2,
    IsActive BIT DEFAULT 1
);

-- Tabla de Notificaciones
CREATE TABLE Notifications (
    NotificationID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    Type NVARCHAR(50), -- loan_due, reservation_available, etc.
    Title NVARCHAR(100),
    Message NVARCHAR(500),
    IsRead BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

-- Tabla de Configuración del Sistema
CREATE TABLE SystemConfig (
    ConfigID INT IDENTITY(1,1) PRIMARY KEY,
    ConfigKey NVARCHAR(100) UNIQUE NOT NULL,
    ConfigValue NVARCHAR(500),
    Description NVARCHAR(200),
    UpdatedAt DATETIME2 DEFAULT GETDATE()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IX_Books_CategoryID ON Books(CategoryID);
CREATE INDEX IX_Books_Title ON Books(Title);
CREATE INDEX IX_Books_Author ON Books(Author);
CREATE INDEX IX_Loans_UserID ON Loans(UserID);
CREATE INDEX IX_Loans_BookID ON Loans(BookID);
CREATE INDEX IX_Loans_Status ON Loans(Status);
CREATE INDEX IX_Reviews_BookID ON Reviews(BookID);
CREATE INDEX IX_Reviews_UserID ON Reviews(UserID);
CREATE INDEX IX_Users_Email ON Users(Email);

-- Triggers para actualizar timestamps
GO

CREATE TRIGGER TR_Users_UpdatedAt
ON Users
AFTER UPDATE
AS
BEGIN
    UPDATE Users
    SET UpdatedAt = GETDATE()
    FROM Users u
    INNER JOIN inserted i ON u.UserID = i.UserID;
END;

GO

CREATE TRIGGER TR_Books_UpdatedAt
ON Books
AFTER UPDATE
AS
BEGIN
    UPDATE Books
    SET UpdatedAt = GETDATE()
    FROM Books b
    INNER JOIN inserted i ON b.BookID = i.BookID;
END;

GO

CREATE TRIGGER TR_Loans_UpdatedAt
ON Loans
AFTER UPDATE
AS
BEGIN
    UPDATE Loans
    SET UpdatedAt = GETDATE()
    FROM Loans l
    INNER JOIN inserted i ON l.LoanID = i.LoanID;
END;

GO

-- Procedimiento almacenado para calcular rating promedio
CREATE PROCEDURE UpdateBookRating
    @BookID INT
AS
BEGIN
    UPDATE Books
    SET AverageRating = (
        SELECT CAST(AVG(CAST(Rating AS DECIMAL(3,2))) AS DECIMAL(3,2))
        FROM Reviews
        WHERE BookID = @BookID
    ),
    TotalRatings = (
        SELECT COUNT(*)
        FROM Reviews
        WHERE BookID = @BookID
    )
    WHERE BookID = @BookID;
END;

GO

-- Trigger para actualizar rating cuando se agrega/modifica una reseña
CREATE TRIGGER TR_Reviews_UpdateRating
ON Reviews
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    DECLARE @BookID INT;
    
    IF EXISTS(SELECT * FROM inserted)
        SET @BookID = (SELECT BookID FROM inserted);
    ELSE IF EXISTS(SELECT * FROM deleted)
        SET @BookID = (SELECT BookID FROM deleted);
    
    IF @BookID IS NOT NULL
        EXEC UpdateBookRating @BookID;
END;

GO

-- Datos de ejemplo
INSERT INTO Categories (Name, Description) VALUES
('Fantasía', 'Libros de fantasía y mundos imaginarios'),
('Ciencia Ficción', 'Ciencia ficción y futuros alternativos'),
('Literatura', 'Literatura clásica y contemporánea'),
('Historia', 'Libros de historia y no ficción histórica'),
('Tecnología', 'Libros sobre tecnología y programación'),
('Filosofía', 'Libros de filosofía y pensamiento'),
('Biografía', 'Biografías y memorias'),
('Poesía', 'Poesía y versos');

GO

-- Configuración inicial del sistema
INSERT INTO SystemConfig (ConfigKey, ConfigValue, Description) VALUES
('loan_duration_days', '30', 'Duración del préstamo en días'),
('max_loans_per_user', '5', 'Máximo número de préstamos por usuario'),
('reservation_expiry_days', '7', 'Días de validez de una reserva'),
('overdue_fine_per_day', '0.50', 'Multa por día de retraso'),
('digital_access_days', '14', 'Días de acceso a libros digitales');

GO 