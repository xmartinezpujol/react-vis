// Login
context('Graph - Range plans prices', () => {
  beforeEach(() => {
    // Visiting our app before each test removes any state build up from
    // previous tests. Visiting acts as if we closed a tab and opened a fresh one.
  });
  describe('with a Victory Bars graph', () => {
    it('should render 3 plans', () => {
      cy.visit(Cypress.env('host'));
    });
  });
});
