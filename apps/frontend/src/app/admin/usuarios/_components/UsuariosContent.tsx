"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiPlus, FiSearch } from "react-icons/fi";
import {
  getAllUsers,
  type User,
  type PaginatedUsersResponse,
} from "@/lib/modules/account";
import { UsersTable } from "./UsersTable";
import { Pagination } from "./Pagination";
import { CreateUserModal } from "../_modals/CreateUserModal";
import { EditUserModal } from "../_modals/EditUserModal";
import { ChangeRoleModal } from "../_modals/ChangeRoleModal";
import { DeleteUserModal } from "../_modals/DeleteUserModal";
import { RestoreUserModal } from "../_modals/RestoreUserModal";
import { USUARIOS_CONFIG } from "../_constants/usuarios";
import { usePermissions } from "@/lib/modules/auth";

export function UsuariosContent() {
  const { canManageUsers } = usePermissions();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async (page: number = 1) => {
    try {
      setLoading(true);
      const response: PaginatedUsersResponse = await getAllUsers(
        page,
        USUARIOS_CONFIG.limit,
      );
      setUsers(response.data);
      setTotalPages(response.totalPages);
      setTotalItems(response.total);
      setCurrentPage(response.page);
    } catch (error) {
      console.error("Erro ao carregar utilizadores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers(currentPage);
  }, [currentPage]);

  const filteredUsers = search
    ? users.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()),
      )
    : users;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">A carregar utilizadores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {USUARIOS_CONFIG.title}
          </h1>
          <p className="text-gray-500 mt-1">
            {USUARIOS_CONFIG.subtitle} • {totalItems} utilizadores
          </p>
        </div>
        {canManageUsers && (
          <Button
            onClick={() => setCreateModalOpen(true)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <FiPlus className="w-4 h-4 mr-2" />
            {USUARIOS_CONFIG.buttons.create.text}
          </Button>
        )}
      </div>

      <div className="relative max-w-sm">
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <Input
          placeholder="Buscar por nome ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <UsersTable
        users={filteredUsers}
        onEdit={(user) => {
          setSelectedUser(user);
          setEditModalOpen(true);
        }}
        onDelete={(user) => {
          setSelectedUser(user);
          setDeleteModalOpen(true);
        }}
        onRestore={(user) => {
          setSelectedUser(user);
          setRestoreModalOpen(true);
        }}
        onChangeRole={(user) => {
          setSelectedUser(user);
          setRoleModalOpen(true);
        }}
      />

      {!search && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      <CreateUserModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={() => fetchUsers(currentPage)}
      />

      <EditUserModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSuccess={() => fetchUsers(currentPage)}
        user={selectedUser}
      />

      <ChangeRoleModal
        open={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        onSuccess={() => fetchUsers(currentPage)}
        user={selectedUser}
      />

      <DeleteUserModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onSuccess={() => fetchUsers(currentPage)}
        user={selectedUser}
      />

      <RestoreUserModal
        open={restoreModalOpen}
        onClose={() => setRestoreModalOpen(false)}
        onSuccess={() => fetchUsers(currentPage)}
        user={selectedUser}
      />
    </div>
  );
}