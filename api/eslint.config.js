const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  extends: ['../../eslint.config.js'],
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        // Your custom rules here
      },
    },
  ],
});
