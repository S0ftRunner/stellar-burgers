import * as orderFixture from '../../fixtures/order.json';

describe('Проверяем доступность приложения', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('/');
  });

  it('Ингредиенты доступны для выбора', () => {
    cy.get('[data-ingredient="bun"]').should('have.length.at.least', 1);
    cy.get('[data-ingredient="bun"], ["data-ingredient="sauce"]').should(
      'have.length.at.least',
      1
    );
  });

  describe('Проверка работы модальных окон', () => {
    describe('Открытие модального окна', () => {
      it('Открытие карточки ингредиента', () => {
        cy.get('[data-ingredient="bun"]:first-of-type').click();
        cy.get('#modals').children().should('have.length', 2);
      });
    });

    describe('Проверка закрытия модальных окон', () => {
      it('Нажатие на крестик: ', () => {
        cy.get('[data-ingredients="bun"]:first-of-type').click();
        cy.get('#modals button:first-of-type').click();
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });
    });
  });
});
