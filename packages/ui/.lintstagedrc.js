module.exports = {
  '*.{js,ts,tsx}': [() => 'turbo lint', 'prettier --write', () => 'tsc --noEmit'],
  'package.json': [() => 'turbo sort-package-json'],
}
