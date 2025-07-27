import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Para el prototipo, usamos una verificación simple
    if (username === 'david' && password === 'admin123') {
      return NextResponse.json(
        { success: true, message: 'Login correcto' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: 'Usuario o contraseña incorrectos' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 