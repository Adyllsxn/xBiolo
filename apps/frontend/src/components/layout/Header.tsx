'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Search, 
  Heart, 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG, NAVIGATION_LINKS, HEADER_TOP_BAR, HEADER_SEARCH, HEADER_MOBILE } from '@/lib/constants';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top bar - Ofertas e informações */}
      <div className="bg-orange-600 text-white text-center py-2 text-sm">
        <div className="container mx-auto px-4">
          {HEADER_TOP_BAR.message}
        </div>
      </div>

      {/* Header principal */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-orange-600">
              {SITE_CONFIG.name}
            </h1>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={HEADER_SEARCH.placeholder}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search button - Mobile */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-orange-600"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Favoritos */}
            <Link href="/favoritos" className="hidden md:flex p-2 text-gray-600 hover:text-orange-600">
              <Heart className="h-5 w-5" />
            </Link>

            {/* Sacolinha */}
            <Link href="/sacolinha">
              <Button variant="ghost" size="icon" className="relative hover:bg-orange-50">
                <ShoppingBag className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white">
                  0
                </span>
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        {isSearchOpen && (
          <div className="md:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder={HEADER_SEARCH.placeholder}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-6 mt-3 pt-3 border-t">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-orange-600 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white p-4 shadow-lg">
          <nav className="flex flex-col gap-3">
            <Link
              href="/favoritos"
              className="flex items-center gap-2 py-2 text-sm font-medium hover:text-orange-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart className="h-4 w-4" />
              {HEADER_MOBILE.favorites}
            </Link>
            <div className="border-t my-2"></div>
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-sm font-medium hover:text-orange-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}