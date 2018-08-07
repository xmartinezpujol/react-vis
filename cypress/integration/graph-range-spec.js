// Login
context('Login with email', () => {
  beforeEach(() => {
    // Visiting our app before each test removes any state build up from
    // previous tests. Visiting acts as if we closed a tab and opened a fresh one.
  });
  describe('with valid Admin user', () => {
    it('should open a modal on login start', () => {
      cy.visit(Cypress.env('host'));

      // Be sure to start logged out, sometimes it has some cache
      if (Cypress.$('#profile-b').length) {
        // Logout
        cy.get('#profile-b').click();
        cy.wait(500);
        cy.get('.dropdown-menu').find('li.divider').next().click();
        cy.get('#login-b').should('exist').and('be.visible');
        cy.get('#profile-b').should('not.exist');
      }

      cy.get('#login-b').click();
      cy.get('#exampleModals')
        .should('be.visible');
    });
    it('let you login with email', () => {
      cy.get('#web_login').find('button[icon="paper-plane"]').click();

      // Email
      cy.get('input[name="email"]').type(credentials.valid.email);
      cy.get('button[type="grad_social"]').click();
      cy.wait(2000);
      // Test back and forth
      cy.get('button[icon="ArrowLeft"]').click();
      cy.wait(2000);
      cy.get('button[type="grad_social"]').click();

      // Forgot Password
      cy.get('input[name="password"]').parent().next().should('be.visible');

      // Password
      cy.get('input[name="password"]').type(credentials.valid.password);
      cy.get('button[type="grad_social"]').click();

      cy.get('#exampleModals').find('button.close').click();
      cy.get('#login-b').should('not.exist');
      cy.get('#profile-b').should('exist').and('be.visible');

      // Logout
      cy.get('#profile-b').click();
      cy.wait(500);
      cy.get('.dropdown-menu').find('li.divider').next().click();
      cy.get('#login-b').should('exist').and('be.visible');
      cy.get('#profile-b').should('not.exist');
    });
  });

  describe('with new user', () => {
    it('should open a modal on login start', () => {
      cy.visit(Cypress.env('host'));
      cy.get('#login-b').click();
      cy.get('#exampleModals')
        .should('be.visible');
    });
    it('should ask for a new password', () => {
      cy.get('#web_login').find('button[icon="paper-plane"]').click();
      cy.get('input[name="email"]').type(credentials.invalid.email);
      cy.get('button[type="grad_social"]').click();
      cy.get('input[name="password"]').type(credentials.invalid.password);
      cy.get('button[type="grad_social"]').click();
    });
    it('should ask for full name', () => {
      cy.get('input[name="firstname"]').type('John');
      cy.get('input[name="lastname"]').type('Doe');
      cy.get('button[type="grad_social"]').click();

      cy.get('#exampleModals').find('button.close').click();
      cy.get('#login-b').should('not.exist');
      cy.get('#profile-b').should('exist').and('be.visible');

      // Logout
      cy.get('#profile-b').click();
      cy.wait(500);
      cy.get('.dropdown-menu').find('li.divider').next().click();
      cy.get('#login-b').should('exist').and('be.visible');
      cy.get('#profile-b').should('not.exist');
    });
  });
});

