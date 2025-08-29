import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/', icon: 'mdi:home' },
  { text: '文章', link: '/blog/', icon: 'material-symbols:article' },
  //{ text: '标签', link: '/tags/' },
  { text: '归档', link: '/archives/', icon: 'material-symbols:archive' },
  { text: '分类', link: '/categories/', icon: 'quill:sort' },
  {
    text: '笔记',
    icon: 'material-symbols:edit-note',
    items: [
      { text: 'STM32', link: '/notes/STM32/README.md', icon: 'codicon:chip' },
      { text: 'MaixPy', link: '/notes/MaixPy/README.md', icon: 'mdi:eye' },
      { text: '嵌入式C语言', link: '/notes/EmbeddedC/README.md', icon: 'streamline-logos:c-language-logo-solid' },
    ]
  },
])
