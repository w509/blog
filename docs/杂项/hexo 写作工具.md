---
title: hexo 写作工具
createTime: 2020/04/17 22:24:34
---

## HexoEditor

推荐一个可以编写 markdown 的一个软件 「HexoEditor」

相比于同类 markdown 编辑器它其实没有优势

不过它对 Hexo 编写支持极其友好，一个右键菜单可以代替完成一系列操作

还有对图像的支持，支持截图粘贴在文章中，并且生成本地文件

也可以直接上传图床生成外链并且替换本地链接

详见 [HexoEditor](https://github.com/zhuzhuyule/HexoEditor)

虽说从 2018 年起就再没更新过了，不过依然好用

---

## Visual Studio Code

不得不说 VScode 作为编辑器，在码代码方面表现出色，在编写 markdown 方面同样不逊色

于是经过 HexoEditor 的启发后，我想直接使用 VScode 来实现类似于 HexoEditor 的功能

### Markdown Paste

相比于同类插件 Paste Image ，Markdown Paste 这款插件有更强大的扩展性

这两个插件都可以实现在编写文章时直接插入剪贴板中的图片，并且在本地对应目录下生成相应图片

关于配置方法自行摸索

详见 [Markdown Paste](https://marketplace.visualstudio.com/items?itemName=telesoho.vscode-markdown-paste-image)

### PicGo

详见 [PicGo](https://marketplace.visualstudio.com/items?itemName=Spades.vs-picgo)

PicGo 能够上传图片获得外链

而强大的 VScode 有一款 PicGo 插件，支持良好

直接安装，默认图床是 SM.MS

如果你需要使用其他图床，可以参考PicGo文档

可以实现自动上传剪贴板图片并生成 markdown 格式的链接并插入于你正在编写的部分

客户端的体验同样很优秀

[GitHub地址](https://github.com/Molunerfinn/PicGo)

[指南](https://picgo.github.io/PicGo-Doc/)

### vscode-hexo-utils

同类 hexo 插件中，我比较推荐这个

体验还是非常优秀的

可以实现面板操作，持续更新

详情[vscode-hexo-utils](https://marketplace.visualstudio.com/items?itemName=fantasy.vscode-hexo-utils)

### VScode task.json

---

2020/5/1 更新，详情请见下方的[「小更新」](#小更新-针对-tasks-的使用)

---

以下是原文

尽管插件可以满足新建文章等操作，但是快捷本地部署等还是不能实现

作为一个蒟蒻，对于这种简单问题总是想得很复杂

最终想出这个解决方案

在 VScode 中打开命令面板，然后可以搜索「Configure Task（配置任务）」，之后的选项随便打开一个，然后用下面代码替换

```json
{
	"version": "2.0.0",
	"tasks": [
		{
			"label": "Server",
			"type": "shell",
			"command": "hexo clean ; hexo g ; Start-Process -FilePath http://localhost:4000 ; hexo s",
            "presentation": {
                "reveal": "never"
            }
		},
		{
			"label": "Deploy",
			"type": "shell",
			"command": "hexo clean ; hexo g ; hexo d",
            "presentation": {
                "reveal": "never"
            }
		}
	]
}
```

「presentation」是为了在运行时不自动弹出终端，不过依然可以打开终端看到运行结果

「label」是这两个任务的名称，爱怎么取怎么取

如果需要更多任务可以自行添加

Server中的「Start-Process -FilePath http://localhost:4000」

这条命令作用是直接使用默认浏览器打开本地博客页面

若把这个命令放在「hexo s」后，由于 server 服务还没停下来，不会运行后面语句，于是得先运行这个

下次想要部署或是打开本地服务？直接快捷键 `命令面板 > 运行任务（Run Task）`，然后就可选择了

当然我们可以绑定任务快捷键

类似这样

```json
[
    {
        "key": "ctrl+h s",
        "command": "workbench.action.tasks.runTask",
        "args": "Server",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+h d",
        "command": "workbench.action.tasks.runTask",
        "args": "Deploy",
        "when": "editorTextFocus"
    }
]
```

附上我的键绑定，初始化完成时没有 args 参数的，需要自己添加，需要和上面的 tasks.json 中 label 命名相同

其实可以复制我的代码，再自己修改参数 key 即可

### 小更新 (针对 tasks 的使用)

由于我给出的方案中打开浏览器的命令必须是在 powershell 下才可以执行

所以有点小麻烦出现了，这两个服务是不同终端下运行的

Deploy 用 bash，而 Start-Process 语句又不能用 bash 跑

这就很鸡肋，得不断换默认终端

于是换套方案

在根目录新建一个 「Deploy.sh」 来完成部署，「.sh」是 bash 的可执行文件

在里面写入如下

```
hexo clean
hexo g
hexo d
```

保存

然后修改一下 tasks.json 文件

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Server",
            "type": "shell",
            "command": "hexo clean ; hexo g ; Start-Process -FilePath http://localhost:4000 ; hexo s",
            "presentation": {
                "reveal": "never"
            }
        },
        {
            "label": "Deploy",
            "type": "shell",
            "windows":{
                "command": "C:/博客路径/Deploy.sh"
            },
            "presentation": {
                "reveal": "never"
            }
        }
    ]
}
```

注意将路径改为自己的

这样设置默认终端为 powershell 即可

以上