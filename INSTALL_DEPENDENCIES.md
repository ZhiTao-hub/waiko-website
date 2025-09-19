# 📦 Install Missing Dependencies

## Quick Fix

The development server is failing because the `web-vitals` package needs to be installed. Run this command:

```bash
npm install
```

This will install all dependencies including `web-vitals` which is already listed in your `package.json`.

## Alternative: Install Specific Package

If you only want to install the missing package:

```bash
npm install web-vitals@^3.5.0
```

## Verify Installation

After installation, restart your development server:

```bash
npm run dev
```

## What This Package Does

The `web-vitals` package provides:
- **Core Web Vitals monitoring** (FCP, LCP, FID, CLS)
- **Performance metrics tracking**
- **Real User Monitoring (RUM) capabilities**

## If You Don't Want Web Vitals

If you prefer not to use Web Vitals monitoring, you can:

1. **Disable it in config:**
```typescript
// src/config/performance.ts
export const FEATURE_FLAGS = {
  WEB_VITALS_MONITORING: false, // Set to false
  // ... other flags
};
```

2. **Or remove the component:**
```typescript
// src/App.tsx
// Comment out or remove this line:
// <WebVitalsMonitor />
```

## Development vs Production

- **Development**: Web Vitals monitoring is disabled by default
- **Production**: Automatically enabled for performance tracking

The component includes fallback performance monitoring even if `web-vitals` package is not available.

---

**Quick Solution**: Just run `npm install` and restart your dev server! 🚀