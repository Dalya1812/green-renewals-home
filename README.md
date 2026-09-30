# Green Renewals

South Florida home improvement services: roofing, impact windows and doors, HVAC, and insulation.

## Website

https://dalya1812.github.io/green-renewals-home/

Phone: +1 (786) 606-4596  
Office: 9000 Sheridan St, Suite 104, Pembroke Pines, FL 33024

## GitHub Pages

In Settings → Pages, select **GitHub Actions** as the publishing source.
The Pages workflow builds and publishes the website whenever main changes.

```sh
npm ci
npm run build:pages
npm run preview:pages
```

The static site is generated in `dist/`. Publish that output, not the repository source or README.
The contact form uses the existing Supabase backend and its anonymous insert policy.
