# Setup guide — putting MPSC Question Bank online

The folder is a complete static website. It works as soon as it is uploaded; sign-in and ads switch on when you fill in `config.js`. Do the steps in order. Total cost: only the domain name (about ₹500–1,000 a year). Everything else is on free plans.

## What's in the folder

| File | What it is |
|---|---|
| `index.html` | The question bank (practice, mock test, notes, review) |
| `data.js` | All 7,657 questions and the shortcut notes |
| `config.js` | **Your settings** — the only file you edit |
| `about.html`, `privacy.html` | Pages AdSense requires |
| `firestore.rules` | Security rules so each user sees only their own progress |
| `ads.txt` | Proves to advertisers that you own the site (fill in after AdSense approval) |
| `robots.txt` | Lets search engines index the site |

Before anything else, open `config.js` and set `contactEmail` to your real address.

## Step 1 — Put the site online (Netlify, free)

1. Go to **netlify.com**, sign up (you can use your Google account).
2. Choose **Add new site → Deploy manually**, and drag the whole folder onto the page.
3. In about a minute you get a free address like `something.netlify.app`. Open it — the question bank should work, with progress saved in the browser.

## Step 2 — Your own domain

1. Buy a domain (e.g. from GoDaddy, Hostinger, BigRock). A `.in` or `.com` name works.
2. In Netlify: **Site configuration → Domain management → Add a domain**, type your domain, and follow the instructions to point it to Netlify (either change the domain's nameservers to Netlify's, or add the records Netlify shows).
3. Netlify turns on HTTPS automatically once the domain connects (can take a few hours).

AdSense needs this custom domain — it will not approve a `netlify.app` address.

## Step 3 — Google sign-in and saved progress (Firebase, free)

1. Go to **console.firebase.google.com → Add project**. Give it a name; you can turn Google Analytics off.
2. **Build → Authentication → Get started → Sign-in method → Google → Enable**, choose your support email, **Save**.
3. **Authentication → Settings → Authorized domains → Add domain**: add your domain (e.g. `mpscbank.in`) and your Netlify address.
4. **Build → Firestore Database → Create database** → choose location **asia-south1 (Mumbai)** → start in **production mode**.
5. Firestore → **Rules** tab: delete what's there, paste the contents of `firestore.rules`, **Publish**.
6. **Automatic deletion after N days** (so progress really expires): open Google Cloud Console for the same project → **Firestore → Time-to-live (TTL) → Create policy** → Collection group: `progress`, Timestamp field: `expiresAt` → Create. Firestore then deletes each user's progress after their last activity plus `retentionDays`. (The site also ignores expired progress on its own, so it behaves correctly even before this policy is active.)
7. **Project settings (gear icon) → General → Your apps → Web (`</>`)** → register an app. Firebase shows a `firebaseConfig` block. Copy `apiKey`, `authDomain`, `projectId` and `appId` into the `firebase` section of `config.js`.
8. Re-upload the folder to Netlify (drag it onto **Deploys** again). A **Sign in with Google** button now appears at the top.

To change how long progress is kept, edit `retentionDays` in `config.js` (default 30).

The Firebase `apiKey` is not a secret — it is meant to be in web pages. The security rules are what protect user data.

## Step 4 — Ads (Google AdSense)

1. Let the site run for a while and bring in some visitors first (share it in coaching groups, WhatsApp, Telegram, YouTube, Facebook pages for MPSC aspirants). AdSense reviewers look for a working site with real content and some traffic.
2. Go to **adsense.google.com**, sign up, and add your domain.
3. AdSense gives you a publisher ID like `ca-pub-1234567890123456`. Put it in `config.js` → `adsense.client`.
4. Put the same ID into `ads.txt` (replace `pub-0000000000000000` with your number, keeping `pub-` and removing `ca-`).
5. Re-upload the folder, then in AdSense click **Request review**. Approval can take a few days to a few weeks.
6. After approval: **Ads → By ad unit → Display ads** — create three units (e.g. *Top banner*, *Notes*, *Result*). Copy each unit's `data-ad-slot` number into `adsense.slots` in `config.js`, and re-upload.

Ads appear under the menu, between the shortcut notes, and below mock-test results. They never appear inside a question or during a running mock test — placing ads next to answer buttons causes accidental clicks, which AdSense treats as a policy violation and can get the account banned.

To receive payments you'll need to add a PAN and bank account in AdSense; Google pays once your balance crosses the payout threshold.

## Updating questions later

Questions live in `data.js`. Replace that file and re-upload the folder; nothing else changes.

## Things to check before you launch

- **Your employer's rules.** If you are in government or PSU service, check your conduct rules on running an income-earning website and get permission if required.
- **Income tax.** AdSense income is taxable; keep records.
- **Privacy policy.** `privacy.html` covers Google sign-in, Firestore and AdSense. It is a reasonable starting template, not legal advice — review it, and update it if you add anything new (analytics, payments).
- **Users in Europe/UK.** If you expect visitors from there, turn on Google's consent message in AdSense (**Privacy & messaging**).
