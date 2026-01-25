# Launch & Growth Strategy

## 1. Hosting Strategy

**Current Status**: GitHub Pages (Free Tier).
**Verdict**: ✅ **Good for now (MVP)** to validate demand.

### Should you upgrade to GitHub Pro?

**No.** GitHub Pro ($4/mo) gives you private repositories and more Actions minutes, but it does NOT significantly improve hosting performance for static sites.

### Recommendation: Move to Vercel (Free Tier)

When you are ready to scale, I recommend deploying to **Vercel**.

- **Why?**: Faster global CDN (Edge Network), easier setup for custom domains (`frenzo.services`), and automatic HTTPS management.
- **Cost**: Free for hobby/personal projects. $20/mo only if you need team features.

---

## 2. Customer Acquisition (Ads vs. AdSense)

There is a critical distinction to make:

- ❌ **Google AdSense**: Placing _other people's_ ads on your website to earn pennies per click. **Do not do this.** Your goal is to sell high-ticket services, not distract users with cheap ads.
- ✅ **Google Ads (Search)**: Paying Google to show _your_ website when people search "headless cms migration" or "custom influencer website".

### Strategy

1.  **Don't run ads yet.** Your site is currently a "Landing Page". It needs to be a conversion machine first.
2.  **Trust Signals**: We just added the video and badges. This is a great start.
3.  **Content**: Start writing blog posts (SEO) about "Why you need to own your platform" before paying for ads.

---

## 3. SEO (Search Engine Optimization)

Your current website has **zero SEO**. Google doesn't know what it is about because the title is "temp_app" and there are no descriptions.

### Immediate Action Plan (I will do this next):

1.  **Fix Metadata**: Change title to "Frenzo | Build Independent Digital Platforms".
2.  **Add Meta Tags**: Description, OpenGraph (for Twitter/LinkedIn sharing cards).
3.  **Dynamic SEO**: Install `react-helmet-async` so every page (`/services`, `/about`) has a unique title.
4.  **Sitemap**: Generate a `sitemap.xml` so Google can find your pages.

---

## 4. Website Experience Enhancements

To make it feel "Premium":

1.  **Performance**: Optimize the large video file (lazy load it) so the site loads instantly.
2.  **Analytics**: Add a privacy-friendly analytics tool (like PostHog or Plausible) to see where users drop off, instead of heavyweight Google Analytics.
