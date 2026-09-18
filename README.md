# SGP Gestionale

Area riservata per la Società Ginnastica Pordenonese. React + TypeScript, Supabase, Google Drive e Wix Bookings. Web app installabile su iPhone e Android, con progetto nativo Android Capacitor.

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
