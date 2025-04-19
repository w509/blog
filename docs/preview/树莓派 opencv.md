---
title: 树莓派 opencv
createTime: 2025/04/18 19:41:37
---

# 前言

本文使用树莓派4B，刷入的是 Bullseye 系统（2024.10.22版本），为什么不刷最新的 Bookworm 的原因是在实际部署了之后发现其使用 OV5647 的时候出现各式各样的 bug。而 Bullseye 的 `raspi-config` 依然存在的摄像头命令可以直接启用而不需要搞奇奇怪怪的配置。

笔者会在本文中记录踩坑过程，希望能够提供参考。

# 树莓派系统刷入

刷入 2024.10.22 更新的 Bullseye 镜像，使用官方镜像烧录器可以免去第一次登陆修改密码或是配置 wifi 等操作，推荐使用，具体刷入过程不赘述。

# 配置

## ssh 连接

登上路由器，固定树莓派的 ip 地址

若是之前 ssh 连接过之前的系统，那么需要删除 ssh 的配置避免报错

```shell
ssh-keygen -R “192.168.3.200”   #删除之前的配置
ssh pi@192.168.3.200            #连接
```

反正是自用系统，不必过多担心安全性问题，直接以 root 身份登录

```bash
sudo -i           # root 身份
passwd root       # 设置 root 密码
passwd -u root    # 解锁以 root 登录
```

接下来我们需要修改 `/etc/ssh/sshd_config` 文件

```vim
LoginGraceTime 2m修改为0            # ssh 未登录的可超时时间
PermitRootLogin 值修改为yes         # 允许 root 登录
……
TCPKeepAlive 去除注释修改为yes      # ssh 服务器保持连接
……
ClientAliveInterval 值修改为60      # ssh 每分钟发送一次活动请求，可以保活
ClientAliveCountMax 值修改为1000    # 1000次发送请求无响应就关闭连接，就是更改为一个很大的数字让 ssh 保持连接
```

我个人习惯用 vim，可以用`/`很快捷的查找到这几行

这几行的作用基本都是为了保持 ssh 一直连接，更改这几行可以减少很多奇怪的问题，包括服务器开机后 ssh 长时间不连接，之后再想连接被拒绝

## apt

接下来是 apt 的配置，首先是换源，这里使用清华源

[Debian](https://mirrors.tuna.tsinghua.edu.cn/help/debian/)    [Raspberry](https://mirrors.tuna.tsinghua.edu.cn/help/raspberrypi/)

因为树莓派系统是以 Debian 为基础的，所以换源需要同时换 Debian 的文件

注意我们使用的是 Bullseye 镜像，需要把源换为 Bullseye 版本

同时我会勾上`强制安全更新使用镜像`以追求更快的速度，这个看个人喜好

接下来就是常规的更新，下载环节

```bash
apt update
apt install aptitude -y
```

我推荐使用 aptitude，它提供了更好的软件包管理和更优化的命令行图形界面，使用方式也与 apt 一致

## 修改欢迎页信息

参考 [这篇文章](https://www.cnblogs.com/azureology/p/14051040.html)

新建 `/etc/update-motd.d/11-info`，写入以下内容

```vim
#!/bin/sh
uptime | awk '{printf("\nCPU Load: %.2f\t", $(NF-2))}'
free -m | awk 'NR==2{printf("Mem: %s/%sMB %.2f%%\n", $3,$2,$3*100/$2)}'
cat /sys/class/thermal/thermal_zone0/temp|awk '{printf("CPU Temp: %.2f\t",$1/1000)}'
df -h | awk '$NF=="/"{printf "Disk: %.1f/%.1fGB %s\n\n", $3,$2,$5}'
```

而后给权限，取消原始的欢迎信息
```bash
chmod 777 /etc/update-motd.d/11-info
mv /etc/motd /etc/motd.sample
```

欢迎信息就简洁显示温度等信息了

## 摄像头和 VNC

利用 `raspi-config` 可以轻松完成许多配置，打开摄像头、VNC，以及设置中文

Bookworm 系统删除了打开摄像头的配置，而转为自动识别，导致我手头的 OV5647 无法识别到，而需要更改 `/boot/firmware/config.txt` 文件（在 Bullseye 及之前版本系统中是`/boot/config.txt`）

在 Bullseye 中打开摄像头后，连接 VNC 后会无法显示，出现`Cannot currently show the desktop`，找了很多资料都在改分辨率，实际上这里需要更改`/boot/config.txt`

```vim
hdmi_force_hotplug=1      # 强制启用HDMI输出
```

取消这行的注释，重启后 VNC 即可正常连接

使用 `vcgencmd get_camera` 查看摄像头启用状态

这里需要注意，这是笔者在配置过程中遇到的最大的坑点，直到我找到了 [这篇文章](https://blog.csdn.net/bert20010524/article/details/132393260)

不要使用 `libcamera-hello` 去调用摄像头，会报错说未识别摄像头等，而实际上你可以直接使用 opencv 去调用摄像头

而当你在 `config.txt` 中加入 `dtoverlay=ov5647` 后，`libcamera-hello` 可能还是会报错，同时 opencv 也没法调用摄像头了

所以仅需开启 `raspi-config` 中的配置即可

## opencv

可以使用 `aptitude install python3-opencv` 安装 opencv，也可以使用 `pip`

``` bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple    #设置镜像
pip install opencv-python
```

至此配置完成