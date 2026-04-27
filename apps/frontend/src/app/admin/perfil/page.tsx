import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PerfilContent } from "./_components/PerfilContent";

export default function PerfilPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "employee"]} redirectTo="/auth/login">
      <PerfilContent />
    </ProtectedRoute>
  );
}