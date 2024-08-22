'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('states', [
      { id: 1, name: 'Acre', uf: 'AC' },
      { id: 2, name: 'Alagoas', uf: 'AL' },
      { id: 3, name: 'Amazonas', uf: 'AM' },
      { id: 4, name: 'Amapá', uf: 'AP' },
      { id: 5, name: 'Bahia', uf: 'BA' },
      { id: 6, name: 'Ceará', uf: 'CE' },
      { id: 7, name: 'Distrito Federal', uf: 'DF' },
      { id: 8, name: 'Espírito Santo', uf: 'ES' },
      { id: 9, name: 'Goiás', uf: 'GO' },
      { id: 10, name: 'Maranhão', uf: 'MA' },
      { id: 11, name: 'Minas Gerais', uf: 'MG' },
      { id: 12, name: 'Mato Grosso do Sul', uf: 'MS' },
      { id: 13, name: 'Mato Grosso', uf: 'MT' },
      { id: 14, name: 'Pará', uf: 'PA' },
      { id: 15, name: 'Paraíba', uf: 'PB' },
      { id: 16, name: 'Pernambuco', uf: 'PE' },
      { id: 17, name: 'Piauí', uf: 'PI' },
      { id: 18, name: 'Paraná', uf: 'PR' },
      { id: 19, name: 'Rio de Janeiro', uf: 'RJ' },
      { id: 20, name: 'Rio Grande do Norte', uf: 'RN' },
      { id: 21, name: 'Rondônia', uf: 'RO' },
      { id: 22, name: 'Roraima', uf: 'RR' },
      { id: 23, name: 'Rio Grande do Sul', uf: 'RS' },
      { id: 24, name: 'Santa Catarina', uf: 'SC' },
      { id: 25, name: 'Sergipe', uf: 'SE' },
      { id: 26, name: 'São Paulo', uf: 'SP' },
      { id: 27, name: 'Tocantins', uf: 'TO' }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('states', null, {});
  }
};
