import { Navigate } from "react-router-dom";
import { useSession } from "@/hooks/useSession";
import { LoadingCurtain } from "@/components";

export default function AuthRedirect({ children }) {
  const { user, isLoading } = useSession();
  return isLoading ? (
    <LoadingCurtain />
  ) : user ? (
    <Navigate to="/" replace />
  ) : (
    children
  );
}
