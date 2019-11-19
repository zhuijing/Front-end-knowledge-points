# 在码云中使用jenkins

## 前提步骤

1. 注册码云https://gitee.com
2. 创建项目
3. [配置WebHooks](https://gitee.com/help/articles/4184#article-header0)
4. 下载[jenkins程序](https://jenkins.io/zh/download/)
5. 运行 java -jar jenkins.war --enable-future-java
6. 本机打开localhost:8080
7. 输入JAVA启动时生成的密码
8. 安装社区推荐插件
9. 创建用户名密码，（要记住下次登录需要）
10. [安装gitee插件](https://gitee.com/help/articles/4193#article-header4)前往 Jenkins -> 系统管理-> 插件管理 -> 可选插件 -> gitee ，选择后点击下载带重启后安装
11. [配置插件](https://gitee.com/help/articles/4193#article-header5)前往 Jenkins -> 系统管理-> 系统配置 ->Gitee配置
12. 新建构建任务


d47cb8d35d5766ce8c2b44bae7f69608