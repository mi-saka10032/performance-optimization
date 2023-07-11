---
theme: seriph
background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-xs
highlighter: shiki
lineNumbers: false
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
drawings:
  persist: false
transition: slide-left
title: Welcome to Slidev
---

# 前端性能优化分享

客户端访问交互优化全链路

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Let's begin <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/mi-saka10032/performance-optimization" target="_blank" alt="GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---
clicks: 9
---

# 界面交互优化

个人理解：包含从输入网址访问、页面渲染到用户操作界面交互整个人机交互的优化过程。

<v-clicks>

- 📝 **1. 应用层进行 DNS 解析** - DNS resolution at the application layer
- 🎨 **2. 传输层建立 TCP 连接** - The transport layer establishes a TCP connection
- 🧑‍💻 **3. 应用层生成 HTTP 请求报文** - The application layer generates HTTP requests
- 🤹 **4. 服务器处理请求并响应** - The server processes the request and response
- 🎥 **5. 传输层关闭 TCP 连接** - The transport layer closes the TCP connection
- 📤 **6. 浏览器解析 HTML** - Browsers parse HTML
- 📤 **7. 浏览器布局渲染** - Browser layout and rendering
- 📤 **8. 浏览器发送嵌入请求** - Browsers send an embedded request
- 📤 **9. 浏览器发送异步请求** - Browsers send asynchronous requests

</v-clicks>

<br>

<!--
You can have `style` tag in markdown to override the style for the current page.
Learn more: https://sli.dev/guide/syntax#embedded-styles
-->

<ul class="text-xs">
<li v-click-hide="2" v-click="1">
输入 URL 后，最先执行的是 DNS 解析，通过 DNS 将域名解析成 IP 地址。在解析过程中，按照 浏览器缓存、系统缓存、路由器缓存、DNS 缓存、根域名服务器、顶级域名服务器、主域名服务器（域名采取递归查询）的顺序，逐步读取缓存，直到拿到 IP 地址。
</li>
<li v-click-hide="3" v-click="2">
HTTP 协议是使用 TCP 协议作为其传输层协议的，在拿到服务器的 IP 地址后，浏览器客户端会与 服务器建立 TCP 连接。该过程包括三次握手。
<img
  class="absolute top-75 right-25 w-80 opacity-75"
  src="https://misaka10032.oss-cn-chengdu.aliyuncs.com/performance/tcp-three.png"
/>
</li>
<li v-click-hide="4" v-click="3">
接着，应用层生成针对目标 WEB 服务器的 HTTP 请求报文，HTTP 请求报文包括起始行、首部和主体部分。
<pre class="text-xs">
Host: www.google.com
Connection: keep-alive
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
X-Client-Data: CKm1yQEIhbbJAQijtskBCMG2yQEIqZ3KAQioo8oB
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
</pre>
</li>
<li v-click-hide="5" v-click="4">
服务器端收到请求后的由 web 服务器（准确说应该是 http 服务器）处理请求，诸如 Apache、Nginx、IIS 等。web 服务器解析用户请求，知道了需要调度哪些资源文件，再通过相应的这些资源文件处理 用户请求和参数，并调用数据库信息，最后将结果通过 web 服务器返回给浏览器客户端。
<img
  class="absolute top-90 left-70 w-80 opacity-75"
  src="https://misaka10032.oss-cn-chengdu.aliyuncs.com/performance/server.png"
/>
</li>
<li v-click-hide="6" v-click="5">
为了避免服务器与客户端双方的资源占用和损耗，当双方没有请求或响应传递时，任意一方都可以发起关闭请求。

建立一个连接需要三次握手，而终止一个连接要经过四次挥手，这是由 TCP 的半关闭（half-close）造成的。
<img
  class="absolute top-80 right-0 w-80 opacity-75"
  src="https://misaka10032.oss-cn-chengdu.aliyuncs.com/performance/tcp-four.png"
/>

</li>
<li v-click-hide="7" v-click="6">
浏览器接受到 http 服务器发送过来的响应报文，并开始解析 html 文档，渲染页面。
具体的渲染过程包括：构建 DOM 树、构建渲染树、定位页面元素、绘制页面元素等。
<img
  class="absolute top-95 right-80 w-80 opacity-75"
  src="https://misaka10032.oss-cn-chengdu.aliyuncs.com/performance/html-render.png"
/>
</li>
<li v-click-hide="8" v-click="7">
根据渲染树布局，计算 CSS 样式，即每个节点在页面中的大小和位置等几何信息。HTML 默认是流式布局的，CSS 和 js 会打破这种布局，改变 DOM 的外观样式以及大小和位置。这时就要提到两个重要概念：repaint 和 reflow

- repaint：重绘，屏幕的一部分重画，不影响整体布局，比如某个 CSS 的背景色变了，但元素的几何尺寸和位置不变
- reflow：重排，意味着元件的几何尺寸变了，我们需要重新验证并计算渲染树。是渲染树的一部分或全部发生了变化
</li>
<li v-click-hide="9" v-click="8">
随着浏览器渲染 HTML，浏览器会注意到有些标签需要请求其他 URLs 的资源，浏览器将会发送一个 GET 请求来重新获取每个文件 。比如 js 文件，css 文件，图片资源等。每个 URLs 会像获取 HTML 页面的过程一样获取相应资源。所以，浏览器会在 DNS 中查询域名，并向 URL 发送请求，进行重定向。

```html
<link rel="preload" href="image.png" />
<link ref="stylesheet" href="/index.css" />
<script src="/app.js"></script>
```

</li>
<li v-click-hide="10" v-click="9">
到浏览器的内容已经加载完毕后，即触发 window.onload 后，一般会触发代码中 ajax 请求的逻辑，这时客户端会再次向服务端发起一次通信。
</li>
</ul>

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}

.slidev-vclick-hidden {
  display: none;
}
</style>

<!--
Here is another comment.
-->

---

## URL 加载可优化阶段

<v-clicks>

- 1. DNS 解析 -> 建立 TCP 连接 -> 生成请求报文，速度或效率取决于客户端-服务端的网络速度
- 2. 服务端处理请求生成响应数据的速度，取决于服务器的响应速度
- 3. 服务器通过 TCP 连接返回给客户端信息 -> 关闭 TCP 连接，速度或效率取决于服务端-客户端的网络速度
- 4. 浏览器解析 HTML 文档 -> 同步解析 HTML 树和 CSS 树 -> HTML 树解析阻塞 JS 脚本生成 DOM 树 -> 生成渲染树 -> 生成渲染层
- 5. HTML 页面内部的嵌入标签、脚本发送 GET 请求获取文件资源
- 6. 浏览器发送异步 AJAX 请求
- **除了 1 和 3 受网速影响外，2、4、5、6 均有可优化之处**

</v-clicks>

---

## 服务器响应

以常用的 web 服务器 nginx 为例，提高响应速度可以采取负载均衡的方法。

<div grid="~ cols-2 gap-2" m="-t-2">

<h4>默认轮询</h4>

<h4>加权轮询</h4>

<p>以下是每个请求按时间顺序逐一分配到不同服务器的默认轮询配置</p>

<p>以下是设置了主从权值的加权轮询</p>

```
# constPolling 作为存放负载均衡的变量
upstream constPolling {
    server localhost:10001;
    server localhost:10002;
}
server {
    listen 10000;
    server_name localhost;
    location / {
    proxy_pass http://constPolling; # 反向代理接入constPolling
    proxy_redirect default;
    }
}
```

```
# constPolling 作为存放负载均衡的变量
upstream constPolling {
    server localhost:10001 weight=1;
    server localhost:10002 weight=2;
}
server {
    listen 10000;
    server_name localhost;
    location / {
    proxy_pass http://constPolling; # 反向代理接入constPolling
    proxy_redirect default;
    }
}
```

</div>

---

## 浏览器解析

浏览器解析 HTML 文档时，JS 脚本的执行会严重阻塞渲染的执行，需要遵循以下原则：

1. CSS 优先：引入顺序上，CSS 资源先于 JS 资源
2. JS 置后：JS 通常放到页面底部，且JS 尽量少影响 DOM 构建

**这一手段，现代的构建工具(webpack、rollup)在build时自动地适用这一原则**

<div grid="~ cols-2 gap-2" m="-t-2">

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="app.js"></script>
  <link rel="stylesheet" href="index.css">
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="index.css">
</head>
<body>
  <div id="root"></div>
  <script src="app.js"></script>
</body>
</html>
```

</div>

<div>
<carbon:close-outline class="absolute left-75 bottom-42" />
<carbon:checkmark-outline class="absolute right-55 bottom-24" />
</div>

---
class: text-xs
---

## 浏览器布局

浏览器首次加载布局时，生成渲染树和渲染层时，必定会经历重绘(repaint)和重排(reflow)，这些过程是非常消耗性能的，尤其在移动设备上，它会造成用户体验，有时会造成页面卡顿，所以我们应尽可能减少 reflow 和 repaint

<div grid="~ cols-2 gap-2" m="-t-2">

<div>

## 减少reflow

reflow 是不可避免的，只能将 reflow 对性能的影响见到最小

1. 减少不必要的 DOM 层级
2. 避免使用 table 布局，因为 table 内的细微改动会触发 table 的 reflow
3. 尽量让动画效果元素的 position 属性脱离文档流（脱离渲染树）
4. 避免逐条修改 DOM 样式，最好预定义好 class，修改对应节点的 className
5. 避免逐条操作 DOM 节点，可以这样做：
   1. 使用 documentFragment 在内存中操作 DOM
   2. 操作 DOM 为display: none，做完所有修改后再回显
   3. clone 一个 DOM 节点到内存中，做完修改再交换
6. 请求如下值：offsetTop, offsetLeft, offsetWidth, offsetHeight，scrollTop/Left/Width/Height，clientTop/Left/Width/Height，这些 layout 属性会让浏览器 reflow，建议合并到一起执行操作，减少 reflow 次数

</div>

<div>

## 减少 repaint

repaint 发生在元素的可见性发生变化时如背景色、前景色等，所以引发 repaint 不一定引发 reflow，repaint 对浏览器执行渲染的影响相对小一点

减少 reflow 的次数其实也就是减少了 repaint 的次数

**减少单纯的 repaint 的方法就是避免逐条修改 DOM 样式，多采用预定义 class 最后修改根节点的 className 的方式**

</div>

</div>

---
class: px-12
---

## 嵌入式静态资源

浏览器 HTML 文档内需要获取资源的标签会让浏览器发送 GET 请求去获取资源。这里不考虑获取 JS 资源的情况，仅讨论静态资源

虽然静态资源从获取、返回到展示到标签元素中这个过程并不影响其他元素的展示，但如果等到 HTML 内容都加载完了，图片、视频资源还迟迟没有加载出来，用户体验也是很糟糕的

处理方案分三点：加快下载速度、减小文件体积、减少请求数量。具体实现详见后续的【性能指标优化】

---

## 异步请求时机

ajax 请求虽然是异步的，但返回值回填 html 触发 reflow 和 repaint 是不可避免的

如果页面加载尚未完成就发送请求，请求返回后如果页面如果还没加载完成，势必会再次 reflow，滞后页面加载完成时间

所以应该尽量确保页面加载渲染完成后再发送请求

对于大部分前端框架而言，应采取的方案是：

**在组件生命周期 mounted 中调用 ajax 请求（代价则是用户在ajax获取完整数据前可能还需要面对更长的一小段loading时间）**

---
class: text-xs
---

# 性能指标优化

用户最关注、影响最大的是FCP、FID，影响用户体验的是 CLS

**FCP（First Contentful Paint）：首次内容渲染**

表示浏览器渲染出第一个内容的时间。这个内容可以是文本、图片或 SVG 等，不包括 iframe 和白色背景的 canvas

简而言之就是**首屏时间**

**FID（First Input Delay）：首次输入延迟**

FID 测量从用户第一次与页面交互（例如当他们单击链接、点按按钮或使用 JS 控件）直到浏览器对交互作出响应，并实际能够开始处理事件处理程序所经过的时间

简而言之就是**首次可操作时间**

**CLS（Cumulative Layout Shift）：累积布局偏移**

CLS 是测量视觉稳定性的一个以用户为中心的重要指标。CLS 测量整个页面生命周期内发生的所有意外布局偏移中最大一连串的布局偏移分数，通常指一些嵌入式广告、文本闪烁、动态注入的内容等

简而言之就是**页面布局稳定性**

---
class: text-xs
---

## 性能监测

<div grid="~ cols-3 gap-3" m="-t-3">

<div>

**Performance**：评估页面的内存使用情况，分析页面的响应时间和交互时间，以帮助开发人员更好地了解和改进网站性能。

<img src="/assets/performance.png">

</div>

<div>

**Lighthouse**：Chrome开源的自动化工具，提供可量化的性能指标，并提供精确的网站性能改进建议。

Lighthouse使用方法1：F12使用

Lighthouse使用方法2：

```shell
# 全局安装 lighthouse
npm install -g lighthouse

# 输入测试命令
npx lighthouse '你需要测试的url地址' --locale zh --quiet --chrome-flags="--headless"  --only-categories=performance  --preset=desktop
# 等待一段时间后会在当前目录生成报告
```

优点：速度快、性能报告较为精准

缺点：受个人电脑配置、网络速度等主观因素影响多

</div>

<div>

**阿里云/腾讯云前端性能监控**：一站式前端监控解决方案，涵盖了日志上报，错误监控，性能监控，资源测速等功能。

可以看作**最终解决方案**

</div>

</div>

---
class: text-xs
---

## 指标优化

### FCP优化

1. 所有初始化用不到的 js 文件全部走异步加载（defer 或 async），需要走 cdn 的第三方插件放到页面底部（防止页面对 html 和 css 解析阻塞）
2. js 拆包，打包工具将异步代码拆包，保证每个路由只加载当前路由对应的 js 代码
3. 优化文件大小，打包工具自动执行代码压缩
4. 优化项目结构，在保证可维护性的基础上，尽量减少初始化组件的加载数量
5. 网络协议层面的优化，gzip、cdn 等。gzip 可以由打包工具执行压缩，服务器开启配置即可
6. 应用层协议优化，采用域名分片技术突破 6 个 TCP 连接限制或采用 HTTP2

**提高 FCP 的核心理念：减少初始化视图内容，减少初始化下载资源大小，避免 js 阻塞**

**关键词：splitChunks、gzip、externals、minicss、路由懒加载**

<div grid="~ cols-4 gap-4" m="-t-4">

<img src="/assets/debugger-delete.png">

<img src="/assets/gzip.png">

<img src="/assets/split-chunks.png">

<img src="/assets/externals.png">

</div>

---
class: text-xs
---

## 指标优化

### LCP优化

1. 本地图片使用在线压缩工具进行压缩
2. 压缩图片、视频，转换格式，使用图像 CDN
3. 资源预加载，给予特定资源`<link rel="preload" href="img.png">`的标签来预先获取资源。注意这些资源优先级不能高于关键的 css、js 等资源
4. 图片懒加载

**关键词：preload、lazyload、sprite(精灵图)**

---
class: text-xs
---

## 指标优化

### SI优化

衍生指标SI(Speed Index)：速度指数

衡量页面加载期间内容的视觉显示速度，或者是可见填充速度。只要提高LCP和FCP，SI时间就会有显著提高。

1. 压缩减小 js 的执行
2. 降低样式计算复杂度、避免复杂布局和扰动
3. 使用 web workers后台线程

其他指标参数的优化基本相似，都是围绕减小体积、减少执行时间、降低复杂度、减少请求数量等手段展开的。

---
layout: end
---

<h1><em>Thanks</em></h1>