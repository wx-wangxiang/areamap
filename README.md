## AddressMap

> a vue.js component

# 概述
主要用于全国地区数据的操作，包括省，市，区三级联动，地区数据的添加和删除；
在操作地区数据时，以前也用过树形的地区选择组件，但因其在再操作大量的地区数据时，渲染缓慢，所以我们就换了另一种数据展示形式和交互形式，从而就有了这个组件。
>注意：该组件是`vue.js`组件


# demo
抢鲜体验请点击这里[demo](https://wx-wangxiang.github.io/view/addressmap.html)

# API
## Props
| 参数 | 类型 | 说明 |
| ------- | ---------- | ---------- |
| area  | Array    | 传入组件的地区的数据 |
## Events
| 事件名 | 参数 | 说明 |
| ------- | -------- | -------- |
| selected | area | 组件中选中的地区 |

# 详细说明
## Props
### area
`area` 参数是必选项，表示组件初始化时的地区数据，可以为空。
`area` 是一个包含多个对象的数组，其中每个对象的数据结构如下:

```vue.js
...
area: [
    {Name: '北京',  ID: '01'},
    {Name: '南京', ID: '0401'},
    {Name: '西湖区', ID: '060105'}
],
...
```

因为后来在实际的使用中，发现有时候，后台只会返回一个地区的`ID`值，所以这里做了优化，可以只传入`ID`的值，比如这样：

```vue.js
...
area: [
    {ID: '01'},
    {ID: '0401'},
    {ID: '060105'}
],
...
```

### selected
`selected`是由组件内部发布的一个事件，你可以在组件外面订阅这个事件，从而得到它返回的值，这个值就是组件当前选中的所有的地区，返回的这个值是由多个包含地区数据的对象组成的数组，数据结构和 `area`参数一样
## 简单的例子
```html
<div>
     <addressmap :area="area" @selected="selected"></addressmap>
</div>
```
# 安装和使用
```javascript
npm install adc-addressmap
```

- 若作为全局组件使用

```javascript
//在项目入口文件
import Vue from 'vue'
import Addressmap from 'adc-addressmap'
Vue.component('Addressmap', Addressmap)
```

- 若作为局部组件

```javascript
//在某个组件中
import Addressmap from 'adc-addressmap'
export default {
...
  components: { Addressmap},
...
}
```
# 该组件后续功能的预告
- 结合百度的*ECharts*增加数据可视化的功能 