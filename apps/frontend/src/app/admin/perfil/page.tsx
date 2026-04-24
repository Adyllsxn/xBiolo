'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMe, type User } from '@/lib/modules/account';
import { ProfileHeader } from './_components/ProfileHeader';
import { ProfileInfo } from './_components/ProfileInfo';
import { ProfileForm } from './_components/ProfileForm';
import { ProfileSecurity } from './_components/ProfileSecurity';
import { PERFIL_CONFIG } from './_constants/perfil';

export default function PerfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await getMe();
        setUser(data);
      } catch (error) {
        console.error(PERFIL_CONFIG.messages.loadError, error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSaveProfile = async (data: { name: string; email: string }) => {
    // TODO: Implementar update do perfil
    console.log('Salvando:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(PERFIL_CONFIG.messages.saveSuccess);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">A carregar perfil...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Erro ao carregar perfil</p>
        <button onClick={() => router.push('/admin')} className="mt-4 text-orange-500">
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{PERFIL_CONFIG.title}</h1>
        <p className="text-gray-500 mt-1">{PERFIL_CONFIG.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Sidebar - Info Card */}
        <div className="md:col-span-1">
          <ProfileHeader name={user.name} email={user.email} />
          <ProfileInfo user={user} />
        </div>

        {/* Main Content - Edit Form */}
        <div className="md:col-span-2 space-y-6">
          <ProfileForm 
            name={user.name} 
            email={user.email} 
            onSave={handleSaveProfile} 
          />
          <ProfileSecurity />
        </div>
      </div>
    </div>
  );
}