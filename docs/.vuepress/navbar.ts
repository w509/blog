/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/', icon: 'mdi:home' },
  { text: '文章', link: '/blog/', icon: 'material-symbols:article' },
  // { text: '标签', link: '/blog/tags/' },
  { text: '归档', link: '/blog/archives/', icon: 'material-symbols:archive' },
  { text: '分类', link: '/blog/categories/', icon: 'quill:sort' },
  {
    text: '笔记',
    icon: 'material-symbols:edit-note',
    items: [
      { text: 'STM32', link: '/STM32/README.md', icon: 'codicon:chip' },
      { text: 'MaixPy', link: '/MaixPy/README.md', icon: 'mdi:eye' },
      { text: '嵌入式C语言', link: '/EmbeddedC/README.md', icon: 'streamline-logos:c-language-logo-solid' },
    ]
  },
])
