// app/lib/serverCrypto.js  (só roda no servidor, nunca importe em componente "use client")
// import "server-only"; // descomente depois de: npm install server-only
import crypto from "node:crypto";

function getKey() {
  const hex = process.env.NOTES_ENC_KEY;

  if (!hex || hex.length !== 64) {
    throw new Error("NOTES_ENC_KEY ausente ou inválida (precisa de 64 caracteres hex)");
  }

  return Buffer.from(hex, "hex");
}

// Guarda: base64( IV(12) + tag(16) + texto cifrado ), sem prefixo.
// O userId entra como AAD: uma nota copiada pra outro usuário deixa de abrir.
export function encryptText(text, userId) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getKey(), iv);
  cipher.setAAD(Buffer.from(userId));

  const enc = Buffer.concat([cipher.update(text ?? "", "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, enc]).toString("base64");
}

// Lança erro se o valor não for uma nota encriptada com esta chave e este usuário.
export function decryptText(value, userId) {
  if (value == null) {
    return "";
  }

  const buf = Buffer.from(value, "base64");

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
