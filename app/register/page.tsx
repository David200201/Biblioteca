"use client";
import RegisterModal from '../../components/RegisterModal';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <RegisterModal
          onClose={() => router.push('/login')}
          onSwitchToLogin={() => router.push('/login')}
          onRegisterSuccess={() => router.push('/login?registered=1')}
        />
      </div>
    </Suspense>
  );
}
