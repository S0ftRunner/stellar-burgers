import * as orderFixture from '../../fixtures/order.json';

const DATA_INGREDIENT_BUN = '[data-ingredient="bun"]';
const DATA_INGREDIENT_BUN_WITH_PSEUDOCLASS = '[data-ingredient="bun"]:first-of-type';
const MODAL = '#modals';
const DATA_ORDER_BUTTON = '[data-order-button]';

describe('Тест конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('/');
  });

  it('Список ингредиентов доступен для выбора', () => {
    cy.get(DATA_INGREDIENT_BUN).should('have.length.at.least', 1);
    cy.get('[data-ingredient="main"],[data-ingredient="sauce"]').should(
      'have.length.at.least',
      1
    );
  });

  describe('Проверка работы модальных окон описаний ингредиентов', () => {
    describe('Проверка открытия модальных окон', () => {
      it('Базовое открытие по карточке ингредиента', () => {
        cy.get(DATA_INGREDIENT_BUN_WITH_PSEUDOCLASS).click();
        cy.get(MODAL).children().should('have.length', 2);
      });

      it('Модальное окно с ингредиентом будет открыто после перезагрузки страницы', () => {
        cy.get(DATA_INGREDIENT_BUN_WITH_PSEUDOCLASS).click();
        cy.reload(true);
        cy.get(MODAL).children().should('have.length', 2);
      });
    });

    describe('Проверка закрытия модальных окон', () => {
      it('Через нажатие на крестик', () => {
        cy.get(DATA_INGREDIENT_BUN_WITH_PSEUDOCLASS).click();
        cy.get(`${MODAL} button:first-of-type`).click();
        cy.wait(500);
        cy.get(MODAL).children().should('have.length', 0);
      });

      it('Через нажатие на оверлей', () => {
        cy.get(DATA_INGREDIENT_BUN_WITH_PSEUDOCLASS).click();
        cy.get(`${MODAL}>div:nth-of-type(2)`).click({ force: true });
        cy.wait(500);
        cy.get(MODAL).children().should('have.length', 0);
      });

      it('Через нажатие на Escape', () => {
        cy.get(DATA_INGREDIENT_BUN_WITH_PSEUDOCLASS).click();
        cy.get('body').type('{esc}');
        cy.wait(500);
        cy.get(MODAL).children().should('have.length', 0);
      });
    });
  });

  describe('Процесс оформления заказа', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');

      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });

      cy.visit('/');
    });

    it('Базовая процедура оформления ПОСЛЕ авторизации', () => {
      // Проверка работы конструктора, по умолчанию он отключен пока не будет выбрана хотя бы 1 ингредиент и булка
      cy.get(DATA_ORDER_BUTTON).should('be.disabled');
      cy.get('[data-ingredient="bun"]:first-of-type button').click();
      cy.get(DATA_ORDER_BUTTON).should('be.disabled');
      cy.get('[data-ingredient="main"]:first-of-type button').click();
      cy.get(DATA_ORDER_BUTTON).should('be.enabled');

      // Нажатие на саму кнопку оформления заказа
      cy.get(DATA_ORDER_BUTTON).click();

      cy.intercept('POST', 'api/orders', (req) => {
        expect(req.body).to.deep.equal(orderFixture);
      });

      // После успешной отправки данных на сервер должно быть открыто модальное окно с оформлением заказа
      cy.get(MODAL).children().should('have.length', 2);

      // Новое модальное окно должно содержать тестовый номер заказа
      cy.get(`${MODAL} h2:first-of-type`).should(
        'have.text',
        orderFixture.order.number
      );

      cy.get(DATA_ORDER_BUTTON).should('be.disabled');
    });

    afterEach(() => {
      // Очистка токенов
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});