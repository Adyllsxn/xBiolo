"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe, type User } from "@/lib/modules/account";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileActions } from "./ProfileActions";
import { EditProfileModal } from "../_modals/EditProfileModal";
import { ChangePasswordModal } from "../_modals/ChangePasswordModal";
import { PERFIL_CONFIG } from "../_constants/perfil";

export function PerfilContent() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUser();
  }, []);

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
        <button
          onClick={() => router.push("/admin")}
          className="mt-4 text-orange-500"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          {PERFIL_CONFIG.title}
        </h1>
        <p className="text-gray-500 mt-1">{PERFIL_CONFIG.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ProfileHeader name={user.name} email={user.email} />
          <ProfileInfo user={user} />
        </div>

        <div className="md:col-span-2">
          <ProfileActions
            onEdit={() => setEditModalOpen(true)}
            onChangePassword={() => setPasswordModalOpen(true)}
          />
        </div>
      </div>

      <EditProfileModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSuccess={fetchUser}
        userId={user.id}
        currentName={user.name}
        currentEmail={user.email}
      />

      <ChangePasswordModal
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSuccess={() => {}}
      />
    </div>
  );
}