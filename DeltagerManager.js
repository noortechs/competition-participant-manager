const startNummer = document.getElementById("startnummer");
const navn = document.getElementById("navn");
const slutTid = document.getElementById("slutTid");
const registrerDeltager = document.getElementsByTagName("button")[0];
const visDeltagere = document.getElementsByTagName("button")[1];
const resultat = document.getElementsByTagName("div")[0];

const feilStartnummer = document.getElementById("feilStartnummer");
const feilNavn = document.getElementById("feilNavn");
const feilSluttid = document.getElementById("feilSluttid");

let deltagerListe = [];

registrerDeltager.addEventListener("click", function () {
    // 1. Nullstill feilmeldinger først
    feilStartnummer.textContent = "";
    feilNavn.textContent = "";
    feilSluttid.textContent = "";

    // 2. Sjekk tomme felt
    if (startNummer.value === "") {
        feilStartnummer.textContent = "Vennligst skriv startnummeret ditt.";
        startNummer.focus();
        return;
    }
    if (navn.value === "") {
        feilNavn.textContent = "Vennligst skriv navnet ditt.";
        navn.focus();
        return;
    }
    if (slutTid.value === "") {
        feilSluttid.textContent = "Vennligst velg sluttiden.";
        slutTid.focus();
        return;
    }

    // 3. Sjekk om startnummer eller sluttid finnes fra før
    for (let deltager of deltagerListe) {
        if (startNummer.value === deltager.startNummer) {
            feilStartnummer.textContent = "Startnummeret er allerede registrert.";
            startNummer.focus();
            return;
        }
        if (slutTid.value === deltager.slutTid) {
            feilSluttid.textContent = "Vennligst velg en annen sluttid.";
            slutTid.focus();
            return;
        }
    }

    // 4. Sjekk navnets første bokstav
    let riktigNavn = navn.value;
    if (navn.value[0] !== navn.value[0].toUpperCase()) {
        feilNavn.textContent = "Navnet må starte med stor bokstav. Jeg retter det for deg.";
        riktigNavn = navn.value[0].toUpperCase() + navn.value.slice(1);
    }

    // 5. Legg deltaker i arrayen
    deltagerListe.push({
        startNummer: startNummer.value,
        navn: riktigNavn,
        slutTid: slutTid.value
    });

    // 6. Tøm inputfeltene og sett fokus tilbake
    startNummer.value = "";
    navn.value = "";
    slutTid.value = "";
    startNummer.focus();
});
