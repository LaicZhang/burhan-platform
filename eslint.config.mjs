// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Project has pre-existing patterns; keep lint green without mass refactors
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': 'off',
    'vue/no-v-html': 'off',
    'vue/attributes-order': 'warn',
    'vue/first-attribute-linebreak': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
    }],
    'no-unused-vars': 'off',
  },
})
