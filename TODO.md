# TODO

- [x] Update `lib/firebase.ts` to lazy-initialize Firebase/Auth and avoid throwing during build when env vars are missing/invalid.
- [x] Update login/auth hook code to use the lazy getter instead of an eager exported `auth` instance.
- [x] Fix login redirect loop caused by local auth not persisting session to `sessionStorage`
- [x] Standardize auth guards across all protected pages using `useAuth` + `useEffect` redirects
- [ ] Verify Next.js build passes locally (`npm run build`).
- [ ] (Optional) Re-run lint/typecheck if build reveals additional issues.
- [ ] Remove stale render-time auth guard in planner page (`if (!isLoggedIn) return ...Loading...`)
