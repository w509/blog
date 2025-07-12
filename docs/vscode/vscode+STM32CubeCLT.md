---
title: vscode+STM32CubeCLT
createTime: 2025/06/16 22:00:00
---

## 前言

久闻 clangd 的智能补全功能非常强大，很好奇和 C/C++ 插件的差异

偶然刷到一个视频对比速度，发现 clangd 的速度比 C/C++ 插件快很多，尤其是大型项目

用 CubeMX 生成的项目怎么不算大呢，于是我尝试了一下，发现确实快得多，回头看 C/C++ 的提示速度简直和便秘一样

## 准备

### Clangd

就是为了这醋包的饺子，怎么能少了这个呢

在 VSCode 中安装 `clangd` 插件，安装后会自动下载 clangd 的二进制文件（从 github 上下载，如果网络环境不佳自行解决）

或者可以自行到 github 上[下载](https://github.com/clangd/clangd/releases)，无脑最新版本即可

将下载下来的 bin 文件夹的路径添加到环境变量，然后到 clangd 插件的设置里直接配置 path 为 `clangd.exe` 即可

当然，也可以不添加环境变量，配置 `clangd.exe` 的绝对路径到插件设置里

记得关掉 vscode 重开，不然扫不到路径

### STM32CubeCLT

STM32CubeCLT 的[官方描述](https://www.st.com.cn/zh/development-tools/stm32cubeclt.html)是这样的：
:::card
Toolset for third-party integrated development environment (IDE) providers, allowing the use of STMicroelectronics proprietary tools within their own IDE frameworks
:::

不必理会，下拉直接下载最新的 `STM32CubeCLT-Win` 即可

它提供一个 exe，直接安装到想要安装的目录下即可，会自动配置环境变量，省去我们配置的麻烦

它提供了我们所需的 `cmake + ninja + arm-none-eabi` 等工具，能直接帮我们完成所有编译需要的环境配置

