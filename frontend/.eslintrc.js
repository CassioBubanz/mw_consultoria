module.exports = {
    extends: ['react-app', 'eslint:recommended'], // Mantém a configuração do CRA
    rules: {
      'react-hooks/exhaustive-deps': 'warn', // Altere de erro para aviso
      'no-unused-vars': 'warn', // Altere para aviso em vez de erro
    },
  };
  