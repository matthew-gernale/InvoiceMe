import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="InvoiceMe | Signin"
        description="This is the signin page of InvoiceMe app."
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
