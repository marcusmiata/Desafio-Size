class RegisterForm {
  elements = {
    empresaInput: () => cy.get('#empresa'),
    cnpjInput: () => cy.get('#cnpj'),
    faturamentoInput: () => cy.get('#faturamento'),
    selectRamo: () => cy.get('#mui-component-select-ramo'),
    produtoOption: () => cy.get('#«r7» > [tabindex="0"]'),
    button: () => cy.get('form > .MuiButtonBase-root'),
    message: () => cy.get('.MuiAlert-message')
  }

  buttonClick() {
    this.elements.button().click()
  }

  //Completa os campos correspondentes
  typeCnpj(number) {
    if (!number) return
    this.elements.cnpjInput().type(number)
  }

  typeFaturamento(number) {
    if (!number) return
    this.elements.faturamentoInput().clear() //Limpa o valor padrão
    this.elements.faturamentoInput().type(number)
  }

  typeEmpresa(nome) {
    if (!nome) return
    this.elements.empresaInput().type(nome)
  }

  //Para selecionar algo no select
  clickSelect() {
    this.elements.selectRamo().click()
  }
  clickProduto() {
    this.elements.produtoOption().click()
  }
}

class LoginForm {
  elements = {
    cnpjInput: () => cy.get('input[name="cnpj"]').should('exist').and('be.visible'),
    ramoInput: () => cy.get('#mui-component-select-ramo'),
    button: () => cy.get('button[type="submit"]'),
    form: () => cy.get('form'),
    message: () => cy.get('.MuiAlert-message'),
    cadastroButton: () => cy.get('form > a')
  }

  typeCnpj(number) {
    if (!number) return
    this.elements.cnpjInput().type(number)
  }

  clickSubmit() {
    this.elements.button().click()
  }

  clickCadastro() {
    this.elements.cadastroButton().click()
  }
}

const registerForm = new RegisterForm()
const loginForm = new LoginForm()

describe('Cadastrando um CNPJ mas deixando campos sem preecher', () => {
  const input = {
    nome: 'Empresa cypress',
    cnpj: '66666666666666',
    faturamento: '10000'
  }
  beforeEach(() => {
    cy.viewport('iphone-x')
  })
  it('Quando clicar no botao/link de cadastro', () => {
    cy.visit('/')
    loginForm.clickCadastro()
  })
  it('Usuário redirecionado para página de cadastro', () => {
    cy.url().should('include', '/cadastrarEmpresa')
  })
  it('Quando eu clicar no botão de enviar sem colocar nenhum dado', () => {
    registerForm.buttonClick()
  })
  if('Não será possível concluir, pois o input do nome é obrigatório', () => {
    registerForm.elements.empresaInput().should('have.attr', 'required')
  })
  it(`Quando eu inserir "${input.nome}" no nome`, () => {
    registerForm.typeEmpresa(input.nome)
  })
  it('Quando eu tenta registrar a empresa apenas com o nome', () => {
    registerForm.buttonClick()
  })
  it('Não será possível prosseguir, pois o input de cnpj é obrigatório', () => {
    registerForm.elements.cnpjInput().should('have.attr', 'required')
  })
  it(`Quando eu inserir "${input.cnpj}" no cnpj`, () => {
    registerForm.typeCnpj(input.cnpj)
  })
  it('Quando eu tentar inserir um valor de faturamento menor que 1000', () =>{
    registerForm.typeFaturamento('200')
    registerForm.buttonClick()
  })
  it('Irei receber a informação do faturamento minimo para se cadastrar', () => {
    registerForm.elements.message().should('have.text', 'O faturamento minímo para se cadastrar é R$1000,00')
  })
  it(`Quando eu colocar "${input.faturamento} no faturamento"`, () => {
    registerForm.typeFaturamento(input.faturamento)
  })
  it('Quando eu tentar enviar sem escolher um ramo', () => {
    registerForm.buttonClick()
  })
  it('Irei receber a informação que o campo ramo é obrigatório', () => {
    registerForm.elements.message().should('have.text', 'O ramo também precisa ser escolhido')
  })
  it('Quando eu selecionar o ramo', () => {
    registerForm.clickSelect()
    registerForm.clickProduto()
  })
  it('Quando eu me cadastrar', () => {
    registerForm.buttonClick()
  })
  it('Serei redirecionado para tela de login', () => {
    loginForm.elements.message().should('contain', input.nome)
  })
})