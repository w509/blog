import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const STM32 = defineNoteConfig({
  dir: 'STM32',
  link: '/STM32',
  sidebar: 'auto',
})

const MaixPy = defineNoteConfig({
  dir: 'MaixPy',
  link: '/MaixPy',
  sidebar: 'auto',
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [STM32, MaixPy],
})
