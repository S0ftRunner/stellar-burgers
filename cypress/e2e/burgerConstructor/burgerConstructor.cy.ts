

describe('Проверяем доступность приложения', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients' });
    cy.visit('http://localhost:4000/');
  });


  it('Ингредиенты доступны для выбора', () => {
    cy.get('[data-ingredient="bun"]').should('have.length.at.least', 1);
  })

});
