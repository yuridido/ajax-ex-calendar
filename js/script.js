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
    var dataUsata = moment('2018-01-01');

    console.log(dataUsata);
    compilaMese(dataUsata);
    compilaFeste(dataUsata);

    $('#next').click(function() {
        if (dataUsata.format('MM') != 11) {
            var dataAttuale = dataUsata.format('YYYY-MM-DD');
            dataUsata = moment(dataAttuale).add(1, 'M');
            $('.lista-giorni').html('');
            compilaMese(dataUsata);
            compilaFeste(dataUsata);
        } else {
            alert('il 2019 è vicino al 2020, chi te lo fa fare...');
        }
    });

    $('#prev').click(function() {
        if (dataUsata.format('MM') != 01) {
            var dataAttuale = dataUsata.format('YYYY-MM-DD');
            dataUsata = moment(dataAttuale).subtract(1, 'M');
            $('.lista-giorni').html('');
            compilaMese(dataUsata);
            compilaFeste(dataUsata);
        } else {
            alert('2017 non disponibile');
        }
    });


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
            completeData: anno + "-" + data.format('MM') + "-" + addZero(i)
        }

        var html = template(context);
        $('.lista-giorni').append(html);

    };

};


function compilaFeste(data) {
    $.ajax(
        {
            url: 'https://flynn.boolean.careers/exercises/api/holidays',
            method: 'GET',
            data: {
                year: data.year(),
                month: data.month()
            },
            success: function(risposta){
                // for (var i = 0; i < risposta.response.length; i++) {
                //     var elenco = $('li[data-data-completa="'+ risposta.response[i].date +'"]');
                //     console.log(elenco);
                //     elenco.append(' - '  + risposta.response[i].name);
                //     elenco.addClass('festa');
                // };

                // PROVA CON FOR EACH
                for (var i = 0; i < risposta.response.length; i++) {
                    $('.lista-giorni li').each(function() {
                        var confronto = $(this).attr('data-data-completa')
                        if (risposta.response[i].date == confronto) {
                            $(this).append(' - '  + risposta.response[i].name);
                            $(this).addClass('festa');

                        }
                    });
                    
                };
            },
            error: function(){
                alert('errore');
            }

        }
    );
};


function addZero(n) {
    if (n < 10) {
        return "0" + n;
    } else {
        return n;
    }
}
