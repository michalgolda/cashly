import { useEffect } from "react";
import { AuthLayout } from "@/layouts";
import SuccessMessage from "./SuccessMessage/SuccessMessage";
import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";
import { ForgotPasswordProvider } from "./ForgotPasswordContext";
import { useForgotPasswordProvider } from "./useForgotPasswordProvider";
import ResetPasswordForm from "./ResetPasswordForm/ResetPasswordForm";

export default function ForgotPassword() {
  const forgotPasswordProvider = useForgotPasswordProvider();
  const showResetForm =
    !forgotPasswordProvider.resetLinkIsSent &&
    !forgotPasswordProvider.resetPasswordSuccess;

  return (
    <AuthLayout>
      <>
        <h2>Resetowanie hasła</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <ResetPasswordForm />
      </>
      {/* <ForgotPasswordProvider forgotProvider={forgotPasswordProvider}>
        {forgotPasswordProvider.resetLinkIsSent && (
          <SuccessMessage
            title="Link został pomyślnie wysłany"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        )}

        {forgotPasswordProvider.resetPasswordSuccess && (
          <SuccessMessage
            title="Hasło zostało pomyślnie zmienione"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        )}

        {showResetForm && (
          <>
            <h2>Resetowanie hasła</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ForgotPasswordForm />
          </>
        )}
      </ForgotPasswordProvider> */}
    </AuthLayout>
  );
}
