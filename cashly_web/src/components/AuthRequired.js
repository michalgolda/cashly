import { Navigate } from "react-router-dom";
import { useSession } from "@/hooks/useSession";
import { LoadingCurtain } from "@/components";

export default function AuthRequired({ children }) {
  const { user, isLoading } = useSession();
  return isLoading ? (
    <LoadingCurtain />
  ) : user ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}
