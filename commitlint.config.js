const { readFileSync } = require('fs')
const { resolve } = require('path')
const czrc = JSON.parse(readFileSync(resolve(__dirname, '.czrc'), 'utf8'))

const { types } = czrc.config.commitizenEmoji

// e.g. "✨ feat", "🐛 fix" — single source of truth from .czrc
const typeEnum = types.map((t) => `${t.emoji} ${t.name}`)

// Matches: "✨ feat(scope): subject" or "✨ feat: subject" or "✨ feat!: subject"
const headerPattern = new RegExp(
  `^(${typeEnum.join('|')})(?:\\((.*)\\))?!?:\\s(.*)$`
)

module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  rules: {
    'type-enum': [2, 'always', typeEnum],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
  },
}
