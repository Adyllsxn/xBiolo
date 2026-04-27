import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { CategoriasContent } from "./_components/CategoriasContent";

export default function CategoriasPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "employee"]} redirectTo="/auth/login">
      <CategoriasContent />
    </ProtectedRoute>
  );
}