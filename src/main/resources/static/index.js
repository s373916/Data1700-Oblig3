$(function() {
    hentAlleBilletter();
});
let ticketArray = [];
function billettKjop() {
    let film = document.getElementById("valg").value;
    let antall = document.getElementById("antall").value;
    let fnavn = document.getElementById("fnavn").value;
    let enavn = document.getElementById("enavn").value;
    let epost = document.getElementById("epost").value;
    let telefonNr = document.getElementById("telefonNr").value;
    let feilmelding = false;

    if (film === "0") {
        document.getElementById("invalidValg").innerHTML = "Velg en film";
        feilmelding = true;
    }

    if (antall === "" || antall <= 0) {
        document.getElementById("invalidAntall").innerHTML = "Velg et gyldig antall billetter";
        feilmelding = true;
    }

    if (fnavn === "") {
        document.getElementById("invalidFornavn").innerHTML = "Fyll ut fornavn";
        feilmelding = true;
    }

    if (enavn === "") {
        document.getElementById("invalidEtternavn").innerHTML = "Fyll ut etternavn";
        feilmelding = true;
    }

    if (epost === "" || !epost.includes('@')) {
        document.getElementById("invalidEpost").innerHTML = "Fyll ut gyldig epost";
        feilmelding = true;
    }

    if (telefonNr === "") {
        document.getElementById("invalidTelefonNr").innerHTML = "Fyll ut et gyldig telefonnummer";
        feilmelding = true;
    }

    if (!feilmelding) {
        let billettData = {
            film: film,
            antallBilletter: antall,
            fnavn: fnavn,
            enavn: enavn,
            epost: epost,
            telefonNr: telefonNr
        };

        $.ajax({
            url: '/lagre',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(billettData),
            success: function(response) {
                console.log('Lagring vellykket: ', response);
                tømInputFelter();
                hentAlleBilletter();
            },
            error: function(error) {
                console.log('Feil under lagring: ', error);
            }
        });
    }
}

function tømInputFelter() {
    document.getElementById("valg").value = "0";
    document.getElementById("antall").value = "";
    document.getElementById("fnavn").value = "";
    document.getElementById("enavn").value = "";
    document.getElementById("epost").value = "";
    document.getElementById("telefonNr").value = "";
    tømFeilmeldinger();
}

function tømFeilmeldinger() {
    document.getElementById("invalidValg").innerHTML = "";
    document.getElementById("invalidAntall").innerHTML = "";
    document.getElementById("invalidFornavn").innerHTML = "";
    document.getElementById("invalidEtternavn").innerHTML = "";
    document.getElementById("invalidEpost").innerHTML = "";
    document.getElementById("invalidTelefonNr").innerHTML = "";
}

function hentAlleBilletter() {
    $.ajax({
        url: '/hentAlle',
        type: 'GET',
        contentType: 'application/json',
        success: function(billetter) {
            visBillettTabell(billetter);
        },
        error: function(error) {
            console.log('Skjedde feil ved henting av billetter: ', error);
        }
    });
}

function visBillettTabell(billetter) {
    let ut = "<table class='table table-striped'><tr>" +
        "<th>Film</th><th>Billetter</th><th>Fornavn</th><th>Etternavn</th><th>Epost</th><th>TelefonNr</th><th>Handlinger</th></tr>";
    billetter.forEach(function(billett) {
        ut += "<tr>" +
            "<td>" + billett.film + "</td>" +
            "<td>" + billett.antallBilletter + "</td>" +
            "<td>" + billett.fnavn + "</td>" +
            "<td>" + billett.enavn + "</td>" +
            "<td>" + billett.epost + "</td>" +
            "<td>" + billett.telefonNr + "</td>" +
            "<td>"  +
            "<button onclick='slettEn(" + billett.id + ")' class='btn btn-danger'>Slett</button></td></tr>";
    });
    document.getElementById("billettTabell").innerHTML = ut;
}

function slettAlle() {
    $.ajax({
        url: "/slettAlleBilletter",
        type: "DELETE",
        success: function () {

            $("#billettTabell").html("");
            $("#valg").val("0");
            $("#antall").val("");
            $("#fnavn").val("");
            $("#enavn").val("");
            $("#epost").val("");
            $("#telefonNr").val("");
            console.log("Alle billetter er nå slettet.");
        },
        error: function (error) {
            console.error("Skjedde feil ved sletting av alle billetter: ", error);
        }
    });
}
function slettEn(id) {
    const url = "/slettEn?id=" + id;
    $.get(url, function () {
        hentAlleBilletter();
    });
}