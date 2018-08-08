context('Graph - Range plans prices', () => {
  beforeEach(() => {
    // Visiting our app before each test removes any state build up from
    // previous tests. Visiting acts as if we closed a tab and opened a fresh one.
  });
  describe('with a Victory Bars graph', () => {
    it('should render 1 VictoryContainer', () => {
      cy.visit(`${Cypress.env('host')}/ranges`);
      cy.get('.VictoryContainer')
        .should('be.visible')
        .and('have.length', 1);
    });
    it('should render 3 plans', () => {
      cy.get('[data-cy=axis-y]').first().find('[data-cy=axis-y]')
        .should('be.visible')
        .and('have.length', 3);
    });
    it('should render 24 hours', () => {
      cy.get('[data-cy=axis-x]').first().find('[data-cy=axis-x]')
        .should('be.visible')
        .and('have.length', 24);
    });
    it('should render 5 types of Bars', () => {
      cy.get('[data-cy=bars]').find('[data-cy=range-bar]')
        .should('be.visible')
        .and('have.length', 5);
    });
  });
});
