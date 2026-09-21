# SGP Gestionale — guida rapida

Sito: https://sdsfilm1.github.io/sgp-gestionale/

Accedi con l'indirizzo e la password del gestionale. Sono distinti dall'accesso alla console Supabase.

## Installazione

**iPhone:** apri il sito in Safari, tocca Condividi e scegli Aggiungi alla schermata Home. Apri poi l'icona SGP. Su iPhone non si installano file APK.

**Android:** scarica `SGP-Gestionale-Android-1.1.apk`, aprilo e consenti l'installazione da questa fonte se il telefono la richiede. È compatibile da Android 6 in poi. Puoi anche usare il sito dal browser.

## Primo avvio della segreteria

1. In **Corsi**, premi **Importa corsi Wix**. Per i corsi gestiti solo internamente usa **Nuovo corso**. Completa la sede e il tipo di partecipanti.
2. In **Insegnanti**, crea gli account con una password temporanea di almeno 12 caratteri. Comunica personalmente le credenziali: l'insegnante dovrà cambiare password al primo accesso.
3. In **Alunni**, inserisci nomi e cognomi. Le note sono riservate alla segreteria.
4. In **Corsi → Gestisci iscritti**, scegli gli alunni fissi e la data da cui l'elenco deve valere.
5. In **Calendario → Programma lezioni**, scegli corso, date, orari e insegnanti. Puoi ripetere ogni settimana fino alla data finale.

## Presenze e cambiamenti

Apri una lezione: i nomi ancora da segnare sono già selezionati come presenti. Tocca la crocetta nella colonna **Assente** per chi manca, poi premi **Salva appello**. Le presenze già registrate vengono mantenute. Gli iscritti fissi del corso compaiono automaticamente nelle lezioni dalla data scelta: non occorre aggiungerli a ogni appello.

Per cambiare una sola lezione, usa **Aggiungi**, **Escludi** o **Ripristina** nel suo dettaglio. Per cambiare tutte le lezioni future usa l'elenco del corso e scegli la data di decorrenza: sostituisce anche gli eventuali cambiamenti già programmati dopo quella data. Le lezioni passate e le presenze già segnate rimangono conservate.

In **Alunni** puoi cercare una persona e consultare le sue presenze. Le tabelle principali si possono esportare in CSV.

## Prenotazioni Wix

Wix resta il luogo dove gli iscritti prenotano. Il gestionale legge le prenotazioni senza modificarle. Gli iscritti fissi vengono gestiti dalla segreteria; gli acquisti di piani Open non creano da soli un elenco fisso.

Per associare una prenotazione a una lezione occorrono il corso collegato al servizio Wix e lo stesso orario di inizio. Se manca una corrispondenza, compare «Da associare»: controlla il calendario. Dopo il primo aggiornamento riuscito, l'app aggiorna Wix ogni cinque minuti mentre è aperta. È disponibile anche **Aggiorna da Wix**.

## Insegnanti e documenti

L'insegnante vede le lezioni assegnate e indica **Ci sono**, **Non ci sono** oppure **Da confermare**. Può registrare le presenze degli allievi.

In **Documenti → Carica documento** si possono inviare PDF, Word e immagini fino a 20 MB. Non è prevista un'approvazione: dopo il caricamento il file è disponibile alla segreteria. L'archivio è nel Drive scelto durante la configurazione. Il servizio deve essere autorizzato su Google prima del primo caricamento.

Le **Comunicazioni** compaiono nell'app. Non vengono inviate automaticamente email o notifiche push a telefono bloccato.

## Copie e aggiornamenti

Conserva una copia degli elenchi e delle presenze esportati. Il progetto sorgente consente di modificare e ricompilare sito e app. Il backup privato della firma Android serve per distribuire aggiornamenti installabili sopra la versione esistente: conservalo e non pubblicarlo su GitHub.

L'app richiede Internet. Le offerte gratuite di GitHub, Supabase e Google hanno limiti: controlla periodicamente spazio e stato del progetto nelle rispettive console.

## Accesso dal telefono

In **Impostazioni → Accesso facile e sicuro** puoi scegliere **Rimani connesso**, sia sul sito sia nell’app. Nell’app Android 1.1 puoi anche attivare **Accedi con dati biometrici**, dopo aver configurato l’impronta o il riconoscimento sul telefono. Il dispositivo può proporre anche il suo codice di sblocco. Per un aggiornamento, installa il nuovo APK sopra quello precedente senza disinstallarlo. Su iPhone il sito resta installabile dalla schermata Home e supporta la sessione mantenuta; lo sblocco biometrico integrato è disponibile nell’APK Android.
