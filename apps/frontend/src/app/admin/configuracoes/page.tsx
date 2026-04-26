'use client';

import { useEffect, useState } from 'react';
import { getStore, type Store } from '@/lib/modules/store';
import { getSystemHealth, getSystemInfo, type SystemHealth, type SystemInfo } from '@/lib/modules/system';
import { StoreInfo } from './_components/StoreInfo';
import { AppearanceInfo } from './_components/AppearanceInfo';
import { SystemInfo as SystemInfoComponent } from './_components/SystemInfo';
import { ActionsButton } from './_components/ActionsButton';
import { EditConfigModal } from './_modals/EditConfigModal';
import { CONFIGURACOES_CONFIG } from './_constants/config';

export default function ConfiguracoesPage() {
  const [store, setStore] = useState<Store | null>(null);
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [info, setInfo] = useState<SystemInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [storeData, healthData, infoData] = await Promise.all([
        getStore(),
        getSystemHealth(),
        getSystemInfo(),
      ]);
      setStore(storeData);
      setHealth(healthData);
      setInfo(infoData);
    } catch (error) {
      console.error(CONFIGURACOES_CONFIG.messages.loadError, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">A carregar configurações...</p>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Erro ao carregar configurações</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{CONFIGURACOES_CONFIG.title}</h1>
          <p className="text-gray-500 mt-1">{CONFIGURACOES_CONFIG.subtitle}</p>
        </div>
        <ActionsButton onEdit={() => setEditModalOpen(true)} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <StoreInfo
          store={{
            name: store.name,
            email: store.email,
            whatsapp: store.whatsapp,
            address: store.address,
          }}
        />
        <AppearanceInfo primaryColor={store.primaryColor} />
      </div>

      <SystemInfoComponent health={health} info={info} />

      <EditConfigModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSuccess={fetchData}
        store={store}
      />
    </div>
  );
}