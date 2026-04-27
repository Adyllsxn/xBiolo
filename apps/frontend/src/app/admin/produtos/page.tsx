import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ProdutosContent } from "./_components/ProdutosContent";

export default function ProdutosPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "employee"]} redirectTo="/auth/login">
      <ProdutosContent />
    </ProtectedRoute>
  );
}