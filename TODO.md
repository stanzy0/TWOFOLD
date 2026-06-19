# TODO

- [x] Update `lib/firebase.ts` to lazy-initialize Firebase/Auth and avoid throwing during build when env vars are missing/invalid.
- [x] Update login/auth hook code to use the lazy getter instead of an eager exported `auth` instance.
- [ ] Verify Next.js build passes locally (`npm run build`).
- [ ] (Optional) Re-run lint/typecheck if build reveals additional issues.


