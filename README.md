Zebra：基于 [Book Searcher](https://github.com/book-searcher-org/book-searcher) 的 Web 界面
======

<https://zebra.9farm.com/>

<a href="https://zebra.9farm.com/"><img src="https://raw.githubusercontent.com/zhengkai/zebra/master/misc/logo/readme.webp" width="256" height="256" alt="Zebra Logo" /></a>

[plan](https://github.com/zhengkai/zebra/blob/master/PLAN.md)

最近没时间搞了，简单描述一下

安装
------

在本地跑所需要的脚本在 `client/Makefile`，在 `client/` 目录下直接敲 `make` 可以启动 angular 开发环境，修改 `misc/nginx/dev.conf` 为自己的（尤其是 `/search` 里对应的 Book Bearcher 端口）并添加到 nginx 里

特别是，如果你没有安装自己的 Book Searcher，我的 nginx 配置文件里已经写了 

```
add_header Access-Control-Allow-Origin *;
```

不检查跨站谁都能用，也就是你把 `/client/src/app/search/search.service.ts` 里 `SearchService` 的 `baseURL` 加上我的域名前缀，最终为

```
baseURL = 'https://zebra.9farm.com/search?limit=100&query=';
```

就可以让前端能跑起来，当然如果你有能力架 Book Searcher 希望也能关闭跨站检查（上面那行 `add_header`）

部署可以参考 `Makefile` 里的 `prod` 段内容，在 `client/` 目录直接 `./dist/build.sh 你的域名 prod`，并修改 `misc/nginx/dev.conf` 对应你的部署目录

缓存
------

在我的 nginx 配置 `misc/nginx/prod.conf` 里，有这么两段，开头的

```
proxy_cache_path /www/zlib/nginx-cache levels=2:2 keys_zone=zlib:50m inactive=48h max_size=1g;
```

以及 `server` 的定义中有

```
	location /search {
		add_header Access-Control-Allow-Origin *;
		proxy_cache zlib;
		proxy_cache_key $uri$is_args$args;
		proxy_cache_valid 200 304 10m;
		proxy_pass http://127.0.0.1:7070;
	}
```

这些可以让搜索结果缓存为静态文件，应该可以降低不少负载，可以参考一下

TODO:
------

* ~~自定义搜索项/结果字段~~ (2022.12.05)
* ~~自定义下载按钮~~ (2022.12.05)
* 导入导出设置
* ~~搜索历史~~ (2022.12.07)
* 保存单本书
* 保存搜索历史页
* 分享书单
* 离线也能查看已搜过页面
* 多个后台汇总，防止单点
* 对单个下载的评价/打分
