# fa
node web 脚手架，工具集合

程序流程（以dev为例）

进入dev
1、hack环境变量.
2、构造Fa实例
3、对再做一些应用级别的配置
4、启动



##fa只是一个规则与工具的提供者

目前大致有以下模块：
(模块间启动时的依赖或者顺序通过fa本身的事件来保证，虽然容易死锁)

###fa-swig
扩展了swig模板引擎

**locals 管理规范：**
1、settings :     express settings （自动注入的）
3、config ：      站点的设置(静态数据）
3、_locals :      通过res设置的locals（express自动保留的）
2、util :         模板帮助函数
4、meta           分类数据相关的locals函数
5、模板内所需数据

所有相关locals的函数，均通过中间件的方式来注入，而不使用app.locals，这样可以提高locals的灵活性（因为可以访问每个res的相关信息）

###功能：
数据变量输出和转译，locals函数执行，数据变量输出时过滤，基本的for循环遍历等（swig本身已经自带）
方便访问系统中的静态数据（站点设置，元数据等等）(计划通过对locals的规范实现）
实现 data api数据直接模板内请求，转化成js输出内容，或者ajax异步请求（计划用tag实现）


###bee
一个通过配置，自动调用后端http api的工具

后端服务器信息可配置
自动解析返回结果到指定格式（先支持json）
返回后端服务器header
需要支持同一个接口配置不同的服务器，这些服务器可以提供不同版本的接口
根据指定接口版本，查找对应的后端服务器
可以设置接口版本的服务器配置不存在时的策略（使用最新，或者报错）
提供一些middleware组件

###horse
一个路由分发加载器（要自动）

###middleware
中间件仓库，所有的express中间件都注册在这个空间下。