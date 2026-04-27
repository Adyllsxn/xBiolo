import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ConfiguracoesContent } from "./_components/ConfiguracoesContent";

export default function ConfiguracoesPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin">
      <ConfiguracoesContent />
    </ProtectedRoute>
  );
}