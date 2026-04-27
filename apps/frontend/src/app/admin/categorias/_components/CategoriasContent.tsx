"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiPlus, FiSearch } from "react-icons/fi";
import { getAllCategories, type Category } from "@/lib/modules/category";
import { CategoryTable } from "./CategoryTable";
import { CreateCategoryModal } from "../_modals/CreateCategoryModal";
import { EditCategoryModal } from "../_modals/EditCategoryModal";
import { DeleteCategoryModal } from "../_modals/DeleteCategoryModal";
import { RestoreCategoryModal } from "../_modals/RestoreCategoryModal";
import { CATEGORIAS_CONFIG } from "../_constants/categorias";
import { usePermissions } from "@/lib/modules/auth";

export function CategoriasContent() {
  const { canCreate } = usePermissions();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">A carregar categorias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {CATEGORIAS_CONFIG.title}
          </h1>
          <p className="text-gray-500 mt-1">{CATEGORIAS_CONFIG.subtitle}</p>
        </div>
        {canCreate && (
          <Button
            onClick={() => setCreateModalOpen(true)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <FiPlus className="w-4 h-4 mr-2" />
            {CATEGORIAS_CONFIG.buttons.create.text}
          </Button>
        )}
      </div>

      <div className="relative max-w-sm">
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <Input
          placeholder="Buscar categorias..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <CategoryTable
        categories={filteredCategories}
        onEdit={(category) => {
          setSelectedCategory(category);
          setEditModalOpen(true);
        }}
        onDelete={(category) => {
          setSelectedCategory(category);
          setDeleteModalOpen(true);
        }}
        onRestore={(category) => {
          setSelectedCategory(category);
          setRestoreModalOpen(true);
        }}
      />

      <CreateCategoryModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={fetchCategories}
      />

      <EditCategoryModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSuccess={fetchCategories}
        category={selectedCategory}
      />

      <DeleteCategoryModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onSuccess={fetchCategories}
        category={selectedCategory}
      />

      <RestoreCategoryModal
        open={restoreModalOpen}
        onClose={() => setRestoreModalOpen(false)}
        onSuccess={fetchCategories}
        category={selectedCategory}
      />
    </div>
  );
}