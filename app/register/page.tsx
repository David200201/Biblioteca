import RegisterModal from '../../components/RegisterModal';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <RegisterModal
        onClose={() => router.push('/login')}
        onSwitchToLogin={() => router.push('/login')}
        onRegisterSuccess={() => router.push('/login?registered=1')}
      />
    </div>
  );
}
