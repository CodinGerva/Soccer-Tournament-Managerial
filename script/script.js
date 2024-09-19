let squadre = []
let giocatori = []
let allenatori = []
let arbitri = []
let dirigenti = []
let nGiornata = 0
let golInseriti = false
let inModifica = false
var SquadraOnView
let inModificaArbitro = false
let immagineDirigenteGenerico = 'Media/manager.png'
let immagineAllenatoreGenerico = 'Media/coach.png'
let immagineProva =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Scudetto.svg/879px-Scudetto.svg.png'
let schermataPrincipale = document.querySelector('#schermataPrincipale')
let immagineGiocatore =
  "<div id = 'ImmagineGiocatore'><img src='Media/football-player.png' width = '90px' height = '90px'></div>"

/*TO DO
    - CONTROLLARE CHE IL GIOCATORE CHE SI VUOLE VENDERE E' DELLA PROPRIA SQUADRA E VICEVERSA PER L'ACQUISTO
    - AGGIUNGERE FUNZIONE REMOVE GIOCATORE CON POSSIBILITA' SVINCOLATO OPPURE RITIRATO
*/
document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#apriGestioneCalendario')
    .addEventListener('click', (event) => visualizzaPaginaCalendario(0))
  document
    .querySelector('#apriGestioneArbitri')
    .addEventListener('click', visualizzaPaginaGestioneArbitri)
  document
    .querySelector('#apriGestioneGiocatore')
    .addEventListener('click', visualizzaPaginaGestioneSquadre)
  document.querySelector('#apriHome').addEventListener('click', visualizzaHome)
})

function visualizzaHome() {
  schermataPrincipale.setAttribute('id', 'schermataPrincipaleBenvenuto')
  let classifica = calcolaClassifica()
  let pagina = `<div id="grigliaBenvenuto"> <div class="contenuto infoSquadraVincente"> <div id="squadraVincente"></div> <div id="mvpSquadraVincente"></div> </div> <div class="contenuto spettatoriCampionato"></div> <div class="contenuto classifica"> <table> <thead> <tr> <th>Posizione</th> <th>Squadra</th> <th>Punteggio</th> </tr> </thead>  <tbody>`

  for (let i = 0; i < classifica.length; i++) {
    pagina += `<tr><td>${i + 1}</td><td>${classifica[i].nome}</td><td>${
      classifica[i].punti
    }<td>`
  }
  pagina +=
    '</tbody> </table> </div> <div class="contenuto fatturatoTot"></div> <div class="contenuto dataFine"><span id="fine">data fine campionato</span><span>domenica 4 giugno 2023</span></div> </div></div>'
  schermataPrincipale.innerHTML = pagina
  document.querySelector('#squadraVincente').innerHTML =
    "<div id = 'NomeSquadra'><p>" +
    classifica[0].nome +
    "</p></div> <img src ='" +
    classifica[0].logo +
    "'> <div id = 'infoSquadraVincente'><div><i class='bx bx-trophy' ></i>1</div><div><i class='bx bx-football' ></i>200</div><div><i class='bx bx-play-circle' ></i>18</div></div>"
  document.querySelector('#mvpSquadraVincente').innerHTML =
    "<div id = 'NomeSquadra'><p>🏆Migliore🏆</p><p>" +
    classifica[0].giocatori[
      Math.floor(Math.random() * classifica[0].giocatori.length)
    ].cognome +
    "</p></div> <img src ='" +
    'Media/football-player.png' +
    "'> <div id = 'infoSquadraVincente'><div><i class='bx bx-football' ></i>"+ (Math.floor(Math.random() * 20) + 15) +"</div><div><i class='bx bx-run'></i>"+ Math.floor(Math.random() * 35) +"</div><div><i class='bx bx-angry' ></i>"+ Math.floor(Math.random() * 5) +"</div></div>"
  document.querySelector('.spettatoriCampionato').innerHTML =
    "<div><p>Visualizzazioni</p></div><img src ='media/graficoViews.png'><p>24 Milioni</p><i class='bx bx-movie-play'></i>"
  document.querySelector('.fatturatoTot').innerHTML =
    "<div><p>Totale Incassi</p></div><img src ='media/pieChartSoldi.svg'><p>3 Miliardi</p><i class='bx bxs-wallet-alt' ></i>"
}

//FUNZIONI PER IL CAMBIO DELLE PAGINE
function visualizzaPaginaModificaSquadra(squadra) {
  //Gervasoni//
  /* TODO: aquisto giocatori dal mercato.
  tasto per togliere i giocatori(svincolarli)
   */
  schermataPrincipale.innerHTML =
    "<div4 id = 'headerSquadraSingola'><div1 id = 'tornaSquadre'><i class='bx bx-arrow-back' id = 'tornaSquadre'></i></div1><div2 id = 'titoloSquadra'><p>" +
    squadra.nome +
    "</p></div2><div3><img src = '" +
    squadra.logo +
    "' width = '80px' height = '60px style='object-fit:scale-down'</div3></div4>"

  document
    .querySelector('#tornaSquadre')
    .addEventListener('click', visualizzaPaginaGestioneSquadre)
  let griglia = document.createElement('div')
  griglia.setAttribute('id', 'grigliaGiocatori')
  schermataPrincipale.appendChild(griglia)
  for (let i = 0; i < squadra.giocatori.length; i++) {
    let cardGiocatoreSingolo = document.createElement('div')
    cardGiocatoreSingolo.setAttribute('class', 'cardGiocatorSingolo')
    cardGiocatoreSingolo.setAttribute('id', i)

    // creazione nome squadra
    let nomeGiocatoreCard = document.createElement('div')
    nomeGiocatoreCard.innerHTML =
      '<p>' +
      squadra.giocatori[i].nome +
      ' ' +
      squadra.giocatori[i].cognome +
      '</p>'
    cardGiocatoreSingolo.appendChild(nomeGiocatoreCard)
    let immagineGiocatoreContainer = document.createElement('div')
    immagineGiocatoreContainer.innerHTML = immagineGiocatore
    cardGiocatoreSingolo.appendChild(immagineGiocatoreContainer)
    let pulsanteEliminaGiocatore = document.createElement('div')
    pulsanteEliminaGiocatore.innerHTML =
      '<i class="bx bx-trash"></i><p>Elimina</p>'
    pulsanteEliminaGiocatore.setAttribute('id', 'eliminaGiocatore')
    cardGiocatoreSingolo.appendChild(pulsanteEliminaGiocatore)
    griglia.appendChild(cardGiocatoreSingolo)
    pulsanteEliminaGiocatore.addEventListener('click', (event) => {
      removeGiocatore(squadra.giocatori[i].id)
    })
  }

  //CREIAMO IL 'FOOTER' DELLA PAGINA COME FLEXBOX
  let footerModificaSquadra = document.createElement('div')
  footerModificaSquadra.setAttribute('id', 'footerModificaSquadra')
  schermataPrincipale.appendChild(footerModificaSquadra)
  //CREIAMO IL PULSANTE PER LA VISUALIZZAZIONE DEL DIRIGENTE
  let visualizzaDirigenteSquadra = document.createElement('div')
  visualizzaDirigenteSquadra.innerHTML =
    '<div id="immagineDirigente"><div class = "dorato">' +
    squadra.presidente.nome +
    ' ' +
    squadra.presidente.cognome +
    '</div><img src=' +
    immagineDirigenteGenerico +
    ' width="120px" height="100px" alt = "immagine dirigente"></div> <div>' +
    '</div><div class = "etichettaFooterSquadra">presidente</div>'
  visualizzaDirigenteSquadra.setAttribute('id', 'visualizzaDirigenteSquadra')

  //CREIAMO IL PULSANTE PER LA VISUALIZZAZIONE DELL'ALLENATORE
  let visualizzaAllenatoreSquadra = document.createElement('div')
  visualizzaAllenatoreSquadra.innerHTML =
    '<div id="immagineAllenatore"><div class = "dorato" id = "nomeAllenatore">' +
    squadra.allenatori[0].allenatore.nome +
    ' ' +
    squadra.allenatori[0].allenatore.cognome +
    '</div><img src=' +
    immagineAllenatoreGenerico +
    ' width="120px" height="100px" alt = "immagine allenatore"><div id = "containerCambiaAllenatore"><div id="cambiaMinus" style="display:none"><i class="bx bx-right-arrow bx-flip-horizontal" ></i></div><div id = "cambiaAllenatoreButton">cambia</div><div id="cambiaPlus" style="display:none"><i class="bx bx-right-arrow" ></i></div></div></div>'
  visualizzaAllenatoreSquadra.setAttribute('id', 'visualizzaAllenatoreSquadra')

  //CREIAMO IL PULSANTE PER L'ACQUISTO DI UN GIOCATORE
  let compraGiocatoreButton = document.createElement('div')
  compraGiocatoreButton.innerHTML =
    '<p>Acquista</p><i class="bx bxs-cart-alt"></i>'
  compraGiocatoreButton.setAttribute('id', 'pulsanteCompraGiocatore')

  //CREIAMO IL PULSANTE PER CONVOCARE I GIOCATORI
  let convocaGiocatoreButton = document.createElement('div')
  convocaGiocatoreButton.innerHTML =
    '<p>Convoca</p><i class="bx bx-list-plus"></i>'
  convocaGiocatoreButton.setAttribute('id', 'pulsanteConvocaGiocatore')

  //FACCIAMO VEDERE LA CITTà DELLA SQUADRA SELEZIONATA
  let squadraCitta = document.createElement('div')
  squadraCitta.setAttribute('id', 'cardFooterModificaSquadra')
  squadraCitta.innerHTML =
    '<div class = "etichettaFooterSquadra">sede</div><i class="bx bxs-buildings" ></i><p>' +
    squadra.sede +
    '</p>'
  //FACCIAMO VEDERE LO STADIO DELLA SQUADRA SELEZIONATA
  let squadraStadio = document.createElement('div')
  squadraStadio.setAttribute('id', 'cardFooterModificaSquadra')
  squadraStadio.innerHTML =
    '<div class = "etichettaFooterSquadra">stadio</div><i class="bx bx-dumbbell"></i><p>' +
    squadra.stadio +
    '</p>'

  //AGGIUNGIAMO AL FOOTER
  footerModificaSquadra.appendChild(squadraCitta)
  footerModificaSquadra.appendChild(squadraStadio)
  footerModificaSquadra.appendChild(visualizzaAllenatoreSquadra)
  footerModificaSquadra.appendChild(visualizzaDirigenteSquadra)
  footerModificaSquadra.appendChild(convocaGiocatoreButton)
  footerModificaSquadra.appendChild(compraGiocatoreButton)

  SquadraOnView = squadra
  let pulsanteConvocaGiocatore = document.querySelector(
    '#pulsanteCompraGiocatore',
  )
  pulsanteConvocaGiocatore.addEventListener('click', modalitaCompraGiocatore)
  let pulsanteCompraGiocatore = document.querySelector(
    '#pulsanteConvocaGiocatore',
  )
  pulsanteCompraGiocatore.addEventListener('click', modalitaConvocaGiocatore)

  cambiaMinus = document.querySelector('#cambiaMinus')
  cambiaPlus = document.querySelector('#cambiaPlus')
  cambiaAllenatoreButton = document.querySelector('#cambiaAllenatoreButton')

  cambiaMinus.addEventListener('click', () => {
    i -= 1
    i < 0 ? (i = squadre.length - 1) : null
    document.querySelector('#nomeAllenatore').innerText =
      squadre[i].allenatori[0].allenatore.nome +
      ' ' +
      squadre[i].allenatori[0].allenatore.cognome
  })

  cambiaPlus.addEventListener('click', () => {
    i += 1
    i > 20 ? (i = 1) : null
    document.querySelector('#nomeAllenatore').innerText =
      squadre[i].allenatori[0].allenatore.nome +
      ' ' +
      squadre[i].allenatori[0].allenatore.cognome
  })

  function visualizzaPulsantiCambio() {
    cambiaAllenatoreButton.style.backgroundColor = 'green'
    cambiaAllenatoreButton.innerHTML = "<i class='bx bx-check-double' ></i>"
    cambiaMinus.style.display = 'block'
    cambiaPlus.style.display = 'block'
  }

  function rimuoviPulsantiCambio() {
    cambiaAllenatoreButton.innerText = 'CAMBIA'
    cambiaAllenatoreButton.style.backgroundColor = 'rgb(67, 57, 247)'
    cambiaMinus.style.display = 'none'
    cambiaPlus.style.display = 'none'
  }

  var i = squadre.indexOf(SquadraOnView)

  cambiaAllenatoreButton.addEventListener('click', function ScorriAllenatori() {
    //Gervasoni
    //Ferrari
    i = squadre.indexOf(SquadraOnView)
    nAllenatore = document.querySelector('#nomeAllenatore').innerText
    contaConferme += 1
    if (contaConferme % 2 === 0) {
      rimuoviPulsantiCambio()
      allenatori.forEach((allenatore) => {
        if (allenatore.nome + ' ' + allenatore.cognome === nAllenatore) {
          SquadraOnView.presidente.cambiaAllenatore(allenatore)
        }
      })
    } else {
      visualizzaPulsantiCambio()
    }
  })
}

let contaConferme = 0

function visualizzaPaginaGestioneSquadre() {
  //Gervasoni
  schermataPrincipale.setAttribute('id', 'schermataPrincipale')
  schermataPrincipale.innerHTML = ''

  // creazione griglia squadre
  let griglia = document.createElement('div')
  griglia.setAttribute('id', 'grigliaSquadre')
  schermataPrincipale.appendChild(griglia)

  // creazione card per ogni squadra presente
  for (let i = 0; i < squadre.length; i++) {
    let cardSquadraSingola = document.createElement('div')
    cardSquadraSingola.setAttribute('class', 'cardSquadraSingola')
    cardSquadraSingola.setAttribute('id', i)

    // creazione nome squadra
    let nomeSquadraCard = document.createElement('div')
    nomeSquadraCard.innerHTML = '<p>' + squadre[i].nome + '</p>'
    cardSquadraSingola.appendChild(nomeSquadraCard)

    // creazione immagine squadra
    let immagineSquadra = document.createElement('div')
    immagineSquadra.innerHTML =
      '<img src=' +
      squadre[i].logo +
      " alt='Immagine Scudetto' width='70vh' height='70vh'>"
    cardSquadraSingola.appendChild(immagineSquadra)

    // creazione pulsanti modifica/elimina
    let tastiAzione = document.createElement('div')
    let tastoAzioneElimina = document.createElement('div')
    tastoAzioneElimina.innerHTML = '<i class="bx bx-trash"></i>'

    tastoAzioneElimina.setAttribute('id', 'elimina')
    //tastoAzioneElimina.addEventListener('click', removeSquadra)
    let tastoAzioneModifica = document.createElement('div')
    tastoAzioneModifica.setAttribute('id', 'modifica')
    tastoAzioneModifica.innerHTML = '<i class="bx bx-edit-alt" ></i>'
    tastiAzione.setAttribute('id', 'containerModificaElimina')
    tastiAzione.appendChild(tastoAzioneModifica)
    tastiAzione.appendChild(tastoAzioneElimina)
    cardSquadraSingola.appendChild(tastiAzione)

    griglia.appendChild(cardSquadraSingola)
    griglia.addEventListener('click', clickSquadra)
  }

  let formAggiungiSquadra = document.createElement('div')
  formAggiungiSquadra.setAttribute('id', 'formAggiungiSquadra')
  schermataPrincipale.appendChild(formAggiungiSquadra)
  let formAggiungiSquadraNome = document.createElement('div')
  formAggiungiSquadraNome.innerHTML =
    '<label for="nomeSquadra">Nome:</label><input type="text" id="nomesquadra">'
  formAggiungiSquadra.appendChild(formAggiungiSquadraNome)
  let formAggiungiSquadraCitta = document.createElement('div')
  formAggiungiSquadra.appendChild(formAggiungiSquadraCitta)
  formAggiungiSquadraCitta.innerHTML =
    '<label for="nomeSquadra">Stadio:</label><input type="text" id="nomestadio">'
  let formAggiungiSquadraStadio = document.createElement('div')
  formAggiungiSquadra.appendChild(formAggiungiSquadraStadio)
  formAggiungiSquadraStadio.innerHTML =
    '<label for="nomeSquadra">Città:</label><input type="text" id="cittasquadra">'
  let formAggiungiSquadraInvio = document.createElement('div')
  formAggiungiSquadra.appendChild(formAggiungiSquadraInvio)
  formAggiungiSquadraInvio.innerHTML =
    '<input type="submit" id ="invioSquadra" value="Aggiungi">'

  bottoneAggiungiSquadra = document.querySelector('#invioSquadra')
  bottoneAggiungiSquadra.addEventListener('click', addSquadra)
  inputNomeSquadra = document.querySelector('#nomesquadra')
  inputSedeSquadra = document.querySelector('#cittasquadra')
  inputStadioSquadra = document.querySelector('#nomestadio')
}

arbitriLogo = 'Media/Logo_aia_2021.png'
//gestione arbitri
function visualizzaPaginaGestioneArbitri() {
  schermataPrincipale.setAttribute('id', 'schermataPrincipale')
  //Ascenso//
  schermataPrincipale.innerHTML =
    "<div4 id = 'headerSquadraSingola'><div1 id = 'tornaSquadre'><i class='bx bx-arrow-back' id = 'tornaSquadre'></i></div1><div2 id = 'titoloSquadra'><p>" +
    'Gestione Arbitri' +
    "</p></div2><div3><img src = '" +
    arbitriLogo +
    "' width = '80px' height = '60px style='object-fit:contain'</div3></div4>"

  document
    .querySelector('#tornaSquadre')
    .addEventListener('click', visualizzaHome)

  immagineArbitro =
    '<img src = "Media/referee.png" width="120px" height="120px">'
  let griglia = document.createElement('div')
  griglia.setAttribute('id', 'grigliaGiocatori')
  schermataPrincipale.appendChild(griglia)

  for (let i = 0; i < arbitri.length; i++) {
    let cardGiocatoreSingolo = document.createElement('div')
    cardGiocatoreSingolo.setAttribute('class', 'cardGiocatorSingolo')
    cardGiocatoreSingolo.setAttribute('id', i)

    // creazione nome squadra
    let nomeGiocatoreCard = document.createElement('div')
    nomeGiocatoreCard.innerHTML =
      '<p>' + arbitri[i].nome + ' ' + arbitri[i].cognome + '</p>'
    cardGiocatoreSingolo.appendChild(nomeGiocatoreCard)
    let immagineGiocatoreContainer = document.createElement('div')
    immagineGiocatoreContainer.innerHTML = immagineArbitro
    cardGiocatoreSingolo.appendChild(immagineGiocatoreContainer)
    griglia.appendChild(cardGiocatoreSingolo)

    // creazione pulsanti modifica/elimina
    let tastiAzione = document.createElement('div')
    let tastoAzioneElimina = document.createElement('div')
    tastoAzioneElimina.innerHTML = '<i class="bx bx-trash"></i>'

    tastoAzioneElimina.setAttribute('id', 'elimina')
    //tastoAzioneElimina.addEventListener('click', removeSquadra)
    let tastoAzioneModifica = document.createElement('div')
    tastoAzioneModifica.setAttribute('id', 'modifica')
    tastoAzioneModifica.innerHTML = '<i class="bx bx-edit-alt" ></i>'
    tastiAzione.setAttribute('id', 'containerModificaElimina')
    tastiAzione.appendChild(tastoAzioneModifica)
    tastiAzione.appendChild(tastoAzioneElimina)
    cardGiocatoreSingolo.appendChild(tastiAzione)

    griglia.appendChild(cardGiocatoreSingolo)
    griglia.addEventListener('click', clickArbitro)
  }

  let formAggiungiArbitro = document.createElement('div')
  formAggiungiArbitro.setAttribute('id', 'formAggiungiArbitro')
  schermataPrincipale.appendChild(formAggiungiArbitro)

  let formAggiungiArbitroNome = document.createElement('div')
  formAggiungiArbitroNome.innerHTML =
    '<label for="nomearbitro">Nome:</label><input type="text" id="nomearbitro">'
  formAggiungiArbitro.appendChild(formAggiungiArbitroNome)

  let formAggiungiArbitroCognome = document.createElement('div')
  formAggiungiArbitro.appendChild(formAggiungiArbitroCognome)
  formAggiungiArbitroCognome.innerHTML =
    '<label for="nomearbitro">Cognome:</label><input type="text" id="cognomearbitro">'

  let formAggiungiArbitroInvio = document.createElement('div')
  formAggiungiArbitro.appendChild(formAggiungiArbitroInvio)
  formAggiungiArbitroInvio.innerHTML =
    '<input type="submit" id ="invioarbitro" value="Aggiungi">'

  bottoneAggiungiArbitro = document.querySelector('#invioarbitro')
  bottoneAggiungiArbitro.addEventListener('click', addArbitro)
  inputNomeArbitro = document.querySelector('#nomearbitro')
  inputCognomeArbitro = document.querySelector('#cognomearbitro')
}

function visualizzaPaginaCalendario(numeroGiornata) {
  //Ferrari
  nGiornata = numeroGiornata
  schermataPrincipale.setAttribute('id', 'schermataPrincipale')
  let frecce =
    "<div id ='scorriGiornate'><i class='bx bxs-chevrons-right bx-rotate-180' id = 'giornataPrecedente'></i><p>Giornata " +
    (nGiornata + 1) +
    "</p><i class='bx bxs-chevrons-left bx-rotate-180'  id = 'giornataSuccessiva'></i></div>"
  schermataPrincipale.innerHTML = frecce
  let partite = "<div id='giornata'>"
  let i = 0
  calendario[nGiornata].partite.forEach((element) => {
    partite += `<div id = "scontroSquadre">
            <div id="scudettoSquadraSingola"><img src = `+ element.squadraCasa.squadra.logo +`><img src = `+ element.squadraOspite.squadra.logo +`></div>
                    <h3>${element.squadraCasa.squadra.nome}<i class='bx bx-run bx-fade-left' ></i><i class='bx bx-run bx-flip-horizontal' ></i>${element.squadraOspite.squadra.nome}<h3>
                  `
    if (element.arbitro === null) {
      partite += `<div id=${i}>
                    <h2 id="risultato">Designa Arbitro</h2>
                  </div></div>`
    } else if (element.risultatoRegistrato) {
      partite += `<div id=${i}>
                      <h2 id="risultato">Risultato</h2>
                    </div></div>`
    } else {
      partite += `<div id=${i}>
                    <h2 id="risultato">Inserisci risultato</h2>
                  </div></div>`
    }
    i++
  })
  schermataPrincipale.innerHTML += partite + '</div>'
  giornataSuccessiva = document.querySelector('#giornataSuccessiva')
  giornataPrecedente = document.querySelector('#giornataPrecedente')
  giornataPrecedente.addEventListener('click', () => {
    if (nGiornata !== 0) nGiornata--
    visualizzaPaginaCalendario(nGiornata)
  })
  giornataSuccessiva.addEventListener('click', () => {
    if (nGiornata !== calendario.length - 1) nGiornata++
    visualizzaPaginaCalendario(nGiornata)
  })
  document.querySelector('#giornata').addEventListener('click', clickCalendario)
}

function modalitaCompraGiocatore() {
  //GERVASONI
  //BERTANI
  schermataPrincipale.innerHTML =
    "<div4 id = 'headerSquadraSingola'><div1 id = 'tornaSquadre'><i class='bx bx-arrow-back' id = 'tornaSquadre'></i></div1><div2 id = 'titoloSquadra'><p>" +
    'Mercato Giocatori' +
    '</p></div2><div3>' +
    "<i class='bx bx-store' ></i></div3></div4>"

  document
    .querySelector('#tornaSquadre')
    .addEventListener('click', visualizzaPaginaGestioneSquadre)

  leggiGiocatori()

  let griglia = document.createElement('div')
  griglia.setAttribute('id', 'grigliaGiocatori')
  for (let i = 0; i < giocatori.length; i++) {
    let cardGiocatoreSingolo = document.createElement('div')
    cardGiocatoreSingolo.setAttribute('class', 'cardGiocatoreSingolo')
    cardGiocatoreSingolo.setAttribute('id', giocatori[i].id)
    let nomeGiocatoreCard = document.createElement('div')
    nomeGiocatoreCard.innerHTML =
      '<p>' + giocatori[i].nome + ' ' + giocatori[i].cognome + '</p>'
    cardGiocatoreSingolo.appendChild(nomeGiocatoreCard)
    let immagineGiocatoreContainer = document.createElement('div')
    immagineGiocatoreContainer.innerHTML = immagineGiocatore
    cardGiocatoreSingolo.appendChild(immagineGiocatoreContainer)
    let tastoAzioneElimina = document.createElement('div')
    tastoAzioneElimina.innerHTML = '<p>compra</p>'
    cardGiocatoreSingolo.appendChild(tastoAzioneElimina)
    griglia.appendChild(cardGiocatoreSingolo)
    griglia.addEventListener("click", clickCompra)
  }
  schermataPrincipale.appendChild(griglia)
}
function clickCompra(event){
  //Ferrari
  id = event.target.parentElement.parentElement.id
  SquadraOnView.presidente.compraGiocatore(id);
}
let giocatoriConvocati = []
let conferma = 0
function modalitaConvocaGiocatore() {
  //GERVASONI
  conferma += 1
  let convocaGiocatoreButton = document.querySelector(
    '#pulsanteConvocaGiocatore',
  )
  if (conferma < 2) {
    giocatoriConvocati = []
    convocaGiocatoreButton.innerHTML = '<i class="bx bx-list-check"></i>'
    convocaGiocatoreButton.style.backgroundColor = 'green'
    document.querySelectorAll('.cardGiocatorSingolo').forEach((card) => {
      card.classList.toggle('cardGiocatorSingoloSelezione')
      card.addEventListener('click', function clickConvocaGiocatore() {
        if (
          giocatoriConvocati.includes(SquadraOnView.giocatori[card.id]) ===
          false
        ) {
          giocatoriConvocati.push(SquadraOnView.giocatori[card.id])
          card.style.backgroundColor = 'green'
        } else {
          let indexToRemove = giocatoriConvocati.indexOf(
            SquadraOnView.giocatori[card.id],
          )
          giocatoriConvocati.splice(indexToRemove, 1)
          card.style.backgroundColor = 'transparent'
        }
      })
    })
  } else {
    document.querySelectorAll('.cardGiocatorSingolo').forEach((card) => {
      card.classList.toggle('cardGiocatorSingoloSelezione')
    })
    convocaGiocatoreButton.innerHTML = '<i class="bx bx-list-plus"></i>'
    convocaGiocatoreButton.style.backgroundColor = 'rgb(102, 94, 253)'
    conferma = 0
    for (let i = 0; i < calendario.length; i++) {
      for (let j = 0; j < calendario[i].partite.length; j++) {
        if (
          calendario[i].partite[j].squadraCasa.squadra.nome ===
            SquadraOnView.nome &&
          calendario[i].partite[j].squadraCasa.formazioneHardCoded
        ) {
          calendario[i].partite[j].squadraCasa.inserisciFormazione(
            giocatoriConvocati,
          )
          return true
        } else if (
          calendario[i].partite[j].squadraOspite.squadra.nome ===
            SquadraOnView.nome &&
          calendario[i].partite[j].squadraOspite.formazioneHardCoded
        ) {
          calendario[i].partite[j].squadraOspite.inserisciFormazione(
            giocatoriConvocati,
          )
          return true
        }
      }
    }
  }
}
function creaAllenatore() {
  allenatori.push(new Allenatore())
}
function addGiocatore() {
  //Ferrari
  //I giocatori creati partono svincolati (senza squadra)
  giocatori.push(
    new Giocatore(
      inputNomeGiocatore.value,
      inputCognomeGiocatore.value,
      giocatori.length,
      inputPosizioneGiocatore.value,
    ),
  )
  giocatori[giocatori.length - 1].squadra = 'Svincolato'
}
function removeGiocatore(id) {
  for (let i = 0; i < SquadraOnView.giocatori.length; i++) {
    if (SquadraOnView.giocatori[i].id === id)
      SquadraOnView.giocatori.splice(i, 1)
  }
  visualizzaPaginaModificaSquadra(SquadraOnView)
}
function addArbitro() {
  //Ferrari
  //Controllo se devo creare un nuovo arbitro o se sto modificandone uno (il bottone è lo stesso)
  if (inModificaArbitro) {
    arbitroInModifica.nome = inputNomeArbitro.value
    arbitroInModifica.cognome = inputCognomeArbitro.value
    bottoneAggiungiArbitro.value = 'Aggiungi'
  } else {
    if (validateFormArbitro()) {
      arbitri.push(
        new Arbitro(inputNomeArbitro.value, inputCognomeArbitro.value),
      )
    }
  }
  visualizzaPaginaGestioneArbitri()
}

function removeArbitro(id) {
  //Ferrari
  arbitri.splice(id, 1)
  visualizzaPaginaGestioneArbitri()
}

function modificaArbitro(a) {
  //Ferrari
  arbitroInModifica = a
  bottoneAggiungiArbitro.value = 'Modifica'
  inputNomeArbitro.value = arbitroInModifica.nome
  inputCognomeArbitro.value = arbitroInModifica.cognome
  inModificaArbitro = true
}
function validateFormArbitro() {
  //Ferrari
  if (inputNomeArbitro.value !== '' && inputCognomeArbitro !== '') {
    return true
  }
  return false
}
function validateForm() {
  //Ferrari
  if (
    (inputNomeSquadra.value !== '' &&
      inputSedeSquadra.value !== '' &&
      inputStadioSquadra.value !== '') ||
    (inputNomeArbitro.value !== '' && inputCognomeArbitro !== '')
  ) {
    return true
  }
  return false
}
//////////////Funzioni aggiunta, rimozione e modifica squadre/////////////////
function addSquadra() {
  //Ferrari
  //Controllo se devo creare una nuova squadra o se sto modificandone una (il bottone è lo stesso)
  if (inModifica) {
    squadraInModifica.nome = inputNomeSquadra.value
    squadraInModifica.sede = inputSedeSquadra.value
    squadraInModifica.stadio = inputStadioSquadra.value
    bottoneAggiungiSquadra.value = 'Aggiungi'
  } else {
    if (squadre.length < 20 && validateForm()) {
      squadre.push(
        new Squadra(
          inputNomeSquadra.value,
          inputSedeSquadra.value,
          inputStadioSquadra.value,
        ),
      )
    }
  }
  visualizzaPaginaGestioneSquadre()
  inModifica = false
}
function removeSquadra(id) {
  //Ferrari
  squadre.splice(id, 1)
  visualizzaPaginaGestioneSquadre()
}
function modificaSquadra(s) {
  //Ferrari
  squadraInModifica = s
  bottoneAggiungiSquadra.value = 'Modifica'
  inputNomeSquadra.value = squadraInModifica.nome
  inputSedeSquadra.value = squadraInModifica.sede
  inputStadioSquadra.value = squadraInModifica.stadio
  inModifica = true
}
function designa() {
  arbitroDesignato = document.querySelector('#arbitroDesignato').value
  for (let i = 0; i < arbitri.length; i++) {
    if (arbitri[i].nome + arbitri[i].cognome === arbitroDesignato) {
      partita.designaArbitro(arbitri[i])
      break
    }
  }
  visualizzaPaginaCalendario(nGiornata)
}
function visualizzaDesignaArbitro() {
  let pagina = '<div id = "centra"><h2>Designa Arbitro</h2>'
  pagina += "<img src='Media/referee.png'><select size = 8 id = 'arbitroDesignato'>"
  arbitri.forEach(
    (e) =>
      (pagina += `<option value = '${e.nome}${e.cognome}'>${e.nome} ${e.cognome}</option>)`),
  )
  pagina += "</select><input type = 'button' id = 'designa' value = 'designa'></div>"
  schermataPrincipale.innerHTML = pagina
  document.querySelector('#designa').addEventListener('click', designa)
}
//Gestione click su intera finestra
function clickCalendario(event) {
  //Ferrari
  if (event.target.id === 'risultato') {
    nPartita = parseInt(event.target.parentElement.id)
    partita = calendario[nGiornata].partite[nPartita]
    if (event.target.innerText === 'Risultato') {
      visualizzaPaginaTabellino(partita)
    } else if (event.target.innerText === 'Designa Arbitro') {
      visualizzaDesignaArbitro()
    } else {
      visualizzaPaginaInserisciRisultato(partita)
    }
  }
}
function visualizzaPaginaTabellino(partita) {
  //Ferrari
  schermataPrincipale.innerHTML = `<h1>${
    partita.squadraCasa.squadra.nome
  } ${partita.calcolaRisultato()} ${partita.squadraOspite.squadra.nome}</h1>`
}
function GetPaginaTabellino(partita) {
  //Ferrari
  let pagina = `<div id = "containerTotDesigna"><div id="containerDesigna"><div id = immagineDesigna><img src= "`+ partita.squadraCasa.squadra.logo + `"</div></div><h1>${partita.squadraCasa.squadra.nome} - ${partita.squadraOspite.squadra.nome}</h1><div id = immagineDesigna><img src= "`+ partita.squadraOspite.squadra.logo + `"</div></div></div>`
  pagina += `<div id = "formRisultato">
              <div id = "inputTextRisultato">
              <label for="marcatore">Nome:</label><input type="text" id="marcatore">
              <label for="minuto">Minuto:</label><input type="text" id="minuto">
              </div>
              <div id = "inputCbRisultato">
              <label for="tipo">Tipo Gol</label>
              <select id = "tipo">
                <option value = "azione">Azione</option>
                <option value = "rigore">Rigore</option>
                <option value = "pallaInattiva">Palla inattiva</option>
              </select>
              <label for="squadra">Squadra</label>
              <select id = "squadra">
                <option value = ${partita.squadraCasa.squadra.nome}>${partita.squadraCasa.squadra.nome}</option>
                <option value = ${partita.squadraOspite.squadra.nome}>${partita.squadraOspite.squadra.nome}</option>
              </select>
              </div>
              <input type = "button" id = "addGol" value="Aggiungi Gol">
            </div>
          `

  /* for (let i = 0; i < reti.length; i++) {
    pagina += `<div>${reti[i].marcatore}</div><div>${reti[i].minuto}</div><div>${reti[i].tipo}</div><div>${reti[i].squadra}</div>`
  } */
  pagina +=
    '<input type = "botton" id = "registra" value="Registra risultato"></input></div>'
  return pagina
}
function visualizzaPaginaInserisciRisultato(partita) {
  //Ferrari
  reti = []

  schermataPrincipale.innerHTML = GetPaginaTabellino(partita)
  document.querySelector('#addGol').addEventListener('click', aggiungiGol)
  document.querySelector('#registra').addEventListener('click', registra)
}
function registra() {
  //Ferrari
  partita.registraRisultato(reti)
  golInseriti = false
  partita.calcolaPunti()
  visualizzaPaginaCalendario(nGiornata)
}
function validateFormGol() {
  //Ferrari
  marcatore = document.querySelector('#marcatore').value
  minuto = document.querySelector('#minuto').value
  squadra = document.querySelector('#squadra').value
  tipo = document.querySelector('#tipo').value
  if (marcatore !== '' && minuto !== '') return true
  return false
}

function aggiungiGol() {
  //Ferrari
  golInseriti = true
  if (validateFormGol()) {
    reti.push(new Gol(marcatore, minuto, tipo, squadra))
  }
  schermataPrincipale.innerHTML = GetPaginaTabellino(partita)
  document.querySelector('#addGol').addEventListener('click', aggiungiGol)
  document.querySelector('#registra').addEventListener('click', registra)
}
function clickArbitro(event) {
  if (event.target.localName === 'i') {
    id = event.target.parentElement.parentElement.parentElement.id
    bottone = event.target.parentElement.id
  } else {
    id = event.target.parentElement.parentElement.id
    bottone = event.target.id
  }
  if (bottone === 'modifica') modificaArbitro(arbitri[id])
  else if (bottone === 'elimina') removeArbitro(id)
}
function clickSquadra(event) {
  //Ferrari
  if (event.target.localName === 'i') {
    id = event.target.parentElement.parentElement.parentElement.id
    bottone = event.target.parentElement.id
  } else {
    id = event.target.parentElement.parentElement.id
    bottone = event.target.id
  }
  if (bottone === 'modifica') modificaSquadra(squadre[id])
  else if (bottone === 'elimina') removeSquadra(id)
  else if (event.target.localName === 'img')
    visualizzaPaginaModificaSquadra(squadre[id])
}

//////////////////////CLASSI////////////////////Ferrari
class Persona {
  constructor(nome, cognome, id) {
    this.id = id
    this.nome = nome
    this.cognome = cognome
  }
}
class Arbitro extends Persona {
  constructor(nome, cognome) {
    super(nome, cognome, arbitri.length)
  }
}
class Giocatore extends Persona {
  constructor(nome, cognome, posizione) {
    super(nome, cognome, giocatori.length)
    this.id = giocatori.length
    this.posizione = posizione
  }
  impostaSquadra(squadra) {
    this.squadra = squadra
    this.squadra.aggiungiGiocatore(this)
  }
}
class Allenatore extends Persona {
  constructor(nome, cognome) {
    super(nome, cognome, allenatori.length)
  }
  impostaSquadra(squadra) {
    this.squadra = squadra
  }

  convocaGiocatori() {}
}
class Dirigente extends Persona {
  constructor(nome, cognome, grado, squadra) {
    super(nome, cognome, dirigenti.length)
    this.grado = grado
    this.squadra = squadra
  }
  cambiaAllenatore(allenatore) {
    //Quando cambio l'allenatore automaticamente esonero l'allenatore attuale impostando la fine del suo periodo da allenatore
    this.squadra.allenatori[0].impostaTermine(new Date(Date.now()))
    //Inserisco il nuovo allenatore aggiuggendolo all'array di allenatori e imposto l'attuale squadra al nuovo allenatore
    this.squadra.allenatori.unshift(
      new PeriodoAllenatore(new Date(Date.now()), allenatore),
    )
    this.squadra.allenatori[0].impostaSquadra = this.squadra
  }
  compraGiocatore(id) {
    for (let i = 0; i < giocatori.length; i++) {
      if (giocatori[i].id === parseInt(id) && giocatori[i].squadra !== this.squadra) {
        this.squadra.giocatori.push(giocatori[i])
        if (giocatori[i].squadra !== 'Svincolato') {
          giocatori[i].squadra.presidente.vendiGiocatore(giocatori[i].id)
        }
        giocatori[i].squadra = this.squadra
        return 'Acquisto effettuato'
      }
    }
    return 'Giocatore non esistente o non acquistabile'
  }
  vendiGiocatore(id) {
    this.squadra.giocatori = this.squadra.giocatori.filter((g) => g.id !== id)
  }
}

class PeriodoAllenatore {
  constructor(inizio, allenatore) {
    this.inizio = inizio
    this.allenatore = allenatore
  }
  impostaTermine(fine) {
    this.fine = fine
  }
}
class Formazione {
  constructor(squadra) {
    this.squadra = squadra
    this.formazione = squadra.giocatori.slice(0, 11)
    this.formazioneHardCoded = true
  }
  inserisciFormazione(formazione) {
    this.formazioneHardCoded = false
    this.formazione = formazione
  }
}
class Partita {
  constructor(squadraCasa, squadraOspite) {
    this.squadraCasa = squadraCasa
    this.squadraOspite = squadraOspite
    this.risultatoRegistrato = false
    this.arbitro = null
  }
  designaArbitro(arbitro) {
    this.arbitro = arbitro
  }
  registraRisultato(reti) {
    this.reti = reti
    this.risultatoRegistrato = true
  }
  calcolaPunti() {
    let g1 = 0
    let g2 = 0
    this.reti.forEach((g) => {
      if (g.squadra === this.squadraCasa.squadra.nome) {
        g1++
      } else {
        g2++
      }
    })
    if (g1 > g2) {
      this.squadraCasa.squadra.punti += 3
    } else if (g1 < g2) {
      this.squadraOspite.squadra.punti += 3
    } else if (g1 === g2) {
      this.squadraCasa.squadra.punti += 1
      this.squadraOspite.squadra.punti += 1
    }
  }
  calcolaRisultato() {
    let g1 = 0
    let g2 = 0
    this.reti.forEach((g) => {
      if (g.squadra === this.squadraCasa.squadra.nome) {
        g1++
      } else {
        g2++
      }
    })
    return g1 + '-' + g2
  }
}
class Gol {
  constructor(marcatore, minuto, tipo, squadra) {
    this.marcatore = marcatore
    this.tipo = tipo
    this.minuto = minuto
    this.squadra = squadra
  }
}
class Giornata {
  constructor(partite) {
    this.partite = partite
  }
}
class Squadra {
  constructor(nome, sede, stadio) {
    this.nome = nome
    this.sede = sede
    this.stadio = stadio
    this.giocatori = []
    this.allenatori = []
    this.logo = immagineProva
    this.punti = 0
  }
  inserisciLogo(logo) {
    this.logo = logo
  }
  inserisciPresidente(nome, cognome) {
    dirigenti.push(new Dirigente(nome, cognome, 'Presidente', this))
    this.presidente = dirigenti[dirigenti.length - 1]
  }
  aggiungiGiocatore(giocatore) {
    this.giocatori.push(giocatore)
  }
}

function leggiGiocatori() {
  //Bertani
  fetch('API/GiocatoriSerieA.json')
    .then(function (response) {
      return response.json()
    })
    .then(function (products) {
      for (let product of products) {
        giocatori.push(
          new Giocatore(product.Nome, product.Cognome, product.Ruolo),
        )
        for (let i = 0; i < squadre.length; i++) {
          if (squadre[i].nome === product.Squadra.trim()) {
            giocatori[giocatori.length - 1].impostaSquadra(squadre[i])
            break
          }
        }
      }
    })
}

function leggiSquadre() {
  //Bertani
  fetch('API/Squadre.json')
    .then(function (response) {
      return response.json()
    })
    .then(function (products) {
      for (let product of products) {
        squadre.push(new Squadra(product.Nome, product.Citta, product.Stadio))
        squadre[squadre.length - 1].inserisciLogo(product.Logo)
      }
    })
}
function leggiPresidenti() {
  //Bertani
  fetch('API/presidenti.json')
    .then(function (response) {
      return response.json()
    })
    .then(function (products) {
      for (let product of products) {
        for (let i = 0; i < squadre.length; i++) {
          if (squadre[i].nome === product.Squadra.trim()) {
            squadre[i].inserisciPresidente(product.Nome, product.Cognome)
          }
        }
      }
    })
}
function leggiAllenatori() {
  //Bertani
  fetch('API/allenatori.json')
    .then(function (response) {
      return response.json()
    })
    .then(function (products) {
      for (let product of products) {
        allenatori.push(new Allenatore(product.Nome, product.Cognome))
        for (let i = 0; i < squadre.length; i++) {
          if (squadre[i].nome === product.Squadra.trim()) {
            squadre[i].allenatori.push(
              new PeriodoAllenatore(
                new Date(product.Anno, product.Mese, product.Giorno, 0, 0, 0),
                allenatori[allenatori.length - 1],
              ),
            )
            break
          }
        }
      }
    })
}
function leggiArbitri() {
  //Bertani
  fetch('API/arbitriSerieA.json')
    .then(function (response) {
      return response.json()
    })
    .then(function (products) {
      for (let product of products) {
        arbitri.push(new Arbitro(product.Nome, product.Cognome))
      }
      //Queste due funzioni vengono richimate qui perché devono accedere ad alcuni dati contenenti nel JSON
      calendario = creaCalendario(squadre)
      visualizzaHome()
    })
}

leggiSquadre()
leggiPresidenti()
leggiAllenatori()
leggiGiocatori()
leggiArbitri()

function creaCalendario(squadre) {
  //Ferrari
  let s = squadre.slice()
  s = shuffle(s)
  let nGiornate = s.length - 1
  let nSquadre = s.length
  let andata = []
  let ritorno = []
  if (nSquadre % 2 == 1) {
    s.push('riposo')
  }
  for (let i = 0; i < nGiornate; i++) {
    let giornata = []
    let giornata2 = []
    for (let j = 0; j < nSquadre / 2; j++) {
      giornata.push(
        new Partita(new Formazione(s[j]), new Formazione(s[nGiornate - j])),
      )
      giornata2.push(
        new Partita(new Formazione(s[nGiornate - j]), new Formazione(s[j])),
      )
    }
    let appoggio = s.shift()
    s.push(appoggio)
    appoggio = s.splice(0, 10)
    s = s.concat(appoggio)
    andata.push(new Giornata(giornata))
    ritorno.push(new Giornata(giornata2))
  }
  squadre.forEach((element) => (element.punti = 0))
  return andata.concat(ritorno)
}
function shuffle(array) {
  let indice = array.length,
    indiceRandom
  while (indice != 0) {
    indiceRandom = Math.floor(Math.random() * indice)
    indice--
    ;[array[indice], array[indiceRandom]] = [array[indiceRandom], array[indice]]
  }

  return array
}
function calcolaClassifica() {
  //Ferrari
  let s = squadre.slice()
  return s.sort(compare)
}
function compare(a, b) {
  //Ferrari
  if (a.punti < b.punti) {
    return 1
  }
  if (a.punti > b.punti) {
    return -1
  }
  return 0
}
