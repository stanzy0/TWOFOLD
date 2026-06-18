import { describe, it, expect } from "vitest";
import { loginSchema, signupSchema, settingsSchema } from "@/lib/validation";

describe("validation schemas", () => {
  it("accepts valid login data", () => {
    const result = loginSchema.parse({ email: "a@b.com", password: "123456" });
    expect(result.email).toBe("a@b.com");
  });

  it("rejects invalid login email", () => {
    expect(() => loginSchema.parse({ email: "bad", password: "123456" })).toThrow();
  });

  it("rejects short login password", () => {
    expect(() => loginSchema.parse({ email: "a@b.com", password: "123" })).toThrow();
  });

  it("accepts valid signup data", () => {
    const result = signupSchema.parse({ name: "Ada", email: "a@b.com", password: "123456" });
    expect(result.name).toBe("Ada");
  });

  it("rejects short signup name", () => {
    expect(() => signupSchema.parse({ name: "A", email: "a@b.com", password: "123456" })).toThrow();
  });

  it("accepts valid settings", () => {
    const result = settingsSchema.parse({ emailNotifications: true, pushNotifications: false });
    expect(result.emailNotifications).toBe(true);
  });
});
