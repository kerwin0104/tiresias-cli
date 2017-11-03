<template>
  <div class="left-nav">
    <dl>
      <dt>
        tiresias-cli
      </dt>
      <dd>
        <ul>
          <li>
            <router-link to="/tiresias-cli" @click.native="scrollToElement">
              概述
            </router-link>
            <ul>
              <li>
                <router-link to="/quick-start" @click.native="scrollToElement">
                  快速开始
                </router-link>
              </li>
            </ul>
          </li>
          <li>
            <router-link to="/install-tiresias" @click.native="scrollToElement">
              安装
            </router-link>
          </li>
          <li>
            <router-link to="/tiresias-init" @click.native="scrollToElement">
              创建项目
            </router-link>
          </li>
          <li>
            <router-link to="/tiresias-dir" @click.native="scrollToElement">
              目录结构
            </router-link>
          </li>
          <li>
            <router-link to="/tiresias-run-dev" @click.native="scrollToElement">
              开发项目
            </router-link>
            <ul>
              <li>
                <router-link to="/server-base-demo" @click.native="scrollToElement">
                  服务器端基础示例
                </router-link>
              </li>
              <li>
                <router-link to="/server-template-demo" @click.native="scrollToElement">
                  服务器端模板
                </router-link>
              </li>
              <li>
                <router-link to="/server-url-vars-demo" @click.native="scrollToElement">
                  语义化URL
                </router-link>
              </li>
              <li>
                <router-link to="/server-html-demo" @click.native="scrollToElement">
                  纯HTML文件
                </router-link>
              </li>
              <li>
                <router-link to="/server-resource-demo" @click.native="scrollToElement">
                  静态资源引入
                </router-link>
              </li>

              <li>
                <router-link to="/server-project-config" @click.native="scrollToElement">
                  项目配置文件
                </router-link>
              </li>

            </ul>
          </li>
          <li>
            <router-link to="/tiresias-run-prod" @click.native="scrollToElement">
              构建项目
            </router-link>
          </li>
        </ul>
      </dd>
    </dl>
  </div>
</template>
<script>
// t（time） b（beforeMove）c（changeDistance）d（duration）
function ease (t, b, c, d){
  return c*t/d + b;
}
export default {
  name: 'hello-tiresias-vue',
  data () {
    return {}
  },
  methods: {
    scrollToElement (e) {
      var id = e.target.getAttribute('href').replace('#/', '')
      var dom = document.getElementById(id)
      if (dom) {
        var endPos = dom.offsetTop - 50 - 20
        var startTime = +new Date
        var beforeMove = document.documentElement.scrollTop || document.body.scrollTop
        var changeDistance = endPos - beforeMove
        var duration = 150
        var timer = setInterval(() => {
          var time = +new Date - startTime
          if (time > duration) {
            time = duration
          }
          var pos = ease(time, beforeMove, changeDistance, duration)
          document.documentElement.scrollTop = document.body.scrollTop = pos
          if (pos === endPos) {
            clearInterval(timer)
          }
        }, 18)
      }
    }
  },
  mounted () {
    var leftNav = document.getElementsByClassName('left-nav')[0]
    var a = leftNav.getElementsByTagName('a')
    var map = [].slice.call(a).filter(item => {
      if (item.getAttribute('href').indexOf('#') === 0) {
        return true
      }
      return false
    }).map(item => {
      return item.getAttribute('href').replace('#/', '')
    })
    var len = map.length
    
    window.onscroll = () => {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      for (var i=0; i<len; i++) {
        var id = map[i]
        var dom = document.getElementById(id)
        if (dom && dom.offsetTop > scrollTop) {
          location.href = '#/' + id
          break
        }
      } 
    }
  }
}
</script>
<style lang="less">
  .left-nav {
    padding: 0 20px;
    width: 230px;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    padding-top: 50px;
    box-sizing: border-box;
    dl {
      dt {
        font-weight: bold;
      }
      dd {
        margin: 0;
        ul {
          padding: 0;
          margin: 0;
          margin-left: 20px;
          li {
            list-style: none;
          }
        }
      }
    }
    a {
      line-height: 30px;
      font-size: 12px;
      text-decoration: none;
    }
    .router-link-active {
      color: #333;
      font-weight: bold;
    }
  }
</style>
