import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const STM32Note = defineNoteConfig({
  dir: 'STM32',
  link: '/STM32',
  sidebar: 'auto',
})

const opencvNote = defineNoteConfig({
  dir: 'opencv',
  link: '/opencv',
  sidebar: 'auto',
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [STM32Note, opencvNote],
})
