import { describe, it, expect } from "vitest";

describe("app smoke tests", () => {
  it("has valid package.json scripts", () => {
    const pkg = require("../package.json");
    expect(pkg.scripts.dev).toBeDefined();
    expect(pkg.scripts.build).toBeDefined();
  });

  it("has zod installed and working", () => {
    const { z } = require("zod");
    const schema = z.object({ name: z.string() });
    expect(() => schema.parse({ name: "ok" })).not.toThrow();
    expect(() => schema.parse({ name: 123 })).toThrow();
  });
});
