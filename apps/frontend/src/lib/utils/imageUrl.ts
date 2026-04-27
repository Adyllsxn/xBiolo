const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function getImageUrl(path: string | null | undefined): string {
  if (!path) return '/images/placeholder.jpg';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/uploads/')) return `${API_URL}${path}`;
  return '/images/placeholder.jpg';
}