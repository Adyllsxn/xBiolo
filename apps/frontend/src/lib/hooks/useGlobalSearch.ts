'use client';

import { useState, useEffect } from 'react';
import { getAllProducts } from '@/lib/modules/product';
import { getAllCategories } from '@/lib/modules/category';
import { getAllOrders } from '@/lib/modules/order';
import { getAllUsers } from '@/lib/modules/account';

export interface SearchResult {
  id: string;
  name: string;
  type: 'product' | 'category' | 'order' | 'user';
  href: string;
  icon: string;
  subtitle: string;
}

export function useGlobalSearch(query: string) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const lowerQuery = query.toLowerCase();
        const resultsList: SearchResult[] = [];

        // Buscar produtos
        try {
          const productsRes = await getAllProducts(1, 50);
          const products = productsRes.data.filter(p => 
            p.name?.toLowerCase().includes(lowerQuery) ||
            p.slug?.toLowerCase().includes(lowerQuery)
          );
          products.forEach(p => {
            resultsList.push({
              id: p.id,
              name: p.name,
              type: 'product',
              href: `/admin/produtos`,
              icon: '📦',
              subtitle: `Produto • ${p.price.toLocaleString('pt-AO')} Kz`,
            });
          });
        } catch (e) {
          console.error('Erro ao buscar produtos:', e);
        }

        // Buscar categorias
        try {
          const categories = await getAllCategories();
          const filteredCategories = categories.filter(c =>
            c.name?.toLowerCase().includes(lowerQuery) ||
            c.slug?.toLowerCase().includes(lowerQuery)
          );
          filteredCategories.forEach(c => {
            resultsList.push({
              id: c.id,
              name: c.name,
              type: 'category',
              href: `/admin/categorias`,
              icon: '🏷️',
              subtitle: `Categoria • ${c.slug}`,
            });
          });
        } catch (e) {
          console.error('Erro ao buscar categorias:', e);
        }

        // Buscar pedidos
        try {
          const ordersRes = await getAllOrders(1, 20);
          const orders = ordersRes.data.filter(o =>
            o.clientName?.toLowerCase().includes(lowerQuery) ||
            (o.clientPhone && o.clientPhone.includes(lowerQuery))
          );
          orders.forEach(o => {
            resultsList.push({
              id: o.id,
              name: o.clientName,
              type: 'order',
              href: `/admin/pedidos`,
              icon: '🛒',
              subtitle: `Pedido • ${o.total.toLocaleString('pt-AO')} Kz`,
            });
          });
        } catch (e) {
          console.error('Erro ao buscar pedidos:', e);
        }

        // Buscar utilizadores (apenas admin)
        try {
          const usersRes = await getAllUsers(1, 20);
          const users = usersRes.data.filter(u =>
            u.name?.toLowerCase().includes(lowerQuery) ||
            u.email?.toLowerCase().includes(lowerQuery)
          );
          users.forEach(u => {
            resultsList.push({
              id: u.id,
              name: u.name,
              type: 'user',
              href: `/admin/usuarios`,
              icon: '👤',
              subtitle: `Utilizador • ${u.email}`,
            });
          });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          // Se não tiver permissão, ignora
        }

        setResults(resultsList.slice(0, 8));
      } catch (error) {
        console.error('Erro na busca:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return { results, loading };
}