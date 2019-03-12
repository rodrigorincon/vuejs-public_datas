export class Ubs {
  defaultObj () {
    this.vlr_latitude = null
    this.vlr_longitude = null
    this.cod_munic = null
    this.cod_cnes = null
    this.nom_estab = ''
    this.dsc_endereco = ''
    this.dsc_bairro = ''
    this.dsc_cidade = ''
    this.dsc_telefone = null
    this.dsc_estrut_fisic_ambiencia = null
    this.dsc_adap_defic_fisic_idosos = null
    this.dsc_equipamentos = null
    this.dsc_medicamentos = null
    this.isSaved = false
  }
  constructor (rawObj) {
    if (arguments.length) {
      this.vlr_latitude = rawObj.vlr_latitude ? rawObj.vlr_latitude : null
      this.vlr_longitude = rawObj.vlr_longitude ? rawObj.vlr_longitude : null
      this.cod_munic = rawObj.cod_munic ? rawObj.cod_munic : null
      this.cod_cnes = rawObj.cod_cnes ? rawObj.cod_cnes : null
      this.nom_estab = rawObj.nom_estab ? rawObj.nom_estab : ''
      this.dsc_endereco = rawObj.dsc_endereco ? rawObj.dsc_endereco : ''
      this.dsc_bairro = rawObj.dsc_bairro ? rawObj.dsc_bairro : ''
      this.dsc_cidade = rawObj.dsc_cidade ? rawObj.dsc_cidade : ''
      this.dsc_telefone = rawObj.dsc_telefone ? rawObj.dsc_telefone : null
      this.dsc_estrut_fisic_ambiencia = rawObj.dsc_estrut_fisic_ambiencia ? rawObj.dsc_estrut_fisic_ambiencia : null
      this.dsc_adap_defic_fisic_idosos = rawObj.dsc_adap_defic_fisic_idosos ? rawObj.dsc_adap_defic_fisic_idosos : null
      this.dsc_equipamentos = rawObj.dsc_equipamentos ? rawObj.dsc_equipamentos : null
      this.dsc_medicamentos = rawObj.dsc_medicamentos ? rawObj.dsc_medicamentos : null
      this.isSaved = this.verifyStorage()
    } else {
      this.defaultObj()
    }
  }
  endereco () {
    var myAddress = ''
    if (this.dsc_endereco) {
      myAddress += this.dsc_endereco
    }
    if (this.dsc_bairro) {
      if (myAddress.length) {
        myAddress += ', '
      }
      myAddress += this.dsc_bairro
    }
    if (this.dsc_cidade) {
      if (myAddress.length) {
        myAddress += ', '
      }
      myAddress += this.dsc_cidade
    }
    return myAddress
  }
  position () {
    return { lat: Number(this.vlr_latitude), lng: Number(this.vlr_longitude) }
  }
  formatPhone () {
    var phone = this.dsc_telefone
    if (phone === null || phone.length !== 10) { // quando o valor é "nao se aplica"
      return 'Não possui número de telefone cadastrado'
    }
    return '(' + phone.substr(0, 2) + ') ' + phone.substr(2, 4) + '-' + phone.substr(6)
  }
  verifyStorage () {
    return localStorage.getItem(this.cod_cnes) !== null
  }
  changeFavorite () {
    if (this.isSaved) {
      localStorage.removeItem(this.cod_cnes)
      this.isSaved = false
    } else {
      localStorage.setItem(this.cod_cnes, JSON.stringify(this))
      this.isSaved = true
    }
  }
}
