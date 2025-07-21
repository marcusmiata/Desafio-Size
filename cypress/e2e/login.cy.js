class LoginForm {
  elements = {
    cnpjInput: () => cy.get('input[name="cnpj"]').should('exist').and('be.visible'),
    ramoInput: () => cy.get('#mui-component-select-ramo'),
    button: () => cy.get('button[type="submit"]'),
    form: () => cy.get('form'),
    message: () => cy.get('.MuiAlert-message'),
    cadastroButton: () => cy.get('p > a')
  }

  typeCnpj(number){
    if(!number) return
    this.elements.cnpjInput().type(number)
  }

  clickSubmit(){
    this.elements.button().click()
  }

  clickCadastro(){
    this.elements.cadastroButton().click()
  }
}

class RegisterForm{
  elements = {  
    empresaInput: () => cy.get('#empresa'),
    cnpjInput: () => cy.get('#cnpj'),
    faturamentoInput: () => cy.get('#faturamento'),
    selectRamo: () => cy.get('#mui-component-select-ramo'),
    produtoOption: () => cy.get('#«r7» > [tabindex="0"]'),
    button: () => cy.get('form > .MuiButtonBase-root')
  }

  buttonClick(){
    this.elements.button().click()
  }

  typeCnpj(number){
    if(!number) return
    this.elements.cnpjInput().type(number)
  }

  typeFaturamento(number){
    if(!number) return
    this.elements.faturamentoInput().clear()
    this.elements.faturamentoInput().type(number)
  }

  typeEmpresa(nome){
    if(!nome) return
    this.elements.empresaInput().type(nome)
  }

  clickSelect(){
    this.elements.selectRamo().click()
  }
  clickProduto(){
    this.elements.produtoOption().click()
  }
}

const loginForm = new LoginForm()
const registerForm = new RegisterForm()

beforeEach(() => {
    cy.viewport('iphone-x')
})

describe('Submetendo um cnpj menor doq o padrão', () => {
    const input = {
      cnpj: '2222'
    }
    it(`Quando eu inserir "${input.cnpj}"`, () => {
      cy.visit('/')
      loginForm.typeCnpj(input.cnpj)
    })
    it('Quando eu clico no botao de entrar', () => {
      loginForm.clickSubmit()
    })
    it('Recebo a mensagem de erro', () => {
      loginForm.elements.message().should('have.text', 'Formato CNPJ inválido')
    })
})

describe('Submetendo um cnpj não cadastrado', () => {
    const input = {
      cnpj: '55555555555555'
    }
    it(`Quando eu inserir "${input.cnpj}"`, () => {
      cy.visit('/')
      loginForm.typeCnpj(input.cnpj)
    })
    it('Quando eu clico no botao de entrar', () => {
      loginForm.clickSubmit()
    })
    it('Recebo a mensagem de erro', () => {
      loginForm.elements.message().should('have.text', 'Empresa deste CNPJ não está cadastrada')
    })
})

describe('Entrando no CNPJ cadastrado', () => {
  const input = '666666666666666'
  it(`Inserir (${input}) recém cadastrado`, () => {
    loginForm.typeCnpj(input)
  })
  it('Clicar para entrar', () => {
    loginForm.clickSubmit()
  })
  it('Deve ser redirecionado para cadastro de nota', () => {
    cy.url().should('contain', 'cadastrarNfe')
  })
  it('Deve ter armazenado os dados do usuário', () => {
    cy.window().its('localStorage.user').should('exist')
  })
})
