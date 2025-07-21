beforeEach(() => {
    cy.viewport('iphone-x')
})

class NotaForm {
  elements = {
    numeroInput: () => cy.get('#numero'),
    valorInput: () => cy.get('#valor'),
    button: () => cy.get('form > .MuiButton-root'),
    dataInput: () => cy.get('[data-testid="CalendarIcon"]'),
    diaInput: () => cy.get('[data-timestamp="1753844400000"]'),
    menu: () => cy.get('.MuiIconButton-root'),
    opcaoMemu: () => cy.get(':nth-child(1) > ._itemList_1ccov_21 > .MuiListItemText-root > .MuiTypography-root'),
    aviso: () => cy.get('.MuiAlert-colorWarning'),
    notaAlta: () => cy.get(':nth-child(2) > .MuiCardActions-root > .MuiButtonBase-root'),
    notaAltaContainer: () => cy.get('._containerNotas_9s7j5_37 > :nth-child(2)'),
    alertaSucesso: () => cy.get('.MuiAlert-colorSuccess')
  }

  typeNumero(number){
    if(!number) return
    this.elements.numeroInput().type(number)
  }

  typeValor(valor){
    if(!valor) return
    this.elements.valorInput().type(valor) 
  }

  submit(){
    this.elements.button().click()
  }

  escolheData(){
    this.elements.dataInput().click() //Clica no icone do calendario
    this.elements.diaInput().click() //Escolhe uma data especifica
  }

  abreMenu(){
    this.elements.menu().click()
  }

  cadastrarNova(){
    this.elements.opcaoMemu().click()
  }

  removerNota(){
    this.elements.notaAlta().click()
  }
}

const notaForm = new NotaForm()

describe('Tentando Cadastrar uma nova nota', () => {
  const input = {
    numero: '151515',
    valor: '2000'
  }
  it('Quando eu tento enviar sem colocar o numero', () => {
    cy.visit('/cadastrarNfe')
    notaForm.submit()
  })
  it('Não deve ser possível pois numero é obrigatório', () => {
    notaForm.elements.numeroInput().should('have.attr', 'required')
  })
  it(`Quando eu adicionar o numero: ${input.numero}`, () => {
    notaForm.typeNumero(input.numero)
  })
  it('Quando eu tento enviar sem colocar o valor', () => {
    notaForm.submit()
  })
  it('Não deve ser possível, pois valor é obrigatório', () => {
    notaForm.elements.valorInput().should('have.attr', 'required')
  })
  it(`Quando eu inserir: ${input.valor} em valor` , () => {
    notaForm.typeValor(input.valor)
  })
  it('Quando eu selecionar uma data', () => {
    notaForm.escolheData()
  })
  it('Quando eu cadastrar a nota', () => {
    notaForm.submit()
  })
  it('Serei redirecionado para carrinho', () => {
    cy.url().should('contain', '/carrinho')
  })
  it('Id do pedido deve ser salvo no localStorage', ()=>{
    cy.window().its('localStorage.id').should('exist')
  })
})

describe('Adicionando outra nota para o carrinho', () => {
  it('Quando clicar para abrir o menu lateral', () => {
    cy.wait(1000)
    notaForm.abreMenu()
  })
  it('Quando eu clicar em cadastrar nova nota', () => {
    notaForm.cadastrarNova()
  })
  it('Devo ser redirecionado para adionar nova nota', () => {
    cy.url().should('contain', '/cadastrarNfe')
  })
  it('Quando eu preencher novamente o formulario, com um valor maior que o meu limite', () => {
    notaForm.typeNumero('222222')
    notaForm.typeValor('30000')
    notaForm.escolheData()
  })
  it('Quando eu enviar, devo ser redirecionado denovo para carrinho', () => {
    notaForm.submit()
  })
  it('Serei redirecionado denovo para o carrinho', () => {
    cy.url().should('contain', '/carrinho')
  })
  it('Mas terá um aviso pedindo para eu tirar uma nota', () => {
    notaForm.elements.aviso().should('have.text', 'Você ultrapassou seu limite para antecipação, por favor remova alguma nota fiscal')
  })  
})

describe('Remover a nota que estourou o limite', () => {
  it('Quando eu clicar no botao de remover a nota de "30000"', () => {
    notaForm.removerNota()
  })
  it('Ela deve sair dos card', () => {
    notaForm.elements.notaAltaContainer().should('not.exist')
  })
  it('E aparecer um alerta informando a remoção', () => {
    notaForm.elements.alertaSucesso().should('have.text', 'Sucesso ao remover nota')
  })
})