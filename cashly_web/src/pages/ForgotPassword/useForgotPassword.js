import { useContext } from "react";
import { ForgotPasswordContext } from "./ForgotPasswordContext";

export const useForgotPassword = () => useContext(ForgotPasswordContext);
