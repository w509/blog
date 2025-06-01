---
title: VScode C++ 环境搭建
createTime: 2020/07/23 22:49:18
---

# 准备工作

首先装好 VScode，相信没什么问题，装好 C++插件（搜索出来第一个就是）

然后点击 [这个链接](https://sourceforge.net/projects/mingw-w64/files/)

下拉，在最新版本号下找到「x86_64-posix-seh」

鉴于国内网络问题（懂得都懂），直接下载这个免安装版本

创建一个你要放代码文件的文件夹，比如我的叫做「C++」

将下载后的文件解压到这个文件夹里

点进mingw64，点进bin

然后复制绝对路径

win10 下有快捷键 「win+q」，输入 path，弹出「编辑系统环境变量」

点进去，点击下方环境变量

弹出的页面，上方为用户变量，下方为系统变量，选择系统变量中的「Path」

点击新建，把你刚刚复制路径的粘贴进去

一路确定，这样你就完成了 mingw64 编译器和调试器的环境配置

试验一下，「win+R」输入「powershell」，回车，在弹出的框框中输入「g++ -v」

弹出只需要注意最后一行就行，若成功将显示版本号，即「gcc version...」

恭喜你，搭建的环境是没问题的

现在，重启 VScode，因为没重启 json 文件的配置会莫名其妙出锅

# json 文件

首先记好打开命令面板的快捷键「ctrl+shift+P」或是「F1」，后面我们会经常用到

在放代码的文件夹下新建一个 cpp 文件

复制以下代码（当然，想自己写一个也没问题，随便写个能运行的就行）

```c++
#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main()
{
    vector<string> msg {"Hello", "C++", "World", "from", "VS Code", "and the C++ extension!"};

    for (const string& word : msg)
    {
        cout << word << " ";
    }
    cout << endl;
}
```

点击 F5，弹出如下图

![](https://gitee.com/w509git/image/raw/master/20200724112652.png)

分别选择如图所示的选项

一通运行后，生成了「.vscode」文件夹，包含「tasks.json」及「launch.json」两个文件

以上，需运行的 json 文件配置完毕，每次打完代码后直接 F5 即可

另外推荐插件 code-runner，编译运行都比较快

至于还有一个 settings.json，可以选择不配置

本文参考 [官方doc](https://code.visualstudio.com/docs/cpp/config-mingw)

只是翻译及简化