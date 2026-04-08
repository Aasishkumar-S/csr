# ⚡ Cyber Splash 2026 — Cyber Sonic Rangers

A dark cyberpunk event promotion website for Cyber Splash, the flagship event of Cyber Sonic Rangers.

## 📁 Folder Structure

```
cybersplash/
├── index.html          ← Main entry point (all 4 pages)
├── css/
│   └── style.css       ← All styles (cyberpunk theme, glassmorphism, animations)
├── js/
│   └── app.js          ← Navigation, particles, scroll reveal, contact form
└── README.md           ← This file
```

## 🚀 How to Run

Just open `index.html` in any modern browser. No build tools or server needed.

For best results (fonts load properly), serve via a local server:
```bash
# Python
python3 -m http.server 3000

# Node (npx)
npx serve .
```
Then open http://localhost:3000

## 📄 Pages

| Page    | Route        | Description |
|---------|-------------|-------------|
| Home    | #home       | Hero section, particle background, CTA buttons |
| About   | #about      | Club identity, mission/vision, stats |
| Events  | #events     | 4 round cards with full descriptions |
| Contact | #contact    | Two organizer contacts + email form |

## 🏆 Event Rounds

| # | Code Name | Type |
|---|-----------|------|
| 1 | Cyber Recon: Knowledge Strike | Cyber Quiz |
| 2 | Password Breach: Crack the Vault | Password Detection & Solving |
| 3 | Operation Dhurandhar: Codebreaker Protocol | Intelligence Decryption |
| 4 | HackQuest: The Final Breach | CTF Challenge |

## ✏️ Customisation

- **Organizer emails/phones** → `index.html`, Contact page section
- **WhatsApp link** → Replace `https://wa.me/` with your actual link in the Home page CTA
- **General email** → `app.js`, line with `cybersonicrangers@gmail.com`
- **Colors** → `css/style.css`, `:root` variables at the top

## 🎨 Tech Stack

- Vanilla HTML5 / CSS3 / JavaScript (no frameworks)
- Google Fonts: Orbitron + Syne + JetBrains Mono
- Canvas-based particle system
- CSS scroll-reveal animations
- mailto: contact form (no backend needed)

© 2026 Cyber Sonic Rangers
