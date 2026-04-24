'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FiUser, FiMail, FiSave, FiX } from 'react-icons/fi';
import { PERFIL_CONFIG } from '../_constants/perfil';

interface ProfileFormProps {
  name: string;
  email: string;
  onSave: (data: { name: string; email: string }) => Promise<void>;
}

export function ProfileForm({ name, email, onSave }: ProfileFormProps) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name, email });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      setEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const section = PERFIL_CONFIG.sections.info;

  return (
    <Card className="shadow-sm border border-gray-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FiUser className="w-5 h-5 text-orange-500" />
              {section.title}
            </CardTitle>
            <CardDescription>{section.description}</CardDescription>
          </div>
          {!editing && (
            <Button
              variant="outline"
              onClick={() => setEditing(true)}
              className="text-orange-600 border-orange-200 hover:bg-orange-50"
            >
              {PERFIL_CONFIG.buttons.edit.text}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <FiUser className="w-4 h-4" />
                {section.fields.name.label}
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={section.fields.name.placeholder}
                className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <FiMail className="w-4 h-4" />
                {section.fields.email.label}
              </Label>
              <Input
                id="email"
                name="email"
                type={section.fields.email.type}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={section.fields.email.placeholder}
                className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600">
                {loading ? (
                  <>
                    <FiSave className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <FiSave className="w-4 h-4 mr-2" />
                    {PERFIL_CONFIG.buttons.save.text}
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditing(false);
                  setFormData({ name, email });
                }}
              >
                <FiX className="w-4 h-4 mr-2" />
                {PERFIL_CONFIG.buttons.cancel.text}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-sm text-gray-500">{section.fields.name.label}</span>
              <span className="text-gray-800 font-medium">{name}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-sm text-gray-500">{section.fields.email.label}</span>
              <span className="text-gray-800">{email}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}