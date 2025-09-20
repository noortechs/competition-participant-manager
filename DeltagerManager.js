const startNummer = document.getElementById("startnummer");
const  navn = document.getElementById("navn");
const slutTid = document.getElementById("slutTid");
const registrerDeltager= document.getElementsByTagName("button")[0];
const visDeltagere = document.getElementsByTagName("button")[1];
const resultat = document.getElementsByTagName("div")[0];

let visDeltagerListe = [];

registrerDeltager.addEventListener("click", function(){

    if(startNummer.value === "" || navn.value === "" ||slutTid.value === ""){
        return;
    }

    for(let deltager of visDeltagerListe ){
        if (startNummer.value === deltager.startNummer){
        return;
    }}

     let riktigNavn = navn.value;
    if (navn.value[0] !== navn.value[0].toUpperCase()){

       riktigNavn= navn.value[0].toUpperCase() + navn.value.slice(1);
    }
        visDeltagerListe.push({
        startNummer: startNummer.value,
        navn: riktigNavn,
         slutTid: slutTid.value
    });


     startNummer.value = "";
     navn.value = "";
     slutTid.value = "";

     startNummer.focus();
    



});