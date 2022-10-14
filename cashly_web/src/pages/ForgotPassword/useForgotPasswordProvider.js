import { useState } from "react";

export const useForgotPasswordProvider = () => {
  const [resetLinkIsSent, setResetLinkIsSent] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);

  return {
    resetLinkIsSent,
    resetPasswordSuccess,
    setResetLinkIsSent,
    setResetPasswordSuccess,
  };
};
