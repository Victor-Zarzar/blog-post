"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";

export default function TwoFactorPage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleVerify = async () => {
    const { error } = await authClient.twoFactor.verifyTotp({ code });
    if (error) {
      alert(error.message);
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="mx-auto max-w-md px-6 py-8 space-y-4">
      <h1 className="text-2xl font-bold">Verificar 2FA</h1>
      <input
        type="text"
        placeholder="Código do autenticador"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <button
        onClick={handleVerify}
        className="w-full bg-primary text-primary-foreground rounded px-4 py-2"
      >
        Verificar
      </button>
    </div>
  );
}
