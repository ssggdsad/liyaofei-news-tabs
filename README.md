# 实验六：新闻选项卡

## 打开方式
双击本目录 index.html；或用 VS Code 打开本目录，通过 Live Server 运行。
index.html、styles.css、tabs.js 必须保持在同一个目录。

## 文件职责
- index.html：四类新闻标签与各自五条课堂演示内容。
- styles.css：仿课堂测试/6 的灰色边框、横排标签和列表样式。
- tabs.js：事件监听、清除旧选中态、选中当前标签、切换内容；默认国内新闻。

## 复用方式
另建带 data-lyf-tabs 属性的容器，内部标签用 data-lyf-tab，内容用 data-lyf-panel。
每个标签的 aria-controls 必须与相应面板 id 相同；面板的 aria-labelledby 指向标签 id。
所有 id 在整页唯一。加载时自动初始化，动态新增容器可调用 lyf_initTabs(容器元素)。
实例之间互不影响，重复初始化不会重复绑定监听器。

## 检查清单
- [x] 四个标签顺序为国内新闻、省内新闻、国际新闻、最热新闻。
- [x] 初始只选中国内新闻并显示对应内容。
- [x] 点击任何标签，旧选中态移除，只显示当前内容。
- [x] 重复点击、方向键、Home/End 均可正常操作。
- [x] HTML 外部引用 CSS、JS；没有第三方依赖。
- [x] 1280px、390px、320px 宽度无横向溢出。
- [x] 两个实例互不影响；浏览器无 JavaScript 错误。
- [x] 实际浏览器自动化 17 项通过，桌面及手机截图已检查。

## 发布目标
- GitHub 仓库：https://github.com/ssggdsad/liyaofei-news-tabs
- GitHub Pages：https://ssggdsad.github.io/liyaofei-news-tabs/
- 分支 main，发布目录为根目录；实际上线状态以 Pages 部署和网页访问结果为准。

新闻标题仅为课堂演示内容，不表示实际发生的新闻；不访问实时新闻接口。
本次不使用 Trae，不覆盖已有作业，不更改现有 Gitee origin。
