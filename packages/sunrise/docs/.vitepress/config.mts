import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "sunrise",
  description: "一个使用esbuild进行本地开发，使用Rollup打包的库, 包含了一些常用的工具函数，主要是使用在浏览器环境",
  lang: 'zh-CN',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'api', link: '/new' }
    ],
    outline: {
      label: '本页目录',
    },

    sidebar: [
      {
        items: [
          { text: '浏览器函数', link: '/new' },
          // { text: 'Node函数', link: '/node' },
          { text: '工具函数', link: '/utils' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Sunrisies/firefly' }
    ]
  }
})
