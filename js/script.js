// Link API: https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0
// Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018
// (unici dati disponibili sull’API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l’API non possa
// ritornare festività.
// Attenzione!
// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido (per ovviare al problema che l’API non carichi
// holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista
// Chiedere all’API quali sono le festività per il mese scelto
// Evidenziare le festività nella lista

// {
//     "success": true,
//     "response": [
//         {
//             "name": "Capodanno",
//             "date": "2018-01-01"
//         },
//         {
//             "name": "Epifania",
//             "date": "2018-01-06"
//         }
//     ]
// }


$(document).ready(function(){
    var dataPartenza = moment('2018-01-01');
    console.log(dataPartenza);
    compilaMese(dataPartenza);
    // compilaGiorni(dataPartenza);


});


// FUNZIONI
function compilaMese(data){
    mese = data.format('MMMM');
    anno = data.format('YYYY');
    // inserisco mese ed anno nell'intestazione
    $('h1.mese').html(mese + " " + anno);
    //inserisco i giorni con un ciclo
    for (var i = 1; i <= data.daysInMonth(); i++) {
        var source = $("#entry-list").html();
        var template = Handlebars.compile(source);
        var context = {
            day: addZero(i),
            month: mese,
            year: anno,
            completeData: anno + "-" + mese + "-" + addZero(i)
        }

        var html = template(context);
        $('.lista-giorni').append(html);

    };

};


function addZero(n) {
    if (n < 10) {
        return "0" + n;
    } else {
        return n;
    }
}
