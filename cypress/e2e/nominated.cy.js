/// <reference types="cypress" />

describe("movie-list", () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit("http://localhost:3000");
    });
  
    it("remove the nominated movie", () => {
      // We'll store our item text in a variable so we can reuse it
      const searchItem = "Pardes";
      cy.get(".cy-search-field").type(`${searchItem}{enter}`);
      cy.get(".cy-list-button").first().click();
      cy.get(".cy-list-button").should("be.disabled");
      cy.get(".cy-nominations-card .cy-list-button").first().should("have.text", "Remove");
      cy.get(".cy-nominations-card .cy-list-button").first().click();
      cy.get(".cy-no-nominations").should("have.text", "No nominations made yet!");
      cy.get(".cy-list-button").first().should("be.enabled");
    });
  });
  