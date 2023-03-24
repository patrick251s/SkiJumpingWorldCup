var dodaj = document.getElementById('dodajDoWynikow');
var wynik = document.getElementById('wynik');
var skoczek = {};
if(JSON.parse(sessionStorage.getItem("skoczkowie")) !== null) pokazKlasyfikacje();

function policzWynik() {
    skoczek = {};
    skoczek.imie = document.getElementById('imie').value;
    skoczek.metry = +document.getElementById('odleglosc').value;
    skoczek.wiatr = +document.getElementById('wiatr').value;
    wynik.value = punktyBezNot().toFixed(1);
    var licznik = punktyBezNot();
    var styl = punktyZaNoty();
    skoczek.noty = styl;
    let a=1;
    setTimeout(function() { animujPunkty();}, 1000); 
    setTimeout(function() { pokazKlasyfikacje();}, 4000); 
    function animujPunkty() {
        setTimeout(function() {
            licznik += (1/10);
            wynik.value = licznik.toFixed(1);; 
            a++;
            if(a<10*styl) {
                animujPunkty();
            }
            else {
                wynik.value = (punktyBezNot()+styl).toFixed(1);
            }
        }, 2);
    }
    skoczkowie = [];
    skoczek.rezultat = punktyBezNot()+styl;
    skoczkowie = JSON.parse(sessionStorage.getItem("skoczkowie"));
    if(skoczkowie == null) skoczkowie = [];
    skoczkowie.push(skoczek);
    sessionStorage.setItem("skoczkowie", JSON.stringify(skoczkowie));
    console.log(JSON.parse(sessionStorage.getItem("skoczkowie")));
};

dodaj.addEventListener('click', () => {
    policzWynik();
});

function pokazKlasyfikacje() {
    let html = "<h3 class=''>Klasyfikacja</h3>";
    let skoczkowie = JSON.parse(sessionStorage.getItem("skoczkowie"));

    for(var i=0; i<skoczkowie.length; i++) {
        var miejsceSkoczka = 1;
        for(var j=0; j<skoczkowie.length; j++) {
            if(skoczkowie[i].rezultat < skoczkowie[j].rezultat) {
                miejsceSkoczka++;
            }
        }
        skoczkowie[i].miejsce = miejsceSkoczka;
    }
    
    for(var a=0; a<skoczkowie.length; a++) {
        for(var b=0; b<skoczkowie.length; b++) {
            if(skoczkowie[a].rezultat > skoczkowie[b].rezultat) {
                temp = skoczkowie[a];
                skoczkowie[a] = skoczkowie[b];
                skoczkowie[b] = temp;
            }
        }
    }

    html += "<table class=\"table table-sm text-light\"><thead><tr><th scope=\"col\">Ranking</th><th scope=\"col\">Skoczek</th><th scope=\"col\">Odległość</th><th scope=\"col\">Noty</th><th scope=\"col\">Punkty</th></tr></thead><tbody>";
    for(var i=0; i<skoczkowie.length; i++) {
        html += "<tr><th scope=\"row\">"+skoczkowie[i].miejsce+"</th><td>"+skoczkowie[i].imie+"</td><td>"+skoczkowie[i].metry+"</td><td>"+skoczkowie[i].noty+"</td><td>"+skoczkowie[i].rezultat+"</td></tr>";
    }
    html += "</tbody></table>"
    document.getElementById("klasyfikacja").innerHTML = html;
}

function punktyBezNot() {
    var K = +document.getElementById('K').value;
    var odleglosc = +document.getElementById('odleglosc').value;
    var punktyZaWiatr = +document.getElementById('wiatr').value;

    if(K>=85 && K<=99) {
        punktyZaOdleglosc = 60+(odleglosc-K)*2;
    }
    else if(K>=100 && K<=174) {
        punktyZaOdleglosc = 60+(odleglosc-K)*1.8;
    }
    else if(K>=175) {
        punktyZaOdleglosc = 120+(odleglosc-K)*1.2;
    }
    
    return punktyZaOdleglosc+punktyZaWiatr;
}

function punktyZaNoty() {
    var n1 = +document.getElementById('nota1').value;
    var n2 = +document.getElementById('nota2').value;
    var n3 = +document.getElementById('nota3').value;
    var n4 = +document.getElementById('nota4').value;
    var n5 = +document.getElementById('nota5').value;
    var noty = [n1,n2,n3,n4,n5];
    var max=noty[0];
    var min=noty[0];
    var suma=0;
    for(let i=0; i<noty.length; i++) {
        if(noty[i]>max) {
            max=noty[i];
        }
        else if(noty[i]<min) {
            min=noty[i];
        }
        suma += noty[i];
    }
    return suma-max-min;
}