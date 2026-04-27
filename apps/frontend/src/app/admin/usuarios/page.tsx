import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { UsuariosContent } from "./_components/UsuariosContent";

export default function UsuariosPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin">
      <UsuariosContent />
    </ProtectedRoute>
  );
}