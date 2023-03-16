interface Piatto{
    nome: string;
    portato: boolean;
}

const aggiungiPiatti = document.querySelector('.aggiungiPiatto') as HTMLFormElement;
const piatti = document.querySelector('.piatti') as HTMLElement;
const listaOrdini: Piatto[] = JSON.parse(localStorage.getItem('ordini')!) || [];

aggiungiPiatti.addEventListener('submit', aggiungiPiatto); //posso definire le funzioni dichiarate con function perchè in fase di compilazione sono soggette ad hoisting
aggiungiPiatti.addEventListener('button', eliminaPiatti);

function aggiungiPiatto(this: any, e: Event) {
    e.preventDefault();
    const nome = (this.querySelector('[name="piatto"]'))!.value;
    const piatto = {
        nome,
        portato: false
    }
    listaOrdini.push(piatto);
    popolaLista();
    localStorage.setItem('ordini', JSON.stringify(listaOrdini));
    this.reset();
}

function eliminaPiatti(){

}

function popolaLista() {
    piatti.innerHTML = listaOrdini.map((ordine, index) =>{
        return `
            <li>
                <input type="checkbox" data-index="${index}" id="item${index}" ${ordine.portato ? 'checked' : ''} />
                <label for="item${index}">${ordine.nome}</label>
                </li>
        `
    }).join('')
}

piatti.addEventListener('click', togglePortato); //mi metto in ascolto su ul e non su li perchè altrimenti i nuovi elementi aggiunti non avrebbero l'eventListener --> mi metto sul genitore e aspetto l'evento in risalita

function togglePortato(e: MouseEvent){
    const el = e.target! as HTMLLIElement;
    
    if(el.matches('input')){
        const index = Number(el.dataset.index!);
        listaOrdini[index].portato = !listaOrdini[index].portato; 
        localStorage.setItem('ordini', JSON.stringify(listaOrdini));
        popolaLista();
    }
}

popolaLista();