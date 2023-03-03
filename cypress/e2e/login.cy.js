/// <reference types="cypress" />

const perfil = require('../fixtures/perfil.json')

context('Funcionalidade Login', () =>{

    beforeEach ( () => {
        cy.visit('minha-conta')        
    });

    afterEach ( () => {
        cy.screenshot()
    });

    it ('Deve fazer login com sucesso', () => {
        
        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac (não é aluno_ebac? Sair)')
    })

    it('Deve fazer login com sucesso - Usando arquivo de dados', () => {
        
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')

    });

    it.only('Deve fazer login com sucesso - Usando fixture', () => {
        
        cy.fixture('perfil').then(dados => { 
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha)
            cy.get('.woocommerce-form > .button').click()
            cy.get('.page-title').should('contain', 'Minha conta')
        })

    });

    it ('deve exibir uma mensagem de erro ao inserir usuario invalido', () => {
                cy.get('#username').type('aluno_ebac@teste')
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error > li').should('contain', 'Erro: o usuário aluno_ebac@teste não está cadastrado neste site.')
    })

    it ('deve exibir uma mensagem de erro ao inserir senha invalida', () => {
        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('#password').type('teste@teste')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error > li').should('contain', 'Erro: a senha fornecida para o e-mail aluno_ebac@teste.com está incorreta. Perdeu a senha?')
    })
})