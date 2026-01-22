# Frenzo - Freedom to Scale

The official website for **Frenzo**, a global digital growth systems company.

## 🚀 Live Demo

**URL**: [https://rajsahilcoder.github.io/frenzo/](https://rajsahilcoder.github.io/frenzo/)

_(Note: The site will be live here **after** you push the code to GitHub and the Action completes.)_

## ⚡ How to Deploy (Important!)

You are currently running the code locally. To deploy it to the live URL above, you must **push the code to GitHub**.

Run these commands in your terminal:

```bash
# 1. Add your GitHub repository as the remote origin
git remote add origin https://github.com/rajsahilcoder/frenzo.git

# 2. Rename the current branch to 'main'
git branch -M main

# 3. Push the code
git push -u origin main
```

**What happens next?**

1.  GitHub Actions will automatically trigger.
2.  It will build the website.
3.  It will deploy it to the `gh-pages` branch.
4.  After about 1-2 minutes, your site will be live at the URL above.

---

## 🛠️ Local Development vs. Deployment

- **`npm run dev`**: This is for **YOU** to see the changes on your computer while you code. It runs at `http://localhost:5173`. No one else can see this.
- **Deployment**: This is when you push code to GitHub to make it public on the internet at `https://rajsahilcoder.github.io/frenzo/`.

## 📦 Project Setup

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
npm install
```

### Start Local Server

```bash
npm run dev
```

## ⚙️ Configuration Notes

- **Base Path**: The app is configured with `base: '/frenzo/'` in `vite.config.js` to work on GitHub Pages.
- **Routing**: `App.jsx` uses `basename="/frenzo"` to handle routing correctly on the live site.

## 📂 Project Structure

```
src/
├── components/
│   ├── layout/    # Navbar, Footer
│   └── ui/        # Reusable components
├── pages/         # Core pages
├── styles/        # Global CSS
└── App.jsx        # Main router
```

## 📄 License

All rights reserved. Frenzo 2026.
