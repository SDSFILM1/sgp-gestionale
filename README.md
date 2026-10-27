# SGP Gestionale

Area riservata per la Società Ginnastica Pordenonese. React + TypeScript, Supabase, Google Drive e Wix Bookings. Web app installabile su iPhone e Android, con progetto nativo Android Capacitor.

Il manuale illustrato per le insegnanti è pubblicato come `Manuale-insegnanti-SGP.pdf` nella pagina di installazione.

## Utilizzo

- La segreteria crea gli account insegnanti e assegna le lezioni.
- Gli alunni fissi vengono inseriti negli elenchi dei corsi dalla segreteria. Ogni modifica ha una data di inizio; le presenze e gli elenchi precedenti restano conservati.
- Gli insegnanti vedono le lezioni assegnate, indicano la propria disponibilità e registrano le presenze degli allievi.
- Le prenotazioni Wix sono importate in sola lettura. I corsi si associano al servizio Wix e le prenotazioni alla lezione con lo stesso orario. Nessun acquisto o abbonamento viene trasformato automaticamente in un'iscrizione fissa.
- I documenti vengono caricati senza approvazione e sono visibili alla segreteria e al proprietario. L'archivio Google Drive deve essere configurato prima dell'uso.
- Le comunicazioni sono consultabili nell'app; non sono notifiche push in background.

## Sviluppo

Node 22 o superiore. `npm ci`, `npm test`, `npm run build`. Il risultato statico si trova in `dist/`, pronto per GitHub Pages anche in una sottocartella. `public/config.js` contiene solo URL Supabase e chiave pubblicabile; non inserire chiavi segrete nel frontend.

Eseguire le migrazioni `supabase/migrations/` nell'ordine del nome. Creare il primo utente attraverso Supabase Authentication e abilitare il corrispondente record `profiles` come `secretary`. Gli altri account si creano nell'app. Disabilitare la registrazione pubblica nelle impostazioni Auth.

Pubblicare `account-admin`, `drive-files` e `wix-sync` come Edge Functions. `verify_jwt=false` riguarda il vecchio controllo gateway: tutte le funzioni verificano esplicitamente il token tramite `auth.getUser()` e controllano ruolo, stato e cambio password. Non rimuovere tali controlli.

Segreti del backend: `WIX_API_KEY`, `WIX_SITE_ID`, `GOOGLE_DRIVE_BRIDGE_URL`. Non committare credenziali. Wix espone un'autorizzazione Bookings ampia per le API key; la funzione implementa solo i due endpoint di lettura autorizzati nel codice.

Per Drive, creare un progetto Apps Script con `google-drive/Code.gs` e `appsscript.json`. Configurare la proprietà `SUPABASE_ANON_KEY` con la chiave pubblicabile. Pubblicare come applicazione web eseguita dal proprietario e accessibile senza login Google: ogni richiesta è comunque autenticata dal codice mediante Supabase, e il download richiede il ruolo o la proprietà del documento. Lo scope `drive.file` limita l'accesso ai file creati dall'app. Impostare l'URL `/exec` della pubblicazione nel segreto `GOOGLE_DRIVE_BRIDGE_URL`.

L'aggiornamento Wix avviene ogni cinque minuti quando il gestionale è aperto, dopo il primo import riuscito. È possibile configurare un processo esterno con il segreto facoltativo `SGP_CRON_SECRET` per aggiornare anche ad app chiusa; non è configurato automaticamente.

## Android

`npm run android:sync`, poi compilare `android/` con JDK 21 e Android SDK 35. La versione minima è Android 6 (API 23). Il pacchetto è `it.ginnasticapordenonese.gestionale`. Firmare le versioni successive con la stessa chiave di rilascio e incrementare `versionCode`. Keystore e password restano fuori dal repository. Il file APK richiede una verifica finale su un dispositivo fisico.

## Verifiche

I test PGlite controllano i permessi di segreteria/insegnante, il blocco degli utenti disabilitati, la conservazione dello storico, l'idempotenza dell'import Wix, cancellazioni e spostamenti delle prenotazioni. Le prove non sostituiscono la verifica delle integrazioni negli account effettivi.

GitHub Pages distribuisce l'interfaccia pubblica: tutti i dati sono protetti dal login e dalle policy del database. La cache offline conserva solo i file dell'interfaccia. È necessaria la connessione per leggere e salvare i dati.

## Temi e festività

La segreteria gestisce il tema globale da Impostazioni, solo nell'interfaccia desktop. La scelta iniziale è Normale; Halloween e Natale sono disponibili senza essere attivati automaticamente. Il ritorno al tema normale può avere una data facoltativa, calcolata in Europe/Rome.

Le risorse dei temi sono in public/themes e vanno pubblicate insieme ai file principali. Il runtime legge get_app_theme e carica soltanto fogli di stile e immagini del sito SGP, senza eseguire codice remoto. Per aggiungere un tema bastano risorse pubblicate e una voce in app_theme_catalog; non serve ricompilare l'app. I cambi sono riservati alla segreteria con set_app_theme.

Android include tre icone selezionabili tramite alias: standard, halloween e christmas. Una nuova immagine nativa non inclusa richiede una nuova versione Android; i nuovi temi possono usare l'icona standard. Le icone già incluse cambiano alla riapertura dell'app, con i tempi di aggiornamento del launcher del telefono.

## Storico pubblico delle versioni

La pagina `versioni.html`, collegata da `installa.html`, conserva le note delle versioni Android pubblicate e degli aggiornamenti web. I dati sono in `public/versioni.json` nei sorgenti: aggiornarli per ogni futura pubblicazione, indicando data, modifiche e commit. `scripts/build-history.mjs` rigenera la pagina durante la build e verifica che la versione più recente coincida con `public/version.json`.

Gli APK rimossi non vengono ripubblicati. La versione 1.5 non risulta pubblicata nello storico GitHub. Modifiche alle sole pagine statiche di installazione e storico non richiedono un nuovo APK.

### Calendario automatico (27 ottobre 2026)

Modalità predefinita `automatic`: 15 temi festivi, fuori periodo tema normale. Orario Europe/Rome. Capodanno 31 dicembre–2 gennaio; Epifania 4–6 gennaio; San Valentino 13–14 febbraio; Carnevale giovedì grasso–martedì grasso; Festa della donna 6–8 marzo; Pasqua da giovedì santo a Pasquetta; Liberazione 24–25 aprile; Lavoro 1–2 maggio; Repubblica 1–2 giugno; Ferragosto 14–16 agosto; San Francesco 4 ottobre; Halloween 29–31 ottobre; Ognissanti 1 novembre; Immacolata 6–8 dicembre; Natale 23–29 dicembre. Il calendario non modifica lezioni, presenze o chiusure dei corsi.

Migrazione `202610270004_automatic_holidays.sql`: date mobili ricalcolate ogni anno, metadati pubblici compatibili con il runtime Android 1.21. Le scelte manuali festive scadono entro 7 giorni; dopo riprende l’automatico senza prolungare immediatamente lo stesso evento. `standard` disattiva l’automatico. Solo la segreteria può configurare; funzioni interne di calcolo non esposte ad anon/authenticated. Le nuove decorazioni usano l’icona SGP normale. Nuovi CSS generati da `scripts/build-holiday-themes.mjs`. La build aggiorna solo il sito: l’APK 1.21 resta invariato e lo storico versioni è esclusivamente sul sito.

Date di riferimento: https://presidenza.governo.it/ufficio_cerimoniale/cerimoniale/giornate.html e https://www.cattedralepescia.it/Feste-mobili.asp?a=2027 . Le finestre decorative sono scelte SGP e durano al massimo 7 giorni.
