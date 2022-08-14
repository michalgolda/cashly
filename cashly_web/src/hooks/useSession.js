import { useContext } from "react";
import { SessionContext } from "@/contexts/session";

export const useSession = () => useContext(SessionContext);
