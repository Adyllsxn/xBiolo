import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PedidosContent } from "./_components/PedidosContent";

export default function PedidosPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "employee"]} redirectTo="/auth/login">
      <PedidosContent />
    </ProtectedRoute>
  );
}