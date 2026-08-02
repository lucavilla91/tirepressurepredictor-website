# Website Changelog

Storico delle modifiche al sito [tirepressurepredictor.com](https://tirepressurepredictor.com).
Per tornare a una versione precedente: `git revert <commit>` oppure `git checkout <commit> -- website/`

---

## 2026-08-02 — Allineamento all'app 2.17.0 (redesign UI)

Screenshot rifatti dall'app 2.17.0 (nuova interfaccia) e testi riallineati alle funzionalità attuali.

**File modificati:** `index.html`, `race-car-tyre-pressure-predictor/index.html`, `images/*.png`, `og-image.png` (nuova)

- 10 screenshot nuovi (5 viste × dark/light, 1920×1111): Data wizard, Channel Mapping, Prediction con risultato, Discarded Runs, Session Logs
- Blocco feature 4: Bleed Correction → **Guided Data Workflow & Run Recovery** (wizard 3 step, Run Metadata a tab, run scartati recuperabili)
- Rimossi i riferimenti allo ZIP (rimane solo la linked folder, formati `.csv .txt .xls .xlsx`)
- Aggiunto **PiToolbox** ai software supportati (testi, FAQ, JSON-LD, select del form)
- Unità: bar / PSI / **kPa**; "Event Conditions" → **Run Metadata**; "Prediction History" → **Session Logs**
- Bleed Correction dichiarata **experimental** nelle FAQ; rimosse le FAQ/sezioni su Track Relations Matrix e new-track prediction (flusso ritirato dalla UI nella 2.17.0)
- JSON-LD: `softwareVersion` 2.10.3 → 2.17.0, descrizioni aggiornate
- Creata `og-image.png` 1200×630 (era referenziata dai meta social ma assente)

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
