/// <reference types="cypress" />

describe("movie-list", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:3000");
  });

  it("should display data after search", () => {
    // We'll store our item text in a variable so we can reuse it
    const searchItem = "Pardes";
    cy.get(".cy-search-field").type(`${searchItem}{enter}`);
    cy.get(".cy-search-results-title").should(
      "have.text",
      `Search results for "${searchItem}"`
    );
    cy.get(".cy-list-button").first().should("have.text", "Nominate");
    cy.get(".cy-movie-title").first().should("have.length.gte", 1);
    cy.get(".cy-movie-year").first().should("have.length.gte", 1);
  });

  it("should disable nominate button after nominating the movie", () => {
    // We'll store our item text in a variable so we can reuse it
    const searchItem = "Pardes";
    cy.get(".cy-search-field").type(`${searchItem}{enter}`);
    cy.get(".cy-list-button").first().click();
    cy.get(".cy-list-button").should("be.disabled");
  });
});
