import { Navigate } from "react-router-dom";
import { useSession } from "@/hooks/useSession";

export default function AuthRedirect({ children }) {
  const { user } = useSession();
  return user ? <Navigate to="/" replace /> : children;
}
