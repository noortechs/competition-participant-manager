const startNummer = document.getElementById("startnummer");
const navn = document.getElementById("navn");
const slutTid = document.getElementById("slutTid");
const registrerDeltager = document.getElementsByTagName("button")[0];
const visDeltagere = document.getElementsByTagName("button")[1];
const resultat = document.getElementsByTagName("div")[0];

const feilStartnummer = document.getElementById("feilStartnummer");
const feilNavn = document.getElementById("feilNavn");
const feilSluttid = document.getElementById("feilSluttid");

const fra = document.getElementById("fra");
const til = document.getElementById("til");

const feilFraTid = document.getElementById("feilFraTid");
const feiTilTid = document.getElementById("feiTilTid");

let deltagerListe = [];

registrerDeltager.addEventListener("click", () => {



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

// Hjelpefunksjon for å konvertere tid til minutter
function tidTilMinutter(tid) {
    let [timer, minutter] = tid.split(":").map(Number);
    return timer * 60 + minutter;
}

function visTabel() {
    let fraTid = fra.value;
    let tilTid = til.value;

    // Nullstill tidligere feilmelding
    feiTilTid.textContent = "";

    // Sjekk feil intervall
    if (fraTid !== "" && tilTid !== "" && tidTilMinutter(fraTid) > tidTilMinutter(tilTid)) {
        feiTilTid.textContent = "Fra-tid kan ikke være senere enn til-tid.";
        til.focus();
        return;
    }

    let filtrertDeltagerListe = [...deltagerListe];

    if (fraTid === "" && tilTid === "") {
        // vis alle
    } 
    else if (fraTid === "") {
        filtrertDeltagerListe = filtrertDeltagerListe.filter(x => tidTilMinutter(x.slutTid) <= tidTilMinutter(tilTid));
    } 
    else if (tilTid === "") {
        filtrertDeltagerListe = filtrertDeltagerListe.filter(x => tidTilMinutter(x.slutTid) >= tidTilMinutter(fraTid));
    } 
    else {
        filtrertDeltagerListe = filtrertDeltagerListe.filter(d => {
            let tid = tidTilMinutter(d.slutTid);
            return tid >= tidTilMinutter(fraTid) && tid <= tidTilMinutter(tilTid);
        });
    }

    let text = "";
    let plassering = 1;
    for (let deltager of filtrertDeltagerListe) {
        text += plassering + ". Startnummer: " + deltager.startNummer +
            ", Navn: " + deltager.navn + ", Sluttid: " + deltager.slutTid + "\n";
        plassering++;
    }

    return text;
}

visDeltagere.addEventListener("click", function() {
    resultat.innerText = "";
    resultat.innerText = visTabel();
});
