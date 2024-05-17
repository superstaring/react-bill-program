# react-bill-program 记账单功能

## 路径解析配置

1.安装 craco

`npm i -D @craco/craco`

2.项目根目录下创建配置文件

`craco.config.js`

3.配置文件中添加路径解析配置

4.包文件中配置启动和打包命令

## vscode 的联想路径配置（vscode 会自动读取配置帮助我们自动联想提示）

1.根目录下新增配置文件

`jsconfig.json`

2.添加路径提示配置

## 数据 Mock

`json-server`工具

1.项目中安装 json-server

`npm i -D json-server`

2.准备一个 json 文件

3.添加启动命令

### antd-mobile

#### 全局定制：整个应用范围内的组件都生效

:root:root {
--adm-color-primary: #a062d4;
}

`<Button color="primary">全局样式定制</Button>`

#### 局部定制：只在某些元素内部的组件生效

.purple-theme {
--adm-color-primary: #a062d4;
}

    <div className="purple-theme">
      <Button color="primary">局部样式定制</Button>
    </div>

## 命令合并

"start": "craco start & npm run server"

## 使用 antD 的 TabBar 标签栏组件进行布局以及路由的切换

`npm install -D sass`

## 按月进行分组

`npm install lodash`

    import _ from "lodash";
    const monthGroup = useMemo(() => {
      return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
    }, [billList])
