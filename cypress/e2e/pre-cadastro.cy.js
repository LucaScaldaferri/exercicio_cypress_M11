/// <reference types="cypress" />
var faker = require('faker');

describe('Deve completar o pré cadastro com sucesso', () => {

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('Deve completar o pré-cadastro com sucesso', () => {
       let nomeFaker = faker.name.firstName()
       let sobrenomeFaker = faker.name.lastName()
       let emailFaker = faker.internet.email()

        cy.get('#reg_email').type(emailFaker)
        cy.get('#reg_password').type('!teste@test')
        cy.get(':nth-child(4) > .button').click()

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nomeFaker)
        cy.get('#account_last_name').type(sobrenomeFaker)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
    });

    it('Deve completar o pré-cadastro com sucesso usando Comandos customizados', () => {
        let emailFaker2 = faker.internet.email()
        cy.preCadastro(emailFaker2, 'senha!@#forte', 'Fábio', 'Araújo')
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
    });

});