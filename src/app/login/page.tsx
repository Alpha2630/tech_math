import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Connexion",
};

function LoginFallback() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={28} />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}