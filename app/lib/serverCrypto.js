import "server-only";

// app/lib/serverCrypto.js  (só roda no servidor, nunca importe em componente "use client")
import crypto from "node:crypto";

const PREFIX = "enc:v1:";

function getKey() {
  const hex = process.env.NOTES_ENC_KEY;

  if (!hex || hex.length !== 64) {
    throw new Error("NOTES_ENC_KEY ausente ou inválida (precisa de 64 caracteres hex)");
  }

  return Buffer.from(hex, "hex");
}

// Guarda: prefixo + base64( IV(12) + tag(16) + texto cifrado )
// O userId entra como AAD: uma nota copiada pra outro usuário deixa de abrir.
export function encryptText(text, userId) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getKey(), iv);
  cipher.setAAD(Buffer.from(userId));

  const enc = Buffer.concat([cipher.update(text ?? "", "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return PREFIX + Buffer.concat([iv, tag, enc]).toString("base64");
}

export function decryptText(value, userId) {
  // Notas antigas (texto puro) passam direto, então dá pra ligar isso sem migrar nada
  if (typeof value !== "string" || !value.startsWith(PREFIX)) {
    return value ?? "";
  }

  const buf = Buffer.from(value.slice(PREFIX.length), "base64");

  const decipher = crypto.createDecipheriv("aes-256-gcm", getKey(), buf.subarray(0, 12));
  decipher.setAAD(Buffer.from(userId));
  decipher.setAuthTag(buf.subarray(12, 28));

  return Buffer.concat([decipher.update(buf.subarray(28)), decipher.final()]).toString("utf8");
}

export function decryptNote(note, userId) {
  return {
    ...note,
    title: decryptText(note.title, userId),
    content: decryptText(note.content, userId),
  };
}
