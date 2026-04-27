import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardContent } from "./_components/DashboardContent";

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "employee"]} redirectTo="/auth/login">
      <DashboardContent />
    </ProtectedRoute>
  );
}