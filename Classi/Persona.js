class Persona {
  constructor(nome, cognome) {
    this.nome = nome
    this.cognome = cognome
  }
}
class Arbitro extends Persona {
  constructor(nome, cognome, nTesserino) {
    super(nome, cognome)
    this.nTesserino = nTesserino
  }
}
class Giocatore extends Persona {
  constructor(nome, cognome, posizione) {
    super(nome, cognome)
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
    super(nome, cognome)
  }
  impostaSquadra(squadra) {
    this.squadra = squadra
  }

  convocaGiocatori() {}
}
class Dirigente extends Persona {
  constructor(nome, cognome, grado, squadra) {
    super(nome, cognome)
    this.grado = grado
    this.squadra = squadra
  }
  cambiaAllenatore(allenatore) {
    //Quando cambio l'allenatore automaticamente esonero l'allenatore attuale impostando la fine del suo periodo da allenatore
    this.squadra.allenatori[this.squadra.allenatori.length - 1].impostaTermine(
      new Date(Date.now()),
    )
    //Inserisco il nuovo allenatore aggiuggendolo all'array di allenatori e imposto l'attuale squadra al nuovo allenatore
    this.squadra.allenatori.push(
      new PeriodoAllenatore(new Date(Date.now()), allenatore),
    )
    this.squadra.allenatori[
      this.squadra.allenatori.length - 1
    ].impostaSquadra = this.squadra
  }
  compraGiocatore(id) {
    for (let i = 0; i < giocatori.length; i++) {
      if (giocatori[i].id === id && giocatori[i].squadra !== this.squadra) {
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
class Partita {}

function leggiGiocatori() {
  fetch('API/GiocatoriSerieA.json')
    .then(function (response) {
      return response.json()
    })
    .then(function (products) {
      let placeholder = document.querySelector('#data-output')
      let out = ''
      for (let product of products) {
        giocatori.push(
          new Giocatore(product.Nome, product.Cognome, product.Ruolo),
        )
        for (let i = 0; i < squadre.length; i++) {
          if (squadre[i].Nome === product.Squadra) {
            giocatori[giocatori.length - 1].impostaSquadra(squadre[i])
            break
          }
        }
      }
    })
}
