"use strict";
const aggiungiPiatti = document.querySelector('.aggiungiPiatto');
const piatti = document.querySelector('.piatti');
const listaOrdini = JSON.parse(localStorage.getItem('ordini')) || [];
const elimina = document.getElementById('cancella');
aggiungiPiatti.addEventListener('submit', aggiungiPiatto); //posso definire le funzioni dichiarate con function perchè in fase di compilazione sono soggette ad hoisting
elimina.addEventListener('click', eliminaPiatti);
function aggiungiPiatto(e) {
    e.preventDefault();
    const nome = (this.querySelector('[name="piatto"]')).value;
    const piatto = {
        nome,
        portato: false
    };
    listaOrdini.push(piatto);
    popolaLista();
    localStorage.setItem('ordini', JSON.stringify(listaOrdini));
    this.reset();
}
function eliminaPiatti() {
    localStorage.removeItem('ordini');
    listaOrdini.length = 0;
    popolaLista();
}
function popolaLista() {
    piatti.innerHTML = listaOrdini.map((ordine, index) => {
        return `
            <li>
                <input type="checkbox" data-index="${index}" id="item${index}" ${ordine.portato ? 'checked' : ''} />
                <label for="item${index}">${ordine.nome}</label>
                </li>
        `;
    }).join('');
}
piatti.addEventListener('click', togglePortato); //mi metto in ascolto su ul e non su li perchè altrimenti i nuovi elementi aggiunti non avrebbero l'eventListener --> mi metto sul genitore e aspetto l'evento in risalita
function togglePortato(e) {
    const el = e.target;
    if (el.matches('input')) {
        const index = Number(el.dataset.index);
        listaOrdini[index].portato = !listaOrdini[index].portato;
        localStorage.setItem('ordini', JSON.stringify(listaOrdini));
        popolaLista();
    }
}
popolaLista();
