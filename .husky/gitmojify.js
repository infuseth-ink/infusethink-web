#!/usr/bin/env node
'use strict'
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const czrc = JSON.parse(readFileSync(resolve(__dirname, '../.czrc'), 'utf8'))
const { types } = czrc.config.commitizenEmoji

/** type name → grapheme emoji, e.g. "feat" → "✨" */
const nameToEmoji = Object.fromEntries(types.map((t) => [t.name, t.emoji]))

/**
 * Prefixes that are allowed as-is without a gitmoji (passed through silently).
 * Mirrors cz-conventional-gitmoji's `allowed_prefixes` concept.
 */
const ALLOWED_PREFIXES = ['Merge', 'Revert', 'Initial commit']

/**
 * Prefixes to normalise to lowercase conventional format before processing.
 * e.g. "WIP: something" → "wip: something"
 * Mirrors cz-conventional-gitmoji's `convert_prefixes` concept.
 */
const CONVERT_PREFIXES = ['WIP']

// ---------------------------------------------------------------------------
// Helpers (ported from mojify.py)
// ---------------------------------------------------------------------------

/** Strip comment lines and stop at the git scissor line. */
function filterComments(message) {
  const lines = []
  for (const line of message.split('\n')) {
    if (line.includes('# ------------------------ >8 ------------------------')) break
    if (!line.startsWith('#')) lines.push(line)
  }
  return lines.join('\n')
}

/** Normalise convert_prefixes (e.g. "WIP: foo" → "wip: foo"). */
function normaliseConvertPrefixes(message) {
  const firstWord = message.split(/\s+/, 1)[0]
  const bare = firstWord.endsWith(':') ? firstWord.slice(0, -1) : firstWord
  if (CONVERT_PREFIXES.includes(bare)) {
    const rest = message.slice(firstWord.length).trimStart()
    return `${bare.toLowerCase()}: ${rest}`
  }
  return message
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const [, , msgFile, source] = process.argv

// Git provides the whole message for merge/squash/template sources — leave them alone.
if (source === 'merge' || source === 'squash' || source === 'commit') process.exit(0)

const raw = readFileSync(msgFile, 'utf8')
let msg = filterComments(raw).trim()

if (!msg) process.exit(0)

// Pass allowed prefixes through untouched
if (ALLOWED_PREFIXES.some((p) => msg.startsWith(p))) process.exit(0)

// Normalise convert prefixes
msg = normaliseConvertPrefixes(msg)

// Conventional commit pattern — type is the first capture group
// Matches: type(scope)!: subject  |  type!: subject  |  type: subject
const CONV_RE = /^([a-z][a-z-]*)(?:\([^)]*\))?!?:/

const match = msg.match(CONV_RE)
if (!match) process.exit(0)

const typeName = match[1]

// If the "type" contains a space or an emoji the message is already gitmojified
// (mirrors Python's `if " " in gtype: return message`)
if (/\s/.test(typeName) || /\p{Extended_Pictographic}/u.test(typeName)) process.exit(0)

const emoji = nameToEmoji[typeName]
if (!emoji) process.exit(0)

// Prepend emoji and rewrite the file (preserve the original trailing content)
writeFileSync(msgFile, `${emoji} ${msg}\n`)
