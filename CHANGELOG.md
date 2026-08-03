# Website Changelog

Storico delle modifiche al sito [tirepressurepredictor.com](https://tirepressurepredictor.com).
Per tornare a una versione precedente: `git revert <commit>` oppure `git checkout <commit> -- website/`

---

## 2026-08-02 (5) — FAQ ridotte e requisito sui run esportati

**File modificati:** `index.html`, `race-car-tyre-pressure-predictor/index.html`

- **FAQ da 10 a 6**, riordinate come funnel (requisiti → concetto → fiducia → azione). Tolte quelle già raccontate dai blocchi Features con lo screenshot accanto (Run Filter, Plateau Detection, "What is Tire Pressure Logs") e quella sulla bleed correction, funzione marcata sperimentale nell'app. Promossa in pagina *"How accurate are the predictions?"*, che esisteva solo nel markup.
- **Markup e pagina ora coincidono**: il JSON-LD FAQPage dichiarava 17 domande contro le 10 visibili, cosa che Google può penalizzare. Ora sono 6 e 6. Nessuna perdita SEO: le domande tecniche restano nella pagina secondaria, che ne ospita quindici.
- **Requisito sui dati esplicitato**: vanno esportati **run interi, non singoli giri**, con un build-up continuo da gomme fredde a calde. Detto nella FAQ (in grassetto), nello step 1 del wizard e nella FAQ formati della pagina tecnica — è l'unico requisito che, se ignorato, rende inutile tutto il resto.
- Terza FAQ rinominata in *What "lap number" should I enter?*: "how many laps" si leggeva come lunghezza dello stint, cioè il fraintendimento che la risposta deve correggere.
- Verificato che non resti alcun riferimento a OptimumG: le formulazioni sono uniformi su "the ideal gas law".

---

## 2026-08-02 (4) — Il numero di giri come input centrale

Il sito non spiegava da nessuna parte il concetto che distingue il prodotto: le pressioni salgono per tutto il run, quindi centrare il target a caldo al giro 4 o al giro 20 richiede pressioni a freddo diverse, e l'app dice statisticamente su quale giro cade il best lap.

**File modificati:** `index.html`, `styles.css`, `race-car-tyre-pressure-predictor/index.html`

- **Hero**: nuovo primo bullet sul giro-obiettivo (5 bullet totali).
- **Blocco Prediction** riscritto attorno al numero di giri, che diventa il primo dettaglio ("the input that decides the rest").
- **Blocco Statistics**: titolo da "Know What Your Data Is Worth" a **"Know Which Lap to Aim At"**, con i numeri reali dello screenshot (giri 3-5 nell'80% dei run, picco al giro 4). I due blocchi ora si rimandano a vicenda.
- **FAQ nuova** "How many laps should I enter?" (pagina + JSON-LD), che distingue il caso qualifica dal race stint.
- **SEO**: meta description, Open Graph/Twitter e corpo dell'Article riscritti sul concetto; sulla pagina secondaria ampliata la sezione "Long Run vs Short Run".
- **Fix layout dell'hero**: essendo `fixed` e alto un viewport, ciò che eccede viene tagliato e non scrollato — il quinto bullet mandava il titolo sotto l'header su laptop 1366×768 e il pulsante Download fuori schermo su telefono. Aggiunto il rientro per l'header (una regola mobile lo azzerava) e due soglie di compattamento: 3 bullet sotto i 768px, solo titolo/sottotitolo/CTA sotto i 720px di altezza. Le voci nascoste restano nel DOM.
- Cache-buster a `2.17.1b`: il CSS era già stato servito online come `2.17.1`.

---

## 2026-08-02 (3) — Home come l'app: Telemetry | Session Logs

**File modificati:** `index.html`, `styles.css`, `script.js`, `images/settings-*.jpg`

- **Hero con lo screenshot della Prediction** a destra del testo (due colonne). Sotto i 1024px torna a colonna singola senza immagine: a quella larghezza lo screenshot diventa illeggibile prima di diventare piccolo.
- **Eliminata la sezione di apertura** ("Three things in. Four numbers out.", i tre passi, le due card TPMS/no-TPMS e il riquadro delle pressioni): ripeteva l'hero, e la scelta dei percorsi è ora la barra Telemetry|Session Logs. Rimosse anche le 165 righe di CSS relative.
- **Barra Telemetry | Session Logs sticky** sotto l'header, come nell'app: l'utente sceglie la metà che gli interessa e scorre. Il pannello non attivo resta nel DOM per l'indicizzazione. Su mobile il toggle Dark/Light esce dalla barra per non farla diventare alta 110px.
- **Il flusso ricalca l'app anche nella forma**: tre chevron (1 Upload · 2 Channel Mapping · 3 **Settings**) seguiti dal pulsante rosso **Start Processing**, che è il quarto pannello. Non un quarto chevron: nell'app quello è il pulsante che avvia il wizard, non un suo passo.
- Step 3 usa lo screenshot Settings con i profili salvati, la readiness 3/4 e il banner dei run scartati con il pulsante Retry. Step 1 e 4 usano gli screenshot nuovi: i run appena trovati con driver e T.Track da compilare, e l'esito del processing (2 aggiunti con giri e plateau lap, 3 esclusi con i °C sopra ambiente).

---

## 2026-08-02 (2) — Features come flusso, apertura visiva

Riorganizzazione della home in due atti: il workflow Telemetry a chevron come nell'app, poi i blocchi sul risultato.

**File modificati:** `index.html`, `styles.css`, `script.js`, `images/*`, `mockup-v2.html`

- **Apertura**: la fascia INPUT/OUTPUT (densa di sigle e senza immagini) è sostituita da tre passi in linguaggio piano + il **riquadro reale delle pressioni consigliate** ritagliato dall'app (`hero-result.jpg`). Sotto, due card che instradano l'utente: con TPMS → telemetria, senza TPMS → log manuali.
- **Telemetry a chevron**: i blocchi Data e Channel Mapping diventano un'unica sezione con i chevron dell'app (1 Upload · 2 Channel Mapping · 3 Processing) e una sola area screenshot che scorre lateralmente al click. Tab ARIA con navigazione da tastiera; i pannelli restano nel DOM per l'indicizzazione.
- **Processing assorbe il Run Recovery**: il blocco "Guided Data Workflow & Run Recovery" sparisce come sezione e confluisce nello step 3.
- **Screenshot nuovi** per Prediction e Tire Pressure Logs (catture dell'utente, 2866px, con filtro driver attivo e tabella piena) + **blocco nuovo "Know What Your Data Is Worth"** con le Advanced Statistics, prima non raccontate sul sito.
- Immagini rinominate con nomi parlanti minuscoli (`upload-`, `mapping-`, `processing-`, `prediction-`, `statistics-`, `logs-`), `width`/`height` espliciti su tutte per azzerare il layout shift.
- Altezza dello stage costante tra i tre step (pannelli impilati in una cella di griglia), così il contenuto sotto non salta al cambio.

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
