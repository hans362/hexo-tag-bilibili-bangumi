# hexo-tag-bilibili-bangumi

> 📺 Embed real-time Bilibili bangumi progress in Hexo posts or pages

[![](https://img.shields.io/npm/v/hexo-tag-bilibili-bangumi.svg?style=flat-square)](https://www.npmjs.com/package/hexo-tag-bilibili-bangumi)
[![](https://img.shields.io/badge/Author-Hans362-blue.svg?style=flat-square)](https://hans362.cn)
[![](https://img.shields.io/npm/l/hexo-tag-bilibili-bangumi.svg?style=flat-square)](https://github.com/hans362/hexo-tag-bilibili-bangumi/blob/master/LICENSE)

一个专为 Hexo 设计的基于 [Bilibili-Bangumi-JS](https://github.com/hans362/Bilibili-Bangumi-JS) 的 Bilibili 追番进度展示插件。

## 安装

```bash
npm install hexo-tag-bilibili-bangumi --save 
```

## 用法

在需要插入追番进度的文章(post)或独立页面(page)中，使用如下标签即可插入。

```
{% bangumi "key_1=value_1" "key_2=value_2" ... "key_n=value_n" %}
```

其中`key_n=value_n`的键值对表示一个设置项及其对应的值，目前支持的设置项有：

- `apiUrl` - （必填）设置后端域名，包括`https://`和末尾的`/api`（后端的安装请参考[这里](https://github.com/hans362/Bilibili-Bangumi-JS#%E5%90%8E%E7%AB%AF%E5%AE%89%E8%A3%85)）。

- `vmid` - （必填）设置 Bilibili UID，可在个人空间中查看。

示例：

```
{% bangumi "apiUrl=https://bilibili-bangumi-js.vercel.app/api" "vmid=66745436" %}
```

## 进阶

在站点的`config.yml`中，可以对本插件进行更加高级的设置。

```yaml
hexo-tag-bilibili-bangumi:
  # （可选）设置静态资源的默认存放路径（因主题而异）
  js_path: /assets/js/
  css_path: /assets/css/
```

## 感谢❤️

- [hexo-tag-dplayer](https://github.com/MoePlayer/hexo-tag-dplayer) - 提供 Hexo 插件的实现思路和大致框架
