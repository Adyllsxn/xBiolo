'use client';

import { Button } from '@/components/ui/button';
import { FiEdit2 } from 'react-icons/fi';
import { CONFIGURACOES_CONFIG } from '../_constants/config';

interface ActionsButtonProps {
  onEdit: () => void;
}

export function ActionsButton({ onEdit }: ActionsButtonProps) {
  return (
    <div className="flex justify-end">
      <Button onClick={onEdit} className="bg-orange-500 hover:bg-orange-600">
        <FiEdit2 className="w-4 h-4 mr-2" />
        {CONFIGURACOES_CONFIG.buttons.edit.text}
      </Button>
    </div>
  );
}