"use client";
export const dynamic = "force-dynamic";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const registered = params.get('registered');

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://biblioteca-63yyy.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      setLoading(false);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.message || 'Credenciales incorrectas');
      }
    } catch (err: any) {
      setLoading(false);
      setError('Error de conexión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        {registered && (
          <div className="mb-4 text-green-600 text-center">¡Registro exitoso! Ahora puedes iniciar sesión.</div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="input-field w-full"
            placeholder="tu@email.com"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="input-field w-full"
            placeholder="••••••••"
          />
        </div>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full btn-primary"
          disabled={loading}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">¿No tienes cuenta?</span>
          <button
            type="button"
            className="ml-2 text-primary-600 hover:text-primary-500 font-medium"
            onClick={() => router.push('/register')}
          >
            Regístrate aquí
          </button>
        </div>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <LoginContent />
    </Suspense>
  );
}
