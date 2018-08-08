context('Graph - Stacked plans prices', () => {
  beforeEach(() => {
    // Visiting our app before each test removes any state build up from
    // previous tests. Visiting acts as if we closed a tab and opened a fresh one.
  });
  describe('with a Victory Areas graph', () => {
    it('should render 1 VictoryContainer', () => {
      cy.visit(`${Cypress.env('host')}`);
      cy.get('.VictoryContainer')
        .should('be.visible')
        .and('have.length', 1);
    });
    it('should render 9 consumer ratios', () => {
      cy.get('[data-cy=axis-y]').first().find('[data-cy=axis-y]')
        .should('be.visible')
        .and('have.length', 9);
    });
    it('should render 24 hours', () => {
      cy.get('[data-cy=axis-x]').first().find('[data-cy=axis-x]')
        .should('be.visible')
        .and('have.length', 24);
    });
    it('should render 3 types of Areas', () => {
      cy.get('[data-cy=area]')
        .should('be.visible')
        .and('have.length', 3);
    });
    it('should render Unprecio Data', () => {
      cy.get('[data-cy=area-unprecio]')
        .should('be.visible')
        .and('have.length', 1);
    });
    it('should render Dosprecios Data', () => {
      cy.get('[data-cy=area-dosprecios]')
        .should('be.visible')
        .and('have.length', 1);
    });
    it('should render Multiprecio Data', () => {
      cy.get('[data-cy=area-multiprecio]')
        .should('be.visible')
        .and('have.length', 1);
    });
    it('should render a Legend', () => {
      cy.get('[data-cy=legend')
        .should('be.visible')
        .and('have.length', 1);
    });
    it('should render only unprecio & dosprecios when clicking 3.0a', () => {
      // Click 3.0a
      cy.get('[data-cy=legend]').find('text').last().click();

      // Hidden area - 3.0a
      cy.get('[data-cy=area-multiprecio]').find('path').each(path => (
        expect(path).to.have.css('fill-opacity', '0')
      ));

      // Visible areas
      cy.get('[data-cy=area-unprecio]')
        .should('be.visible')
        .and('have.length', 1);
      cy.get('[data-cy=area-dosprecios]')
        .should('be.visible')
        .and('have.length', 1);
    });
    it('should render only unprecio when clicking dosprecios', () => {
      // Click dos precios
      cy.get('[data-cy=legend]').find('text').first().next().next().click();

      // Hidden areas
      cy.get('[data-cy=area-dosprecios]').find('path').each(path => (
        expect(path).to.have.css('fill-opacity', '0')
      ));
      cy.get('[data-cy=area-multiprecio]').find('path').each(path => (
        expect(path).to.have.css('fill-opacity', '0')
      ));

      // Visible areas
      cy.get('[data-cy=area-unprecio]')
        .should('be.visible')
        .and('have.length', 1);
    });
    it('should render no data when clicking unprecio', () => {
      // Click un precio
      cy.get('[data-cy=legend]').find('text').first().next().click();

      // Hidden areas
      cy.get('[data-cy=area-dosprecios]').find('path').each(path => (
        expect(path).to.have.css('fill-opacity', '0')
      ));
      cy.get('[data-cy=area-multiprecio]').find('path').each(path => (
        expect(path).to.have.css('fill-opacity', '0')
      ));
      cy.get('[data-cy=area-unprecio]').find('path').each(path => (
        expect(path).to.have.css('fill-opacity', '0')
      ));
    });
  });
});
