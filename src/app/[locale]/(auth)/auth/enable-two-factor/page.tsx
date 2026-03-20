"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { authClient } from "@/lib/auth-client";

export default function Setup2FAPage() {
  const [totpURI, setTotpURI] = useState<string | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [password, setPassword] = useState("");

  const handleEnable = async () => {
    const { data, error } = await authClient.twoFactor.enable({ password });

    if (error) {
      alert(error.message);
      return;
    }

    setTotpURI(data.totpURI);
    setBackupCodes(data.backupCodes);
  };

  if (totpURI) {
    return (
      <div className="mx-auto max-w-md px-6 py-8 space-y-6">
        <h1 className="text-2xl font-bold">Escaneie no Google Authenticator</h1>
        <QRCode value={totpURI} />
        <div>
          <p className="font-medium mb-2">
            Códigos de backup — guarde em lugar seguro:
          </p>
          <ul className="font-mono text-sm space-y-1">
            {backupCodes.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-6 py-8 space-y-4">
      <h1 className="text-2xl font-bold">Ativar 2FA</h1>
      <input
        type="password"
        placeholder="Sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <button
        onClick={handleEnable}
        className="w-full bg-primary text-primary-foreground rounded px-4 py-2"
      >
        Gerar QR Code
      </button>
    </div>
  );
}
