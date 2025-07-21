beforeEach(() => {
    cy.viewport('iphone-x')
})

class CarrinhoInputs{
  elements = {
    button:() => cy.get('.MuiButton-containedPrimary'),
    modal: () => cy.get('.MuiDialog-paper'),
    buttonAcept: () => cy.get('.MuiButton-containedSuccess'),
    alert: () => cy.get('main > .MuiPaper-root'),
    abrirMenu: () => cy.get('.MuiIconButton-root'),
    sair: () => cy.get('.MuiListItem-padding > .MuiButtonBase-root'),
    menu: () => cy.get('.MuiDrawer-root > .MuiPaper-root')
  }

  simular(){
    this.elements.button().click()
  }

  finalizar(){
    this.elements.buttonAcept().click()
  }

  abrirMenu(){
    this.elements.abrirMenu().click()
  }

  logout(){
    this.elements.sair().click()
  }
}

const carrinhoInputs = new CarrinhoInputs()

describe('Quando o usuário conseguir simular o que recebe', () => {
  it('Quando eu clicar no botão simular', () => {
    cy.visit('/carrinho')
    cy.wait(1000) //Espera carregar os pedidos
    carrinhoInputs.simular()
  })
  it('Irá aparecer o modal informando o valor que o usuário pode ganhar', () => {
    carrinhoInputs.elements.modal().should('exist')
  })
  it('Quando eu clicar em aceitar', () => {
    carrinhoInputs.finalizar()
  })
  it('Irá esvaziar o carrinho', () => {
    carrinhoInputs.elements.alert().should('have.text', 'Carrinho esvaziado')
  })
  it('Quando clicar para abrir o menu lateral', () => {
    carrinhoInputs.abrirMenu()
  })
  it('Quando clicar para sair', () => {
    carrinhoInputs.logout()
  })
  it('Todos localStorage são excluidos', () => {
    cy.window().its('localStorage.user').should('not.exist')
    cy.window().its('localStorage.id').should('not.exist')
  })
})