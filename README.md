# Frenzo - Freedom to Scale

The official website for **Frenzo**, a global digital growth systems company.

## 🚀 Live Demo

**URL**: [https://frenzo.services](https://frenzo.services)

_(Note: DNS propagation can take up to 24-48 hours, but usually happens within minutes.)_

## ⚡ Deployment Instructions

### 1. Push to GitHub

Run these commands to deploy the latest changes:

```bash
git add .
git commit -m "configure custom domain"
git push
```

### 2. Configure DNS (Important!)

Since you are using a custom domain (`frenzo.services`), you need to configure your DNS settings at your domain registrar (where you bought the domain).

**Add the following records:**

| Type      | Name  | Value                     |
| :-------- | :---- | :------------------------ |
| **CNAME** | `www` | `rajsahilcoder.github.io` |
| **A**     | `@`   | `185.199.108.153`         |
| **A**     | `@`   | `185.199.109.153`         |
| **A**     | `@`   | `185.199.110.153`         |
| **A**     | `@`   | `185.199.111.153`         |

### 3. Verify GitHub Settings

1. Go to your GitHub Repository > **Settings** > **Pages**.
2. Under "Custom domain", you should see `frenzo.services`.
3. Check the box **"Enforce HTTPS"** (it might take a few minutes to become available).

## 🛠️ Local Development

```bash
npm install
npm run dev
```

## 📂 Project Structure

We follow a **Feature-Sliced (Hybrid)** architectural pattern to ensure scalability and separation of concerns.

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Shared Design System (Buttons, Layouts)
├── features/        # Complex Business Logic (Pricing, Contact)
│   ├── pricing/     # e.g., Pricing Logic, Constants, & UI
├── hooks/           # Shared Global Hooks
├── pages/           # Routing & Composition
└── styles/          # Global CSS
```

👉 **[Read full Architectural Guidelines](documents/ARCHITECTURE.md)**
