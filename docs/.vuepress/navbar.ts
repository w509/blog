import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '文章', link: '/blog/' },
  //{ text: '标签', link: '/tags/' },
  { text: '归档', link: '/archives/' },
  { text: '分类', link: '/categories/' },
  {
    text: '笔记',
    items: [
      { text: 'STM32', link: '/notes/STM32/README.md', icon: 'ph:info-light' },
      { text: 'MaixPy', link: '/notes/MaixPy/README.md' },
    ]
  },
])
