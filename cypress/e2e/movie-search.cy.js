/// <reference types="cypress" />

describe('movie search', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:3000')
    });
  
    it('displays movie title on the card', () => {
      cy.get('.cy-title').should('have.text', 'Movie title')
    });
  
    it('should have no nominations initially', () => {
        cy.get('.cy-no-nominations').should('have.text', 'No nominations made yet!')
    });

    it('can enter search string in the input field', () => {
      // We'll store our item text in a variable so we can reuse it
      const searchItem = 'Pardes'
  
      // Let's get the input element and use the `type` command to
      // input our new list item. After typing the content of our item,
      // we need to type the enter key as well in order to submit the input.
      // This input has a data-test attribute so we'll use that to select the
      // element in accordance with best practices:
      // https://on.cypress.io/selecting-elements
      cy.get('.cy-search-field').type(`${searchItem}{enter}`);
      cy.get('.cy-search-results-title').should('have.text', `Search results for "${searchItem}"`)
    });
  })
  