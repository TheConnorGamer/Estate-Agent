# Security Audit -- Estate Agent (Sterling and Park)

**Date:** 2026-08-03
**Project path:** `Portfolio/Estate-Agent/`
**Framework:** React 18.3.1 + Vite 6.0.3 + TypeScript 5.6.3 + TailwindCSS 3.4.16

---

## 1. Secrets and Credentials Scan

| Check | Result |
|---|---|
| API keys / tokens | Clean -- none found |
| Hardcoded passwords | Clean -- none found |
| Real email addresses | Clean -- fictional demo data only (`enquiries@sterlingpark.co.uk`, agent emails) |
| Real phone numbers | Clean -- none found |
| Environment variables | Clean -- zero uses of `import.meta.env` or `process.env` |

## 2. Dependency Audit

| Dependency | Version | Risk |
|---|---|---|
| react | ^18.3.1 | Low |
| react-dom | ^18.3.1 | Low |
| framer-motion | ^11.15.0 | Low |
| react-icons | ^5.4.0 | Low |
| vite | 6.0.3 | Low -- current |
| typescript | 5.6.3 | Low -- current |
| tailwindcss | 3.4.16 | Low -- current |

**Audit command:** `npm audit --audit-level=high`

**Note:** This project has the leanest dependency footprint in the entire portfolio (4 runtime deps). It does NOT use `gsap`, `lenis`, or `react-router-dom`, significantly reducing supply-chain risk.

## 3. Security Headers (Vite Dev Server)

| Header | Value | Status |
|---|---|---|
| X-Content-Type-Options | nosniff | Configured |
| X-Frame-Options | DENY | Configured |
| Referrer-Policy | strict-origin-when-cross-origin | Configured |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | Configured |
| Content-Security-Policy | -- | **Missing** |
| Strict-Transport-Security | -- | **Missing** (not applicable to dev server) |

**Note:** Headers are only applied to the Vite dev server. No production header injection mechanism exists.

## 4. Form Security (Alerts.tsx -- property alert signup)

| Measure | Status |
|---|---|
| HTML5 input constraints | type="email", type="text", maxLength, required |
| Client-side validation | State-based `validate()` with inline error messages |
| Email regex validation | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| Phone pattern | `[\d\s\-\+\(\)]{7,20}` (optional field) |
| Honeypot anti-bot | Hidden field with `tabIndex={-1}`, off-screen positioning |
| Submit cooldown | 3-second button disable after submit |
| Success state | Inline confirmation |
| Input sanitization | maxLength=100 on name/email, maxLength=200 on textareas |

## 5. Code-Level Security

| Check | Result |
|---|---|
| dangerouslySetInnerHTML | Clean -- zero uses |
| eval() | Clean -- zero uses |
| document.write() | Clean -- zero uses |
| innerHTML usage | Clean -- zero uses |
| localStorage / sessionStorage | Clean -- zero uses |
| XSS via URL params | Clean -- no `useSearchParams` usage |

## 6. Build and Source Protection

| Measure | Status |
|---|---|
| Sourcemaps disabled in production | `sourcemap: false` |
| .gitignore covers .env* | Yes |
| .gitignore covers dist/ | Yes |
| .gitignore covers node_modules/ | Yes |
| TypeScript strict mode | Enabled via `tsc` build step |

## 7. Recommendations

1. **Add Content-Security-Policy header** -- The only missing security header.
2. **Add production header deployment** -- Use `vite-plugin-html` or deployment config.

---

**Overall Risk Level: LOW**

Sterling and Park has the leanest dependency footprint in the portfolio (4 runtime dependencies -- react, react-dom, framer-motion, react-icons). No Three.js, no GSAP, no lenis, no router. This minimal supply chain is a security positive. The property alert signup form has full client-side validation with honeypot and cooldown. All dependency versions are current.
