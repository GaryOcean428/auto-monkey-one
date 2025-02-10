import { authConfig } from "./auth-config";

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const { passwordPolicy } = authConfig;

  if (password.length < passwordPolicy.minLength) {
    errors.push(
      `Password must be at least ${passwordPolicy.minLength} characters`,
    );
  }

  if (passwordPolicy.requireNumbers && !/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (
    passwordPolicy.requireSpecialChars &&
    !/[!@#$%^&*(),.?":{}|<>]/.test(password)
  ) {
    errors.push("Password must contain at least one special character");
  }

  if (passwordPolicy.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function generateMFABackupCodes(count: number = 10): string[] {
  const codes: string[] = [];
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // Excluding similar looking characters

  for (let i = 0; i < count; i++) {
    let code = "";
    for (let j = 0; j < 8; j++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    codes.push(code.match(/.{4}/g)!.join("-")); // Format as XXXX-XXXX
  }

  return codes;
}

export function hashToken(token: string): string {
  return crypto.subtle
    .digest("SHA-256", new TextEncoder().encode(token))
    .then((hash) =>
      Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""),
    );
}

export async function generateRememberMeToken(): Promise<string> {
  const buffer = new Uint8Array(32);
  crypto.getRandomValues(buffer);
  return Array.from(buffer)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
