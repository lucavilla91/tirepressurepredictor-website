# Website Changelog

Storico delle modifiche al sito [tirepressurepredictor.com](https://tirepressurepredictor.com).
Per tornare a una versione precedente: `git revert <commit>` oppure `git checkout <commit> -- website/`

---

## 2026-02-13 — Dark Theme Redesign
**Commit:** `4b27aaf`

Redesign completo allineato allo stile [motorsportsoftware.com](https://motorsportsoftware.com): sfondo nero, header glassmorphism, parallax hero, grid overlay.

**File modificati:** `styles.css`, `index.html`, `script.js`, `race-car-tyre-pressure-predictor/index.html`

- Conversione dark theme: sfondo nero, testo chiaro (#e5e5e5), cards #111
- Header glassmorphism: `rgba(0,0,0,0.8)` + `backdrop-filter: blur(12px)`
- Hero parallax con fade/scale on scroll (solo pagina principale)
- Grid overlay con linee `rgba(255,255,255,0.03)` a 60px
- Titolo hero con gradient text (bianco → grigio)
- Sub-page (Technical Guide) usa hero statico senza parallax
- Cards, FAQ, form inputs tutti su sfondo scuro
- Custom scrollbar (track nero, thumb #222)
- Modali download/success con stile dark
- Rimossi tutti i `section-light` e gradient inline chiari

---

## Versioni precedenti

Le modifiche al sito precedenti a questo changelog sono tracciate solo nei commit git.
Per consultarle: `git log --oneline -- website/`
