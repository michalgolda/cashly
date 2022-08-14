import { Navigate } from "react-router-dom";
import { useSession } from "@/hooks/useSession";

export default function AuthRequired({ children }) {
  const { user } = useSession();
  return user ? children : <Navigate to="/login" replace />;
}
