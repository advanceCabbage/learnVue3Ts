#### 1.父组件传递多个参数给子组件时精简写法 v-bind="params"
##### 父组件传的参数为多个参数拼接时，父组件属性传的时候，使用content-abc这种命名，子组件接的时候使用contentAbc命名接收
```
const app = Vue.createApp({
  data(){
    return{
      params:{
        a:1,
        b:2,
        c:3,
        d:4
      }
    }
  }
})
<parent v-bind="params"></parent>
v-bind="params" 等价于 :a="params.a" :b="params.b" :c="params.c" 
```
#### 2.父子组件通讯时，可在子组件的emits中管理向外触发的emit方法，提高代码的可维护性，便于阅读当前子组件一共触发了哪些事件
```
app.component("Child",{
  emits:['add'], // 当前子组件向外触发的事件是add
  methods:{
    handleClick(){
      this.$emit('add',this.count+3)
    }
  }
})
```
#### 3.子组件利用update更新父组件的值，相对于emit更新数据，写法更加简洁
```
const app = Vue.createApp({
  data(){
    return { count:1 }
  },
  template:`<counter v-model:count="count">`  // v-model传值
})

app.component('counter',{
  props:[count],
  methods:{
    handleClick(){
      this.$emit('update:count',this.count + 3) // update更新数据，
    }
  },
  template:`<div @click="handleClick">{{count}}</div>`
})
```
#### 4.具名插槽的简写 v-slot:header   || #header
```
  const app = Vue.createApp({
    template:`<layout> 
                <template v-slot:header>
                    <div>header</div>
                </template> 
              </layout>`
  })

  // 或者下面这样使用#header简写
  const app = Vue.createApp({
    template:`<layout> 
                <template #header>
                    <div>header</div>
                </template> 
              </layout>`
  })

  app.component('layout',{
    template:`<div> <slot name="header"></slot>  </div>`
  })
```

#### 5.作用域插槽：解决子组件渲染的数据需要由父组件决定时的场景
```
  const app = Vue.createApp({
    template:`
                <list v-slot="slotProps"> 
                    <div>{{slotProps.item}}</div>
                </list>
    `
  })

  app.component('list',{
    data(){
      return {
        list:[1,2,3]
      }
    },
    template:`
      <div>
          <slot v-for="item in list" :item="item" />
      </div>
    `
  })
```
#### 6.过渡和动画
*过渡是指从一个状态过渡到另一个状态例如：背景颜色的变化从一个颜色到另外一个颜色*；
*动画是指从一个位置到另外一个位置的变化*
#### 7.mixin混入介绍（Vue3.0不推荐使用mixin）
- *组件data，methods优先级高于mixin data，methods优先级*
- *生命周期函数，先执行mixin里面的，再执行组件里面的*
- *自定义的属性，组件中的属性优先级高于mixin属性的优先级*
```
  const myMixin = {
    data(){
      return{
        count:1
      }
    },
    created(){
      consosle.log('mixin created')
    },
    number:1,
  }
  const app = Vue.createApp({
    data(){
      return{
        count:2,// 此时组件内的count值优先级更高
      }
    },
    number:2,
    mixins:[myMixin],
    created(){
      consosle.log("created");// 此时会先执行mixin中的created
    },
    template:`<div>{{count}}-{{this.$options.number}}</div>`
  })

  // 通过this.$options.number访问到自定义的属性，可以通过app.config.optionMergeStrategies修改自定义属性合并策略,使得自定义属性优先考虑mixin中的值

  app.config.optionMergeStrategies.number = (mixinVal,appValue)=>{
    return mixinVal || appValue
  }

``` 
#### vue plugin插件，也是把通用性的功能封装起来
```
  const myPlugin = {
    install(app,options){
      app.provide('name','Dell Lee');
      app.directive('focus',{
        mounted(el){
          el.focus()
        }
      })
    }
  }

  app.component('my-title',{
    reject:['name']
  })

  app.use(myPlugin,{name:'dell'})
```

