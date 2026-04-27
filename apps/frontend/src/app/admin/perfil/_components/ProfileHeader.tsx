'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FiUser } from 'react-icons/fi';

interface ProfileHeaderProps {
  name: string;
  email: string;
}

export function ProfileHeader({ name, email }: ProfileHeaderProps) {
  return (
    <Card className="text-center border-b bg-gray-50/50">
      <CardHeader>
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
          <FiUser className="w-10 h-10 text-white" />
        </div>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{email}</CardDescription>
      </CardHeader>
    </Card>
  );
}