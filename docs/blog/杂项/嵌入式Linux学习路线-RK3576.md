---
title: 学习路线（自用）
createTime: 2026/11/02 15:30:00
permalink: /blog/linux/
---

# 嵌入式 Linux 学习路线（RK3576 / 鲁班猫 3）

> 版本 v1 ｜ 对象：本科 2028 届、光电/电信方向、目标嵌入式软件（Linux 应用为主）
> 依据材料：学长聊天（22 级，现就职星宸）、飞书文档《嵌入式 Linux 学习路线（应用/驱动/内核）》、野火 LubanCat-RK 系列教材
> 时间口径：**全部按里程碑编排，不含"第几周"**。每一层有验收动作，做完才进下一层。

---

## 0. 这份路线怎么用

1. **从上往下走，不要跳层。** 每层开头写"解决什么问题"，如果你已经能独立做到，就直接做验收清单；做不出来的项才是你要学的内容。
2. **验收清单里的每一条都必须"从零做过一遍"。** 跟着教程敲一遍不算——你现在的水位（能刷机、能进系统、板内能编译）就是"跟教程敲过、但没自己从零搭过"的结果。
3. **书是主线，视频只补直觉。** 原因见第 5 节（野火没有系统课，只有零散视频）。
4. **卡住走第 7 节的 SOP，不要问 AI 要代码。** 你已选择"AI 只当词典"。
5. 每层末尾的「面试口径」是这一层学完你必须能**张口说出来**的东西。说不出来 = 没学完。

---

## 1. 起点与目标（诊断）

### 1.1 起点确认（2026-11 现状）

| 项目 | 状态 |
|---|---|
| 板卡 | 野火鲁班猫 3（LubanCat-3，RK3576：4×A72 + 4×A53，6 TOPS NPU，千兆网口/mini-HDMI/USB3.0/mini PCIe/MIPI） |
| 系统 | **野火官方 Debian 镜像**，已刷入、能登录 |
| Linux 使用 | 长期使用，但停留在表层（命令行、包管理、改配置） |
| 能独立做到 | 刷机 → 串口/ssh 进系统 → 板内 `gcc` 编译跑 hello |
| 不会 | 交叉编译、Makefile/CMake、gdb 远程调试、驱动、设备树、系统构建 |
| 其他背景 | C 语言（初高中信息学竞赛）、STM32/单片机、电赛模拟邀请赛国二（模邀）、嵌赛恩智浦赛道国二 |
| 求职目标 | 本科就业，嵌入式软件（Linux 方向），不读研 |
| 关键时间点 | 2027 年春投暑期实习为第一战；2027 年秋招为主战 |

**结论：你缺的不是知识量，是"闭环经验"。** 你做过 MCU 项目、拿过竞赛奖，说明你能动手；但你从没在 Linux 上把"一个东西从零做到能跑"走完一遍。整条路线就是围绕这一件事设计的。

### 1.2 目标岗位画像

学长给的信息（可直接采信，他在行业内）：

- **走 Linux，不走 MCU**："mcu 薪资不高"。
- **不要走"软硬全栈"**："正常公司里面，软硬件分得很清楚"；"我现在硬件板卡要改动一下，跳线什么的，全都是请硬件来干"。
- **硬件只需要"看得懂"**："知道怎么看原理图就行了"；"嵌软研发对硬件没啥需求"。
- **核心要求是链路讲得通**："比如做视频推流，你从 sensor、iic，到驱动到上层 app，一路能给面试官讲清楚，他基本就认可你的"。
- **起薪参考**：Linux 方向 1w2 起步；本科 vs 硕士差 2~5k（瑞芯微偏多）；厦门本科人才补贴 1w、硕士 5w（一次性）。
- **AI**："学的时候尽量少用 ai 调试，不然会错过很多经验"；"面试官……主要关注你在调试时候遇到过什么问题，怎么解决"。

飞书文档的判断（也对，可交叉验证）：

- **"应用方向岗位最多，门槛相对可控；纯 Linux 驱动/内核岗位最少，基本只有芯片原厂，学历要求高。"**
- 策略建议："**先入行，后精通**"。
- 投递节奏："**走到阶段 3 末尾就可以开始投**，边面边补内核。"

### 1.3 我的路线和这两份材料哪里不同（以及为什么）

| 事项 | 飞书文档 | 本路线 | 理由 |
|---|---|---|---|
| 裸机驱动阶段（阶段 3） | 单列一整阶段（正点原子 5~29 章） | **压缩到最小**（只补"寄存器操作 + 自己写 Makefile"） | 你有 STM32/电赛底子，不需要再走一遍裸机外设；时间应花在 Linux 特有的东西上 |
| 项目时机 | 驱动学完（阶段 4）之后 | **提到驱动之前（L3）**，与 L1/L2 并行 | 项目是"问题生成器"；没有项目，驱动章节会变成背书 |
| 内核机制（阶段 5） | 单列一阶段 | **降级为"面试前补"，不做系统学习** | 你走应用主线，内核机制只需要能答八股，不需要读源码 |
| 外设章节 | 书里排在最后 | **提前到 L2（应用视角）** | 你的项目要用，而且它让你先理解"应用与驱动如何握手" |
| 板卡 | i.MX6ULL（正点原子） | RK3576（野火） | 你已有的板子；野火体系完整且贴板子 |
| 时间 | 16 周全职 | 里程碑制、学期内可做 | 你不想被"第几周"绑定 |

---

## 2. 全景图

```
┌─ L0 底座 ─────────────────────────────────────────────┐
│  板内编译 ──► 交叉编译 / Makefile / gdb 远程调试 / NFS    │  ← 你现在卡在这
└───────────────────────────────────────────────────────┘
┌─ L1 应用（主战场）────────────────────────────────────┐
│  文件IO / 进程线程 / IPC / socket / epoll               │
└───────────────────────────────────────────────────────┘
┌─ L2 外设（应用视角）──────────────────────────────────┐
│  sysfs / i2c-tools / input / V4L2  ← 不打驱动也能碰硬件   │
└───────────────────────────────────────────────────────┘
        ┌──────────── 岔路口 ────────────┐
        │  L3 项目切片（边做边学）         │  ← 简历命门
        │  选载体：视频链路（默认）/ 网关 / 小车 │
        └────────────────────────────────┘
┌─ L4 驱动（跟通不求深）────────────────────────────────┐
│  模块 / 字符设备 / platform / 设备树 / 中断 / I2C / SPI  │
└───────────────────────────────────────────────────────┘
┌─ L5 系统构建（BSP 视角）──────────────────────────────┐
│  SDK / 编 kernel / 改 dtb / 出镜像 / 烧录 / 打包         │
└───────────────────────────────────────────────────────┘
┌─ L6 面试（贯穿，不是最后才做）────────────────────────┐
│  八股 / 项目复盘 / 算法 / 投递节奏                       │
└───────────────────────────────────────────────────────┘
```

**依赖关系要点**：

- L0 是后面所有层的地基，**不能并行跳过**。
- L1 和 L2 可以交替进行（L2 的外设实验会用到 L1 的文件 IO 和线程）。
- L3 必须在 L2 之后起步（要先会用现成驱动），但可以与 L4 咬合（L3 的切片 ④ 就是 L4 的入口）。
- L5 在 L4 之后（要改 dts 得先懂设备树）。
- L6 从 L1 结束就开始积累，不是最后一层。

---

## 3. 逐层详解

> 每层结构：**解决什么问题 → 知识点（必会/了解/跳过）→ 资源对应 → 验收清单 → 面试口径 → 常见坑**

### L0 · 底座：从"板内编译"到"交叉编译 + 远程调试"

#### 解决什么问题

你现在把代码传到板子上用板内 `gcc` 编译。这条路有三个致命缺点：编译慢、没有调试器、无法编译内核模块。**后面每一层都要用交叉编译，所以这层必须先补。**

#### 知识点

**必会**

- 宿主机（x86 Ubuntu）与目标机（aarch64）的概念，为什么不能直接 `gcc`
- 工具链三要素：`aarch64-linux-gnu-gcc`、`--sysroot`、`-I/-L`；`file` / `readelf -h` 验证架构
- 静态库 `.a` vs 动态库 `.so`：编译期链接 vs 运行期加载；`ldd`、`RPATH`、`LD_LIBRARY_PATH`、`ldconfig`
- Makefile：变量、模式规则、自动变量 `$@ $< $^`、伪目标 `.PHONY`、增量编译
- CMake 基础（一份 `toolchain.cmake` 交叉编译配置文件）
- `gdb` + `gdbserver` 远程调试：断点、单步、看变量、看调用栈
- `ssh` / `scp` / `rsync`；**NFS 挂载**（L4 驱动开发的关键效率工具）
- 串口登录（`picocom` / `minicom`，波特率按手册确认，RK 系列常见 1500000）
- 看板子信息：`uname -a`、`cat /etc/os-release`、`/proc/cpuinfo`、`/proc/device-tree`

**了解**：`strace` / `ltrace` 的基本用法（L1 会正式用）、`systemd` 是什么（L5 用）

**跳过**：构建系统选择之争（Makefile vs CMake vs Meson），用 CMake 就行

#### 资源对应

- 野火书 1：《Linux 基础与应用开发实战指南》
  - [搭建 Linux 开发环境](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/linux_basis/environment_setup/environment_setup.html)
  - [编译器与工具链](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/linux_app/program/program.html)
  - [Makefile 构建工具](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/linux_app/makefile/makefile.html)
  - [调试工具](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/linux_app/debug/debug.html)
  - [版本控制工具](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/linux_app/git_code/git_code.html)
- 野火《LubanCat-RK3576 快速使用手册》
  - [GCC 编译程序](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/gcc_compile/gcc_compile.html)（配视频：[BV1wc411P752](https://www.bilibili.com/video/BV1wc411P752)）
  - [网络连接及静态配置](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/network/network2.html)（配视频：[BV1Y24y1A7xH](https://www.bilibili.com/video/BV1Y24y1A7xH)）
  - [启动系统与系统登录](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/board_startup/board_startup.html)（配视频：[BV1to4y1G7MK](https://www.bilibili.com/video/BV1to4y1G7MK)）
- 飞书文档：阶段 0（工具链/静态库动态库/Makefile/GDB/交叉编译，与本节重合度最高）

#### 验收清单

- [ ] 在 PC 上建一个**多文件 C 项目**（至少 3 个 `.c` + 2 个 `.h`），手写 Makefile 交叉编译出 aarch64 可执行文件，`file` 确认是 `ELF 64-bit LSB, ARM aarch64`
- [ ] `scp` 到板子跑起来；在 PC 上用 `readelf -d` 解释它依赖了哪些 `.so`
- [ ] 故意把 `--sysroot` 写错，制造一次"头文件找不到"，**记住报错长什么样**，再改回来
- [ ] 用 `gdbserver` 在板子上起程序，PC 上 `gdb` 远程连上，下断点、单步、打印变量、`bt` 看调用栈
- [ ] 把 PC 的目录通过 NFS 挂到板子的 `/mnt`，**从板子直接运行 PC 上的可执行文件**
- [ ] 写一个 `hello.ko`：`insmod` 后在 `dmesg` 看到 `printk` 输出，`rmmod` 能卸载（不求懂，只求跑通、知道内核代码长什么样）
- [ ] 用 `systemctl` 起一个你自己的服务，让它开机自启（为 L5 埋点）

#### 面试口径

- 编译的四个阶段：预处理 → 编译 → 汇编 → 链接，每步产物是什么
- 静态库和动态库的区别、各自的优缺点、动态库找不到怎么排查
- Makefile 的原理：目标/依赖/命令，为什么要用 `.PHONY`
- `gdb` 常用命令：`b` / `n` / `s` / `p` / `bt` / `frame`
- 交叉编译为什么需要 `sysroot`

#### 常见坑

| 坑 | 现象 | 解法 |
|---|---|---|
| 用板内 gcc 编的程序拷到 PC | `cannot execute binary file` | 架构不同，用 `file` 看 |
| 动态库找不到 | `error while loading shared libraries: libxxx.so` | `ldd` 查依赖 → `LD_LIBRARY_PATH` 或装到 `/usr/lib` 后 `ldconfig` |
| 工具链 glibc 比板子新 | `version 'GLIBC_2.xx' not found` | 用**野火 SDK 自带的工具链/sysroot**，别用随手 apt 的版本 |
| 串口乱码 | 一堆 `�` | 波特率不对（RK 常见 1500000，按手册确认），或没接地 |

---

### L1 · 应用层：你的主战场

#### 解决什么问题

嵌入式软件岗位**招得最多的就是这类活**：写业务、开线程、收发数据、保证不崩。这一层学完，你就已经具备面"嵌入式 Linux 应用开发实习"的资格——这是 2027 年春投递的**及格线**。

#### 知识点

**必会**

- 文件描述符的本质；`open/read/write/lseek/close`；`ioctl` 是什么
- 阻塞 vs 非阻塞；`O_NONBLOCK`；`fcntl`
- `fork` / `exec` 族 / `wait` / `waitpid`；僵尸进程、孤儿进程；守护进程怎么写
- 信号：`signal` / `sigaction`，`SIGINT`/`SIGTERM`/`SIGCHLD`，可重入
- IPC：管道/FIFO、信号、共享内存（+ 配合信号量）、消息队列
- 线程：`pthread_create/join`、互斥锁、条件变量、读写锁、**线程池**
- 网络：TCP/UDP、`socket`/`bind`/`listen`/`accept`/`connect`、字节序、**粘包怎么处理**
- IO 多路复用：`select` / `poll` / **`epoll`**（水平触发 vs 边缘触发）

**了解**

- `stat` / 文件属性 / 目录操作（`opendir/readdir`）
- `mmap`（后面 L2/L4 会用到）
- `/proc` 文件系统（调试利器）

**跳过**

- System V 消息队列的细枝末节（面试很少问，知道"有这个东西"即可）
- 协程 / io_uring（面试加分项，不是必需）

#### 资源对应

- 野火书 1：[文件 I/O 编程](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/linux_applications/filesystem_system_call/filesystem_system_call.html)、[系统调用 IO](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/linux_applications/system_call_io/system_call_io.html)、[标准 IO](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/linux_applications/standard_io/standard_io.html)、[文件属性](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/linux_applications/file_attribute_operations/file_attribute_operations.html)、[目录操作](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/linux_applications/directory_operations/directory_operations.html)
- 野火书 1 系统编程篇：[进程](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/system_programing/process/process.html)、[信号](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/system_programing/signal/signal.html)、[管道](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/system_programing/pipe/pipe.html)、[消息队列](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/system_programing/msg_queuq/msg_queuq.html)、[信号量](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/system_programing/systemV_sem/systemV_sem.html)、[共享内存](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/system_programing/shm/shm.html)、[线程](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/system_programing/thread/thread.html)、[POSIX 信号量](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/system_programing/posix_sem/posix_sem.html)、[POSIX 互斥锁](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/system_programing/posix_mutex/posix_mutex.html)
- 野火书 1 网络篇：[网络编程](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/system_programing/tcp_ip/tcp_ip.html)、[套接字](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/system_programing/socket/socket.html)、[select/poll/epoll 区别](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/system_programing/socket_io/socket_io.html)
- 飞书文档：**阶段 1**（这部分写得比野火细，建议对照着看，尤其 epoll 和 IPC 对比）
- 视频：韦东山《手把手教你嵌入式 Linux》应用部分（[BV1w4411B7a4](https://www.bilibili.com/video/BV1w4411B7a4)）对应章节；卡住时看，不要成套刷

#### 验收清单

- [ ] 多线程 TCP 服务端 + 客户端：支持多个客户端同时连接，每个连接一个线程（或线程池）
- [ ] 用 `epoll` 重写一遍服务端，并做**水平触发 vs 边缘触发**的对比实验（各写一个版本，观察行为差异）
- [ ] 用 `strace -f -p <pid>` 抓自己的程序，**逐个解释**你看到的 syscall 在干什么
- [ ] 亲手造三个 bug 并定位：
  - [ ] 僵尸进程（`fork` 后不 `wait`）→ 用 `ps` 看到 `Z` 状态
  - [ ] 死锁（两把锁顺序相反）→ 用 `gdb attach` + `thread apply all bt` 定位
  - [ ] 内存泄漏 → 用 `valgrind --leak-check=full` 找出泄漏点
- [ ] 用 `ab` 或 `hey` 压一下你的服务端，看 QPS 和错误率
- [ ] 把服务端写成 systemd 服务，开机自启、崩溃自动重启

#### 面试口径（高频必背）

- 进程 vs 线程 vs 协程；线程间共享什么、不共享什么
- `fork` 之后文件描述符怎么处理？写时复制（COW）是什么
- 僵尸进程怎么产生、怎么避免；孤儿进程会怎样
- 五种 IPC 的对比（速度、场景、限制）
- **`select` / `poll` / `epoll` 的区别**：为什么 epoll 快？红黑树 + 就绪链表；水平触发 vs 边缘触发的实际差异
- 死锁的四个必要条件；怎么避免
- TCP 三次握手、四次挥手；`TIME_WAIT` 过多怎么办；`CLOSE_WAIT` 说明什么
- TCP 粘包/拆包的原因和三种解决方案
- `fork` + `exec` 实现 shell 的原理

#### 常见坑

- **不测并发就以为对了**：单客户端测通不等于并发正确，必须压测
- 在信号处理函数里 `printf`：`printf` 不可重入，会死锁
- 忽略 `EINTR`：`read`/`accept` 被信号打断返回 -1，误判为错误
- `epoll` 边缘触发忘了循环读到 `EAGAIN`：会丢数据
- 端口没设 `SO_REUSEADDR`：重启服务时 `bind: Address already in use`

---

### L2 · 板级外设（应用视角）：不打驱动也能碰硬件

#### 解决什么问题

这一层是全路线**最容易被跳过、但最值钱**的一层。它教你**用现成的驱动**去操作硬件——不写一行内核代码，但你会因此理解"应用与驱动是怎么握手的"。学长那句话的前半段（`sensor → iic`）就在这里。

#### 知识点

**必会**

- `sysfs` GPIO：`/sys/class/gpio`（旧）与 `libgpiod`（新，推荐）；`gpiochip` / `gpio-line` 概念
- `input` 子系统（应用侧）：`/dev/input/eventX`、`struct input_event`（`type`/`code`/`value`）、`evtest`
- 串口：`termios`、`cfsetispeed/cfsetospeed`、原始模式（`cfmakeraw`）、`read/write`
- I2C：`/dev/i2c-N`、`ioctl(I2C_RDWR)`、`i2cdetect` / `i2cget` / `i2cset`；7 位地址 vs 8 位地址
- SPI：`/dev/spidevX.Y`、`ioctl(SPI_IOC_MESSAGE)`
- PWM：`/sys/class/pwm/`
- **V4L2**：`/dev/videoN`、`VIDIOC_QUERYCAP` / `VIDIOC_ENUM_FMT` / `VIDIOC_S_FMT` / `VIDIOC_REQBUFS` / `VIDIOC_QBUF` / `VIDIOC_DQBUF` / `VIDIOC_STREAMON`；`v4l2-ctl` 工具
- 像素格式：YUYV / NV12 / NV16 / MJPEG 的区别（为什么摄像头很少直接出 RGB）

**了解**

- `framebuffer`（`/dev/fb0`）——老接口，知道即可
- DRM（`/dev/dri/card0`）——现代显示框架，了解概念

**跳过**

- DRM atomic 编程（除非做显示类项目）

#### 资源对应

- 野火书 1 应用外设篇：[GPIO 子系统](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/linux_app/gpio_subsystem/gpio_subsystem.html)、[input 子系统](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/linux_app/input_subsystem/input_subsystem.html)、[串口通讯](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/linux_app/uart/uart.html)、[I2C 通讯](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/linux_app/i2c_bus/i2c_bus.html)、[SPI 通信](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/linux_app/spi_bus/spi_bus.html)、[PWM](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/linux_app/pwm/pwm.html)、[framebuffer](https://doc.embedfire.com/linux/rk356x/linux_base/zh/latest/linux_app/framebuffer/framebuffer.html)
- 野火《RK3576 快速使用手册》外设篇（**更贴你的板子，优先看这个**）：
  - [引脚对照图](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/40pin/40pin.html)（先打印出来贴在桌上）
  - [GPIO 控制](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/40pin/gpio/gpio.html)、[I2C](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/40pin/i2c/i2c.html)、[SPI](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/40pin/spi/spi.html)、[PWM](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/40pin/pwm/pwm.html)、[串口](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/40pin/uart/uart.html)
  - [摄像头](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/camera/camera.html)（配视频：[BV1q14y1275u](https://www.bilibili.com/video/BV1q14y1275u)）
  - [input 子系统与触摸](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/input/input.html)、[ADC](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/adc/adc.html)、[RTC](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/rtc/rtc.html)

#### 验收清单

- [ ] 用 `libgpiod` 点一颗 LED、读一个按键（不用 `echo 1 > /sys/class/gpio/...` 的老办法）
- [ ] `i2cdetect -y -r <bus>` 扫到你的传感器地址；`i2cget` 读出 `WHO_AM_I` 寄存器并确认芯片型号
- [ ] **用 C 代码**通过 `/dev/i2c-N` + `ioctl(I2C_RDWR)` 读同一个寄存器（不用 `i2cget`）
- [ ] 读 `/dev/input/eventX`，用 `struct input_event` 解析按键，打印 `type/code/value`
- [ ] `v4l2-ctl --list-devices` 找到摄像头节点；`v4l2-ctl --list-formats-ext` 看支持的格式；抓一帧存文件，用 `ffmpeg` 转成 PNG 看画面
  - 验收加分：能解释为什么 RK3576 上真正的采集节点是 `rkisp_mainpath` 对应的那个 `/dev/videoN`（一般是 `/dev/video11`），而不是 `/dev/video0`
- [ ] 用 C 写一个 V4L2 取流程序（mmap 方式），连续取 100 帧并统计 fps

#### 面试口径

- 用户态和内核态怎么交互？`ioctl` 是什么？和 `read/write` 的区别
- `sysfs` 是什么？为什么能用 `echo` 控制硬件
- 字符设备和块设备的区别
- 应用怎么知道设备来了/走了（`uevent`、`netlink`、`inotify`）
- V4L2 的取流流程（申请缓冲 → 入队 → 出队）

#### 常见坑

| 坑 | 说明 |
|---|---|
| **MIPI 摄像头不支持热插拔** | 手册红字警告：上电时插拔可能短路/烧芯片。**断电再接线** |
| 摄像头默认关闭 | RK3576 上摄像头由 `/boot/uEnv/uEnv.txt` 里的**设备树插件**控制，`CAM0` 前的 `#` 要去掉再重启（`CAM0` 是 4 lane，其余 2 lane） |
| Debian 下摄像头不工作 | 野火注明 **ISP 问题已于 2026-01 修复**，必须用 2026 年 1 月或更新的镜像 |
| 权限不足 | `/dev/video*`、`/dev/input/*` 需要 `video`/`input` 组权限，或加 udev 规则 |
| I2C 地址搞错 | 手册给的是 8 位地址时，`i2cdetect` 显示的是 7 位，要右移一位 |

---

### L3 · 项目（岔路口）：边做边学，做出简历上的那条链路

#### 解决什么问题

**这是整条路线唯一真正的产出。** 学长说得最直白："弄个 rk 的板卡……反正要教程尽量多的，来跑项目"；"就是要简历上，要有面试官感兴趣的、能问的"；"面试官都不关心你做的东西复杂或者创新性，主要关注你在调试时候遇到过什么问题，怎么解决"。

**关键认知：项目不是"学完之后做"，而是"边做边学"。** 但也不是一上来就做完整项目，而是**最小闭环 → 逐层加厚**。

#### 3.1 岔路口：选载体

到这里（L2 结束）你再决定，因为 L0~L2 是共用的，换载体只需换切片。

| 载体 | 硬件成本 | 面试兴奋度 | 风险 | 适合谁 |
|---|---|---|---|---|
| **视频链路**（默认推荐） | 低（一个 UVC 摄像头即可） | **最高**（学长点名） | 中（编码/协议有门槛） | 想走应用 + 想要一条完整链路的人 |
| 采集网关 | 低 | 中 | 低 | 想稳、不想碰驱动的人 |
| 机器人小车 | 高 | 高 | **高**（机械/电源/电机坑多） | 有现成硬件、想做 ROS 的人 |
| 改造竞赛项目 | 0 | 中 | 中（要"翻译"旧代码） | 手边硬件齐全的人 |

#### 3.2 默认载体：视频链路（五个切片）

> 为什么是它：① 学长明确推荐；② 它是**唯一能同时碰到 sensor → I2C → 驱动 → 应用 → 网络**的链路；③ 野火文档里配套齐全（摄像头章节 + MPP 硬编解码 + GStreamer 插件 + 硬编 ffmpeg），不容易卡死。

| 切片 | 你实际做什么 | 顺带学到 | 野火对应资料 |
|---|---|---|---|
| ① 最小闭环 | UVC 摄像头出图，屏幕/文件里能看到 | V4L2 取流、格式转换（YUYV→RGB） | 书 1「图片显示」+ 快速手册「摄像头」 |
| ② 加仪表 | 打时间戳、算 fps、估算每段延迟 | 高精度定时（`clock_gettime`）、性能测量 | 无（自己写） |
| ③ 上网络 | 自己编码 + 推流，手机/浏览器能看 | socket、RTP/RTSP 或 HTTP-FLV、缓冲区与丢帧策略 | 书 1 网络篇 |
| ④ 下探硬件 | 绕过 UVC，直接读 MIPI sensor | **I2C + V4L2 驱动 → 接 L4** | 快速手册「摄像头」+ 书 2 I2C 子系统 |
| ⑤ 可选 | 叠 RKNN 检测框 / 语音 | RKNN Toolkit2、模型量化 | 书 6（YOLOv8/YOLO11 例程） |

**技术栈建议（按"最容易出结果"排序）**：

1. **纯 C + V4L2 取流 + 自己写 RTP 打包**（最锻炼人，面试最能聊）
2. **GStreamer 管线**：`v4l2src ! mpph264enc ! rtph264pay ! udpsink`（快，但要能讲清每个 element 干了什么）
3. **FFmpeg 硬编版**（野火提供安装方法）→ 推 RTMP

> 如果时间紧：先用 GStreamer 跑通（拿到"能用"的成就感），再回头用 C 重写一段链路（拿到"能讲"的深度）。**两件事都要做。**

#### 3.3 验收清单

- [ ] 能在白板上画出完整数据流图：`sensor → ISP → /dev/videoN → 应用缓冲 → 编码 → 封装 → 网络 → 播放端`
- [ ] 能报出**具体数字**：分辨率、帧率、端到端延迟（ms）、CPU 占用、码率
- [ ] 能说出你踩过的**至少 3 个坑**，以及你是怎么定位的（用什么命令、看什么日志）
- [ ] 代码在 git 上，有 README（架构图 + 怎么跑 + 已知问题）
- [ ] 能演示：手机连上能看，画质/延迟可接受

#### 3.4 简历表述模板

> **基于 RK3576 的低延迟视频推流系统**（个人项目）
> - 基于 V4L2 实现摄像头采集（MIPI/UVC），完成格式转换与零拷贝缓冲管理，1080p@30fps 采集 CPU 占用 X%
> - 基于 Rockchip MPP 硬件编码器实现 H.264 实时编码，端到端延迟从 Yms 降到 Zms
> - 设计 RTP 打包/重传与接收端抖动缓冲，弱网（丢包 x%）下画面可恢复
> - 定位并修复 N 个问题：如 xxx（写具体现象 + 定位手段 + 根因）

> 写法要点：**每一条都要有数字**；**"踩坑"那一条比功能那一条更值钱**（学长原话："主要关注你在调试时候遇到过什么问题，怎么解决"）。

#### 3.5 项目期才允许放开 AI

你在学习期（L0~L2）禁用 AI 调试。进入 L3 后可以逐步放开，但**底线不变**：AI 改过的代码，你必须能逐行讲清；任何 bug 先自己定位 30 分钟。

---

### L4 · 驱动：跟通，不求深

#### 解决什么问题

学长："就，常规的，应用到驱动一套学下来"；"先不用学深"。你的目标不是成为驱动专家，而是**能讲清一条从硬件到应用的链路**，以及**能自己写一个中等复杂度的驱动**（这是应用岗的差异化优势）。

#### 知识点（按野火书 2 的顺序，只走主线）

| # | 章节 | 必会内容 | 验收动作 |
|---|---|---|---|
| 1 | [实验环境搭建](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/base_exper_env.html) | 拉内核源码树、交叉编译模块、`modules_install` 到板子 | 编一个空模块并加载成功 |
| 2-3 | [内核模块](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/base_linuxkernel_module.html) / [第一个模块](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/base_first_module.html) | `module_init/exit`、`MODULE_LICENSE`、模块参数、`printk` 等级 | 带参数的模块，`insmod xxx.ko n=3` |
| 4-5 | [字符设备](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/base_character_device.html) / [LED 实验](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/base_led_character_device.html) | 设备号、`cdev`、`file_operations`、`copy_to/from_user`、`class_create/device_create` | 写一个能被 `echo` 控制的 LED 驱动 |
| 6 | [设备模型](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/base_linux_device_model.html) | 总线-设备-驱动、`kobject`/`sysfs` | 能解释 `/sys/bus/...` 的结构 |
| 7 | [平台设备驱动](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/base_platform_driver.html) | `platform_driver`、`probe/remove`、匹配机制 | 把 LED 驱动改成 platform 驱动 |
| 8-9 | [设备树](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/base_driver_tree.html) / [LED 实验](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/base_device_tree_rgb_led.html) | DTS 语法、`compatible`、`reg`/`interrupts`/`gpios`、`of_*` 函数 | 从 dts 里读出 GPIO 号，不再硬编码 |
| 10 | [设备树插件](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/base_dynamic_device_tree.html) | overlay 机制 | **看懂 `/boot/uEnv/uEnv.txt` 里那些 `#` 是什么**（这是你板子上摄像头的开关） |
| 11-12 | [并发与竞争](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/base_concurrency_competition.html) / [内核定时器](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/base_timer.html) | 原子操作、自旋锁、信号量、互斥体；`jiffies` | 给 LED 驱动加一个闪烁定时器 |
| 13 | [Pinctrl 与 GPIO 子系统](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/subsystem_pinctrl_gpio.html) | pinctrl 配置、`gpiod_*` API | 用 `gpiod` API 重写点灯 |
| 14-15 | [中断子系统](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/subsystem_interrupt.html) / [中断分层](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/subsystem_interrupt_layering.html) | `request_irq`、上半部/下半部、tasklet/workqueue、中断号从 dts 取 | 按键中断驱动，打印时间戳 |
| 16-17 | [阻塞与非阻塞](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/subsystem_blockio_noblockio.html) / [异步通知](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/subsystem_asyncnoti.html) | 等待队列、`poll`、`fasync` | 按键驱动支持 `read` 阻塞等待 |
| 18 | [输入子系统](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/subsystem_input_subsystem.html) | `input_dev`、`input_report_key` | 把按键驱动改成 input 设备，`evtest` 能看到 |
| 19 | [I2C 子系统](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/subsystem_i2c_subsystem.html) | `i2c_driver`、`i2c_transfer`、`smbus` | **把你 L2 用 `i2cget` 读的传感器，自己写驱动读出来** |
| 20 | [SPI 子系统](https://doc.embedfire.com/linux/rk356x/driver/zh/latest/linux_driver/subsystem_spi_subsystem.html) | `spi_driver`、`spi_sync` | 有 SPI 器件就做，没有可只看不写 |

**明确跳过（只看标题，不读书）**：

- 「Linux 驱动进阶知识」整章：DMA/IOMMU、帧缓冲、DRM、块设备、USB、TTY、SCSI、PCI、网络子系统、SMP
- regmap / sysfs 子系统 / 电源管理 / IIO / ADC / RTC / 触摸：**用到再看**
- 理由：这些是原厂/BSP 岗的活，不是你的主线；面试应用岗几乎不问

#### 验收清单（这层的总验收）

- [ ] 写一个 **platform + 设备树 + 中断 + misc** 的综合驱动：按键按下 → 中断 → 唤醒等待队列 → 应用层 `read` 读到数据
- [ ] 把这个驱动整理进 git，写清 dts 片段、编译方法、加载顺序
- [ ] 把 L2 里"用 `i2cget` 读的传感器"改成"自己写的 I2C 驱动 + 应用层读 `/dev/xxx`"
- [ ] 能画出：`应用 read()` → `VFS` → `file_operations` → 你的驱动 → `i2c_transfer` → 硬件寄存器 的完整调用链

#### 面试口径

- 字符设备驱动的完整流程（从 `alloc_chrdev_region` 到 `device_create`）
- `platform` 总线模型：为什么需要它？`probe` 什么时候被调用？匹配靠什么（`compatible` / `name` / `id_table`）
- 设备树怎么和驱动匹配？`of_match_table` 的作用
- 中断上半部和下半部的区别；tasklet / 工作队列 / 软中断各自能不能睡眠
- 自旋锁 vs 信号量 vs 互斥体：能不能睡眠、适用场景
- `copy_to_user` 为什么不能直接 `memcpy`
- `kmalloc` vs `vmalloc`
- I2C 驱动框架：`i2c_driver` / `i2c_client` / `i2c_adapter` 三者关系

#### 常见坑

- 内核模块编译必须用**板子对应的内核源码树**，版本不匹配 → `insmod: invalid module format`
- 内核代码里不能用标准 C 库（没有 `printf`，只有 `printk`）
- 中断上下文里睡眠 → 内核直接崩
- dts 改完要重新编 dtb 并让它生效（RK 上是打包进 boot 分区或放在 `/boot` 下，按手册来）

---

### L5 · 系统构建：从"用系统"变成"造系统"

#### 解决什么问题

这是"用户"和"工程师"的分界线。面试里能区分"只会写应用"和"懂板子"的就是这一层。也是你改 dts 让摄像头/外设生效的必经之路。

#### 知识点（野火书 3）

按顺序，只走这些：

1. [Linux 系统构成](https://doc.embedfire.com/linux/rk356x/build_and_deploy/zh/latest/building_image/image_composition/image_composition.html)：Bootloader → Kernel → RootFS → App 四层
2. [不同 LubanCat_SDK 对比](https://doc.embedfire.com/linux/rk356x/build_and_deploy/zh/latest/building_image/lubancat_sdk/lubancat_sdk_compare.html) → 选一个（一般用 [LubanCat_Gen_SDK](https://doc.embedfire.com/linux/rk356x/build_and_deploy/zh/latest/building_image/lubancat_sdk/lubancat_gen_sdk.html)）
3. [U-boot 介绍](https://doc.embedfire.com/linux/rk356x/build_and_deploy/zh/latest/building_image/use_uboot/use_uboot.html) + [修改与编译](https://doc.embedfire.com/linux/rk356x/build_and_deploy/zh/latest/building_image/uboot_build/uboot_build.html)
4. [Linux 内核编译](https://doc.embedfire.com/linux/rk356x/build_and_deploy/zh/latest/building_image/building_kernel/building_kernel.html)
5. [设备树简介](https://doc.embedfire.com/linux/rk356x/build_and_deploy/zh/latest/building_image/devicetree_introduce/devicetree_introduce.html) + [编译](https://doc.embedfire.com/linux/rk356x/build_and_deploy/zh/latest/building_image/devicetree_introduce/devicetree_compile.html)
6. 根文件系统：[介绍](https://doc.embedfire.com/linux/rk356x/build_and_deploy/zh/latest/building_image/rootfs_introduce/rootfs_introduce.html) + [Debian 构建](https://doc.embedfire.com/linux/rk356x/build_and_deploy/zh/latest/building_image/debian_rootfs/debian_rootfs.html)（你板子上就是这个）
7. 部署应用：[Systemd](https://doc.embedfire.com/linux/rk356x/build_and_deploy/zh/latest/building_image/using_systemd/using_systemd.html)、[打 deb 包](https://doc.embedfire.com/linux/rk356x/build_and_deploy/zh/latest/building_image/make_pakage_of_deb/make_pakage_of_deb.html)、[添加自启动服务](https://doc.embedfire.com/linux/rk356x/build_and_deploy/zh/latest/building_image/system_services/system_services.html)
8. 烧录与备份：[SD 卡烧录](https://doc.embedfire.com/linux/rk356x/build_and_deploy/zh/latest/building_image/install_image/install_image_to_sd.html)、[eMMC 烧录](https://doc.embedfire.com/linux/rk356x/build_and_deploy/zh/latest/building_image/install_image/install_image_to_emmc.html)、[完整镜像解包/打包](https://doc.embedfire.com/linux/rk356x/build_and_deploy/zh/latest/building_image/install_image/update_ubpack.html)、[系统备份](https://doc.embedfire.com/linux/rk356x/build_and_deploy/zh/latest/building_image/image_backup/image_backup.html)

**跳过**：Buildroot / Docker 构建 rootfs（除非你需要极简系统）、A/B 系统与 OTA、从固态硬盘启动

#### 验收清单

- [ ] 拉 SDK，**完整编译一次** kernel + dtb（先不改任何东西，确认能出产物）
- [ ] 改一颗 LED 或摄像头的设备树（overlay），重编、部署、重启后生效
- [ ] 交叉编译一个内核模块，`modules_install` 到板子的 `/lib/modules/$(uname -r)/`
- [ ] 打一个 **deb 包**，在板子上 `dpkg -i` 安装你的程序
- [ ] 写一个 systemd service，让你的推流程序开机自启 + 崩溃重启
- [ ] 出一次**完整镜像**并烧录（这一步失败也没关系，重点是走完流程、知道镜像里有什么）

#### 面试口径

- 从上电到 shell 的完整流程（BootROM → SPL/TPL → U-boot → kernel → init/systemd → shell）
- U-boot 的作用；`bootargs` 里常见参数是什么意思
- rootfs 里有什么；`/etc/fstab`、`/etc/inittab`（或 systemd 的 target）分别干什么
- 镜像怎么分区；eMMC 和 SD 卡启动的区别
- 你的程序怎么做到开机自启、崩溃重启

---

### L6 · 面试与投递：贯穿始终

#### 6.1 八股四块（按优先级）

| 块 | 高频题（示例） | 什么时候开始整理 |
|---|---|---|
| **C 语言**（必考） | 指针与数组、`const`/`static`/`volatile`、大小端、内存对齐、`malloc` 实现、函数指针、`#define` vs `inline`、结构体字节对齐 | L1 期间随手记 |
| **系统编程** | 进程线程、IPC、epoll、锁、TCP/UDP | L1 结束 |
| **驱动** | 字符设备流程、platform、设备树、中断上下半部、锁的选择、I2C 框架 | L4 期间 |
| **网络/OS 基础** | TCP 握手挥手、`TIME_WAIT`、进程调度、虚拟内存、页表 | L6 集中补 |

**整理方式**：每个知识点写"一句话答案 + 一个我项目里的例子"。只背概念，面试官一追问就露馅。

#### 6.2 项目复盘模板（学长的核心诉求）

对项目里的每个技术点，都按这个结构准备：

```
现象：出了什么问题（越具体越好，带报错/数字）
定位：我用了什么手段（strace / dmesg / 加日志 / 二分 / 对比实验）
根因：底层原因是什么（不要停在"改了就好了"）
修复：怎么改的，为什么这么改
验证：改完怎么证明好了（数字对比）
```

**至少准备 3 个这样的故事。** 面试官问"遇到过什么难题"时，这就是你的弹药。

#### 6.3 算法

LeetCode 简单~中等，重点：数组/字符串、链表、二叉树、排序、双指针、简单 DP。目标是**面试时手写不卡**，不是刷题量。

#### 6.4 投递节奏

- **L4 过半即可投**（对应飞书文档"阶段 3 末尾"，因为你的 L0~L3 已经覆盖了它的阶段 0~3 的大部分）。
- 第一波：2027 年春，暑期实习（这是最重要的窗口，实习转正是本科就业最稳的路）。
- 边投边补：面试暴露的短板，回来补 L4/L5 对应章节。
- 简历只放 **2 个项目**，宁少勿滥；每个都要能聊 20 分钟。

---

## 4. 里程碑总表（打勾用）

| # | 里程碑 | 通过标准 | 状态 |
|---|---|---|---|
| M0 | 交叉编译闭环 | PC 交叉编译 → 板子运行 → gdbserver 断点成功；NFS 挂载成功 | ☐ |
| M1 | 应用层闭环 | 多线程/epoll 服务端 + 压测 + 三个 bug 定位 + systemd 自启 | ☐ |
| M2 | 外设闭环 | libgpiod 点灯 + I2C 读寄存器 + input 解析 + V4L2 抓帧 | ☐ |
| M3 | 岔路口决策 | 选定项目载体，画出一版数据流图 | ☐ |
| M4 | 项目可用 | 端到端跑通，能报出延迟/帧率/CPU 数字 | ☐ |
| M5 | 驱动闭环 | platform+dts+中断+misc 综合驱动；传感器自写驱动 | ☐ |
| M6 | 系统闭环 | 改 dts 生效 + 编 kernel/dtb + 出一次镜像 | ☐ |
| M7 | 可投递 | 简历 2 个项目定稿 + 3 个踩坑故事 + 八股四块成稿 | ☐ |

> **投递触发条件：M5 完成一半（字符设备 + platform + 设备树 + 中断都做过）就可以开始投。**

---

## 5. 视频资源总表（你偏好视频，这里说实话）

### 5.1 野火官方（贴你的板子，但没有系统课）

- B 站账号：`野火电子官方`（[space.bilibili.com/356820657](https://space.bilibili.com/356820657)）
  - 合集「鲁班猫卡片电脑小百科」75 集：**产品演示/上手级**，用来熟悉板子，不要当课学
- 文档里**嵌了视频的章节**（逐章短视频，最实用）：
  - [启动系统与系统登录](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/board_startup/board_startup.html) → [BV1to4y1G7MK](https://www.bilibili.com/video/BV1to4y1G7MK)
  - [GCC 编译程序](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/gcc_compile/gcc_compile.html) → [BV1wc411P752](https://www.bilibili.com/video/BV1wc411P752)
  - [网络连接](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/network/network2.html) → [BV1Y24y1A7xH](https://www.bilibili.com/video/BV1Y24y1A7xH)
  - [摄像头](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/camera/camera.html) → [BV1q14y1275u](https://www.bilibili.com/video/BV1q14y1275u)
  - [音频](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/audio/audio.html) → [BV14s4y1r7Ud](https://www.bilibili.com/video/BV14s4y1r7Ud)
  - [野火配置工具](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/fireconfig/fireconfig.html) → [BV1Gz4y1z7sw](https://www.bilibili.com/video/BV1Gz4y1z7sw)
  - 其余章节（GPIO/I2C/SPI/PWM/串口/设备树/MPP/GStreamer/ffmpeg）**无视频**，只有图文
- 结论：**野火的视频只够"熟悉板子和跑通示例"，不够"系统学习"。**

### 5.2 系统课（讲 Linux，但板子不是 RK3576）

| 课程 | 平台 | 适合看什么 | 注意 |
|---|---|---|---|
| **韦东山《手把手教你嵌入式 Linux 快速入门到精通》**（121 讲，基于 i.MX6ULL Pro） | [B 站 BV1w4411B7a4](https://www.bilibili.com/video/BV1w4411B7a4) | **L0 工具链、L1 应用层系统编程、L4 驱动框架** | 板子不同，代码细节对不上，**只看思路和操作**；驱动部分他按子系统分章（pinctrl/中断/I2C 等），适合"卡住时按子系统查" |
| **正点原子【第四期】手把手教你学 Linux 之驱动开发篇**（146 讲） | B 站搜「正点原子 Linux 驱动开发篇」 | **L4 驱动**（字符设备→platform→设备树→中断→I2C/SPI） | 体系最完整、最贴野火书 2 的章节顺序；同样是 i.MX6ULL，代码不能照抄 |
| 韦东山「驱动大全」 | video.100ask.net | L4 按子系统深挖 | 内容量大，**不要成套刷**，按需查 |

### 5.3 视频使用原则

1. **每章先看 10~20 分钟视频建立直觉，再回野火文档做实操**（野火文档贴你的板子，视频不贴）。
2. **不允许"看完整套课再动手"**——那是最典型的假学习。
3. 视频看不下去就直接读文档，野火的图文质量足够；视频不是必需品。

---

## 6. 明确不学（省下来的时间是纯赚）

| 内容 | 处理 | 理由 |
|---|---|---|
| 《Android 用户手册》《OpenWrt 用户手册》《OpenHarmony 用户手册》 | **完全跳过** | 与目标岗位无关 |
| 《嵌入式 Qt 应用开发》 | 只读「信号槽」一章 | 应用岗不要求；除非投上位机/工控 UI |
| 《Python 应用开发》 | 不专门学 | AI 书要用时现学 |
| 内核机制（飞书阶段 5） | **降级**为"面试前补八股" | 你走应用主线，不读内核源码 |
| 裸机驱动（飞书阶段 3） | **压缩到最小** | 你有 STM32/电赛底子，只需补"寄存器操作 + 自己写 Makefile" |
| 画板 / 硬件设计 / 焊接 | 不学 | 学长："看得懂原理图就行"；"软硬件分工很清楚" |
| DRM atomic / DMA / USB / 网络子系统驱动 | 只看标题 | 原厂/BSP 岗的活 |

---

## 7. 卡壳处理 SOP（AI 只当词典）

按顺序走，**每一步都记下你看到了什么**（这本身就是面试素材）：

1. **看返回值**：`errno` 是多少？`perror` / `strerror` 说什么？→ `man 2 xxx` / `man 3 xxx`
2. **看内核日志**：`dmesg | tail -30`、`journalctl -xe`（驱动问题 90% 在这里有答案）
3. **看系统调用**：`strace -f -p <pid>`，看它停在哪一个 syscall、返回什么
4. **看状态**：`/proc/<pid>/`、`/sys/class/...`、`ls -l /dev`、`ps aux`、`top`
5. **查官方文档**：
   - 野火 [doc.embedfire.com](https://doc.embedfire.com/products/link/zh/latest/linux/ebf_lubancat_doc.html)（贴板子，优先）
   - 内核源码里的 `Documentation/`（驱动接口的权威说明）
   - 芯片手册 / 原理图（野火云盘里有）
6. **查社区**：野火论坛 [firebbs.cn](https://www.firebbs.cn)、Gitee 仓库 issue（[LubanCat](https://gitee.com/LubanCat)）
7. **问学长**（他明确说过"你后面有问题也可以问我"）——**这条比 AI 值钱得多**，因为他知道行业里真正怎么干
8. **最后才是 AI**：只问概念（"`ioctl` 的 `_IOW` 宏怎么拼"），**不要问"帮我改这段代码"**

> 为什么要这么严：面试官问的是"你怎么定位的"。你如果每次都靠 AI 直接给答案，半年后你会有项目但没有故事——**而故事才是面试的通货**。

---

## 8. 硬件清单（一次买齐，别来回折腾）

| 物品 | 必需性 | 说明 |
|---|---|---|
| UVC USB 摄像头 | **必需** | L2/L3 起点；免驱，插上就是 `/dev/videoN`；野火文档里有推荐型号 |
| I2C 传感器模块（MPU6050 / AP3216C 等） | **必需** | L2 读寄存器、L4 自己写驱动，都用它 |
| 杜邦线（母对母/公对母） | 必需 | 接 40pin |
| USB-TTL 串口模块 | 建议 | 板子起不来时的救命通道（板载调试串口也行） |
| MIPI 摄像头（ov8858 / imx415 / gc08a8 / gc2053 / gc4653） | **可选，L4 再买** | 野火已适配这五款；**MIPI 不支持热插拔，千万别带电插拔** |
| 散热片/风扇 | 建议 | RK3576 跑编码/推理会热 |

> 省钱提示：先把 UVC + 一颗 I2C 传感器跑通，**能走完 L2 和 L3 的大部分**；MIPI 摄像头等 L3 切片 ④ 再买。

---

## 9. 一页速查：现在该做什么

1. 打开野火 [RK3576 快速使用手册 → GCC 编译程序](https://doc.embedfire.com/linux/rk3576/quick_start/zh/latest/doc/gcc_compile/gcc_compile.html)，确认板内编译那条路你已经会了。
2. 开始 **L0 的第一条验收**：在 PC 上建多文件项目 + 手写 Makefile + 交叉编译。
   - 工具链优先用**野火 SDK 里自带的**（避免 glibc 版本不匹配）。
3. L0 全部打勾后，直接进 L1，**不要回头补"Linux 命令"**——你已经有这个基础了。
4. 卡住时，翻回第 7 节，按顺序走，不要开 AI 写代码。
5. 每隔一段时间回来看第 4 节的里程碑表，只关心"我现在在第几个 M"。

---

## 10. 参考链接汇总

**野火**
- 文档索引：https://doc.embedfire.com/products/link/zh/latest/linux/ebf_lubancat_doc.html
- RK3576 快速使用手册：https://doc.embedfire.com/linux/rk3576/quick_start/
- 书 1 Linux 基础与应用：https://doc.embedfire.com/linux/rk356x/linux_base/
- 书 2 驱动开发：https://doc.embedfire.com/linux/rk356x/driver/
- 书 3 镜像构建与部署：https://doc.embedfire.com/linux/rk356x/build_and_deploy/
- 书 6 嵌入式 AI：https://doc.embedfire.com/linux/rk356x/Ai/
- 综合代码仓库：https://gitee.com/LubanCat/lubancat_rk_code_storage
- AI 例程仓库：https://github.com/LubanCat/lubancat_ai_manual_code
- 论坛：https://www.firebbs.cn

**视频**
- 韦东山《手把手教你嵌入式 Linux》：https://www.bilibili.com/video/BV1w4411B7a4/
- 野火电子官方 B 站：https://space.bilibili.com/356820657

**其他**
- 飞书文档（学长/博主路线，需登录）：https://xcnobkwbv80o.feishu.cn/docx/FzwTdsHcModNtUxEqglcrInPnYc

---

## 附：这份路线的核心逻辑（一句话版）

> **先用交叉编译把"能自己做出东西"的能力补上（L0），再用应用层拿到入场券（L1），用外设理解软硬边界（L2），用一个端到端项目做出简历上唯一真正值钱的东西（L3），然后往下走一层驱动、再往下走一层系统构建（L4/L5），全程攒面试素材（L6）。**
>
> 每一层都能独立变现：M1 之后能投实习，M5 之后能面正经岗位。
