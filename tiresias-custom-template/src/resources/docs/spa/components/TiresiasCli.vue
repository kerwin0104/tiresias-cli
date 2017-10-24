<template>
  <div class="right-container">
      <div class="block">
        <div class="title" id="tiresias-cli">
          概述
        </div>
        <div class="content">
          <p>
            <em>tiresias-cli</em> 是 <em> tiresias</em> 项目的命令行客户端，用于 
            <em>创建</em>、
            <em>开发</em>、
            <em>构建</em>
            tiresias项目。
          </p>
          <div class="sub-title" id="quick-start">
            快速开始
          </div>
          <p>
            您可以通过以下命令快速上手一个tiresias项目。
          </p>
          <code>
            <div>
              sudo npm install -g tiresias-cli  // 安装tiresias命令行工具
            </div>
            <div>
              tss init test-project         // 初始化一个名为 test-project 的项目
            </div>
            <div>
              cd test-project              // 进入项目目录
            </div>
            <div>
              tss run dev                  // 启动测试服务器，命令行工具将自动打开浏览器
            </div>
            <div>
              tss run prod                 // 编译生产环境项目
            </div>
            <div>
              cd dist                      // 进入构建结果文件夹
            </div>
            <div>
              npm install                  // 安装依赖
            </div>
            <div>
              node index.js                // 启动生产环境应用
            </div>
          </code>
        </div>
      </div>

      <div class="block">
        <div class="title" id="install-tiresias">
          安装
        </div>
        <div class="content">
          <p>
            你可以通过npm来安装最新的tiresias客户端
          </p>
          <code>
            sudo npm install -g tiresias-cli
          </code>
          <p>
            安装后可以通过下面的命令测试是否安装成功:
          </p>
          <code>
            tiresias -V
          </code>
          <p>
            或
          </p>
          <code>
            tss -V
          </code>
          <p>
            <em>tss</em> 是 <em>tiresias</em> 命令的简写，拥有完全一样的功能。
          </p>
        </div>
      </div>

      <div class="block">
        <div class="title" id="tiresias-init">
          创建项目
        </div>
        <div class="content">
          <code>
            tiresias init yourProjectName  
          </code>
          <p>
            tiresias当前所在目录下建立一个名字为 <em>yourProjectName</em> 的文件夹。这个文件夹就是项目录。 <br>
            里面初始化了 <em>src</em> 目录，普通tiresias项目可以直接在src目录中编写代码即可。 <br>
            如果您需要自定义node.js服务器和webpack打包配置的项目，您可以通过 <em>tiresias init yourProjectName</em> 后面加 <em>--custom</em>(或缩写<em>-c</em>) 参数来初始化项目。 <br>
          </p>
        </div>
      </div>


      <div class="block">
        <div class="title" id="tiresias-dir">
          目录结构
        </div>
        <div class="content">
          <p>
            使用 <em>tiresias init yourProjectName</em> 创建的项目目录结构为以下形式:
          </p>
          <blockquote>
            <pre>
  src -|- actions    // 服务器端用于处理请求的js脚本
       |- pages      // 渲染用的页面或者模板
       |- resources  // 页面或模板里使用的js/css/vue/images等文件
       |- static     // 静态文件目录，可以通过根路径(如"/static/img.png")的方式引用
            </pre>
          </blockquote>
          <p>
            如果您创建项目时加了 <em>--custom</em> (或 <em>-c</em> )参数（如<em>tiresias init yourProjectName --custom</em>）, 创建的项目目录结构为以下形式:
          </p>
          <blockquote>
            <pre>
  tiresias-custom-server  -|- // node.js 服务器目录
  tiresias-custom-webpack -|- // 构建项目用的webpack配置文件目录
                      src -|- actions    // 服务器端用于处理请求的js脚本
                           |- pages      // 渲染用的页面或者模板
                           |- resources  // 页面或模板里使用的js/css/vue/images等文件
                           |- static     // 静态文件目录，可以通过根路径(如"/static/img.png")的方式引用
            </pre>
          </blockquote>
          <p>
            您可以在 <em>tiresias-custom-server</em> 目录中编辑修改node.js服务器代码，在 <em>tiresias-custom-webpack</em> 目录中修改webpack打包配置。<br>
            由 <em>--custom</em> 参数创建的项目在 <em>开发项目</em> 阶段和 <em>构建项目</em> 阶段都需要添加 <em>--custom</em> 参数来进行构建，否则只会以最基础的方式构建。
          </p>
        </div>
      </div>

      <div class="block">
        <div class="title" id="tiresias-run-dev">
          开发项目
        </div>
        <div class="content">
          <code>
            tiresias run dev
          </code>
          <blockquote>
            在项目文件夹初始化之后，进入项目所在目录，运行 <em>tiresias run dev</em> 即可启动 <em>开发服务器</em>，命令行会自动打开浏览器，并访问 <em>http://127.0.0.1:9999/</em>。 <br>
            您可以编辑 <em>src</em> 目录中的源码文件，文件会被自动编译、发布到开发服务器，然后刷新浏览器即可看到修改结果。 <br>
            测试服务器的实时编译基于webpack，只检测文件改变。即新增文件不会被监控，删除文件会导致监测文件不存在而出错，所以新增或者删除文件之后，需要重启测试服务器。 <br>
          </blockquote>
          <p>
            tiresias的服务器，在访问一个路径之后，会以以下顺序查找模板：
          </p>
          <code>
            <div>
              1. 在actions目录中查找，是否有对应路径的action来处理  
            </div>
            <div>
              2. 若上一步没有找到对应的处理文件，则在pages目录中找对应路径下有没有index.html文件
            </div>
          </code>
          <div id="server-base-demo" class="sub-title">
            服务器端基础示例:
          </div>
          <p>
            假设用户访问的路径是 <em>http://服务器域名/find/my/file</em>，那么tiresias的服务器将先查找 <em>actions/find/my/file/index.js</em> 文件。 <br>
            如果您希望服务器端来处理这个请求，那么您需要这样编写 <em>actions/find/my/file/index.js</em>  文件：
          </p>
          <code>
            <pre>
    function action (req, res) {
      res.send('I am "actions/find/my/file/index.js", I dispose all request methods(get/post/put/delete).')
    }
    module.exports = action
            </pre>
          </code>
          <p>
            或
          </p>
          <code>
            <pre>
    const action {}
    action['get'] = (req, res) => {
      res.send('I am "actions/find/my/file/index.js", I only dispose get request methods.')
    }
    action['post'] = (req, res) => {
      res.send('I am "actions/find/my/file/index.js", I only dispose post request methods.')
    }
    action['put'] = (req, res) => {
      res.send('I am "actions/find/my/file/index.js", I only dispose put request methods.')
    }
    action['delete'] = (req, res) => {
      res.send('I am "actions/find/my/file/index.js", I only dispose delete request methods.')
    }
    module.exports = action
            </pre>
          </code>
          <p>
            如果 <em>actions/find/my/file/index.js</em> 模块导出(module.exports)的是一个函数。<br>
            那么这个函数将处理 <em>http://服务器域名/find/my/file</em> 路径下所有请求方式(get/post/put/delete)的请求。
          </p>
          <p>
            如果 <em>actions/find/my/file/index.js</em> 模块导出(module.exports)的是一个对象(Object)。<br>
            那么 <em>http://服务器域名/find/my/file</em> 路径下不同方式的请求(get/post/put/delete)讲分别交给导出对象的get/post/put/delete方法来处理。 <br>
            <em>如果导出对象只有get方法，那么服务器将只处理get方式的请求，其他请求将会返回404</em> 
          </p>
          <div id="server-template-demo" class="sub-title">
            服务器端模板
          </div>
          <p>
            如果您希望在服务器端使用模板，tiresias的服务器默认提供了 <a href="http://handlebarsjs.com" target="_blank">handebars</a> 模板。使用方式如下:
          </p>
          <p>
            假设我们需要创建的页面为 <em>http://服务器域名/demos/handlebars</em>
          </p>
          <code>
            <div>
              1. 新建 <em>actions/demo/handlebars/index.js</em> 文件，编写服务器端代码
            </div>
            <div>
              2. 新建 <em>actions/demo/handlebars/index.has</em> 文件，编写模板代码
            </div>
          </code>
          <div class="sub-title">
            示例文件如下：
          </div>
          <p>
            node.js文件：<em>actions/demo/handlebars/index.js</em>
          </p>
          <code>
            <pre>
    function action (req, res) {
      req.getTemplatePath((err, path) => {
        if (err) {
          res.send('template not found.') // or "throw err"
        } else {
          var data = {
            myVar: 'this is myVar from \'acitons/demos/handlebars/index.js\'.'
          }
          res.render(path, data)
        }
      })
    }
    module.exports = action
            </pre>
          </code>
          <p>
            模板文件：<em>pages/demo/handlebars/index.hbs</em>
          </p>
          <code>
            <pre  v-pre>
    &lt;!DOCTYPE html&gt;
    &lt;html lang="en"&gt;
    &lt;head&gt;
      &lt;meta charset="UTF-8"&gt;
      &lt;title&gt;handlebars template demo&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;h1&gt;
          handlebars
        &lt;/h1&gt;
        &lt;p&gt;
          myVar is "{{myVar}}"
        &lt;/p&gt;
        &lt;p&gt;
          &lt;div&gt;
            you can:
          &lt;/div&gt;
          &lt;div&gt;
            &lt;a href="/"&gt;to home page&lt;/a&gt;
          &lt;/div&gt;
          &lt;div&gt;
            &lt;a href="/docs"&gt;to docs page&lt;/a&gt;
          &lt;/div&gt;
          &lt;div&gt;
            &lt;a href="/demos/kerwin/home"&gt;to req.tiresias.params page&lt;/a&gt;
          &lt;/div&gt;
        &lt;/p&gt;
    &lt;/body&gt;
    &lt;/html&gt;
            </pre>
          </code>
          <p>
            您可以查看我们的 <a href="/demos/handlebars" target="_blank">Handlebars Demo</a>
          </p>

          <div id="server-url-vars-demo" class="sub-title">
            语义化URL
          </div>
          <blockquote>
            很多时候我们需要使用 <em>语义化的URL</em>。更有利于搜索引擎的抓取。<br>
            比如，我们需要访问在社交网站访问kerwin的首页，我们的URL可能会是 <em>http://服务器域名/demos/kerwin/home</em>。但是，当我们想访问pony的首页时，URL又变成了 <em>http://服务器域名/demos/pony/home</em> <br>
            tiresias提供了url变量的方式来解决此类需求。在需要接收变量的路径，目录名字改为"下划线+变量名"(<em>_变量名</em>)，然后在action文件中，通过<em>req.tiresias.params.变量名</em>的方式获取到真实的URL变量(kerwin/pony等)。
          </blockquote>
          <div class="sub-title">
            示例文件如下:
          </div>
          <p>
            node.js文件：<em>actions/demo/_username/home/index.js</em>
          </p>
          <code>
            <pre> 
    function action (req, res) {
      req.getTemplatePath((err, path) => {
        if (err) {
          res.send('template not found.') // or "throw err"
        } else {
          var data = {
            myVar: 'this is myVar from \'acitons/demos/_username/home/index.js\'.',
            params: req.tiresias.params
          }
          res.render(path, data)
        }
      })
    }
    module.exports = action
            </pre> 
          </code>
          <p>
            模板文件：<em>actions/demo/_username/home/index.hbs</em>
          </p>
          <code>
            <pre v-pre> 
    &lt;!DOCTYPE html&gt;
    &lt;html lang="en"&gt;
    &lt;head&gt;
      &lt;meta charset="UTF-8"&gt;
      &lt;title&gt;handlebars template demo&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;h1&gt;
          handlebars
        &lt;/h1&gt;
        &lt;h2&gt;
          Hello, {{params.username}}
        &lt;/h2&gt;
        &lt;p&gt;
          &lt;div&gt;
            &lt;a href="/demos/kerwin/home"&gt;login kerwin.&lt;/a&gt;
          &lt;/div&gt;
          &lt;div&gt;
            &lt;a href="/demos/pony/home"&gt;login pony.&lt;/a&gt;
          &lt;/div&gt;
          &lt;div&gt;
            &lt;a href="/demos/jim/home"&gt;login jim.&lt;/a&gt;
          &lt;/div&gt;
          &lt;div&gt;
            &lt;a href="/demos/andy/home"&gt;login andy.&lt;/a&gt;
          &lt;/div&gt;
        &lt;/p&gt;
        &lt;p&gt;
          myVar is "{{myVar}}"
        &lt;/p&gt;
        &lt;p&gt;
          &lt;div&gt;
            you can:
          &lt;/div&gt;
          &lt;div&gt;
            &lt;a href="/"&gt;to home page&lt;/a&gt;
          &lt;/div&gt;
          &lt;div&gt;
            &lt;a href="/docs"&gt;to docs page&lt;/a&gt;
          &lt;/div&gt;
          &lt;div&gt;
            &lt;a href="/demos/handlebars"&gt;to handlebars demo&lt;/a&gt;
          &lt;/div&gt;
        &lt;/p&gt;
    &lt;/body&gt;
    &lt;/html&gt;
            </pre> 
          </code>
          <p>
            您可以查看我们的 <a href="/demos/kerwin/home" target="_blank">Handlebars URL Vars Demo</a>
          </p>

          <div id="server-html-demo" class="sub-title">
            纯HTML文件
          </div>

          <blockquote>
            <div>
              · 用户的请求在 <em>actions</em> 中没有找到对应的 <em>index.js</em> 处理文件的话，就会在 <em>pages</em> 中查找对应的 <em>index.html</em> 文件，如果查找不到对应的 <em>index.html</em>文件，则会跳转到404. 
            </div>
           <div>
              · 只有 <em>acitons</em> 文件夹中的 <em>index.js</em> 文件 和 <em>pages</em> 文件夹中的 <em>.html</em>扩展名的文件可以用来处理用户请求。 <em>pages</em>文件夹中的非 <em>.html</em>扩展名的文件都会被作为模板文件被隐藏，不可对外提供访问。
           </div>
           <div>
             · 纯HTML文件不支持URL变量。所以，如果您需要使用URL变量，则必须有对应的 <em>action</em> 文件和模板渲染。
           </div>
          </blockquote>
          <p>
            <a href="/demos/html" target="_blank">纯HTML示例</a>
          </p>
            
          <div class="sub-title" id="server-resource-demo">
            静态资源引入
          </div>
          <blockquote>
            绝大多数应用页面都需要引入js、css等静态资源。<br>
            <em>tiresias</em>中，所有的html页面和模板页面，都会默认引入 <em>resources</em> 目录中对应路径下的main.js，如果需要在页面中引入其他js和css文件，只需要在main.js中import或者require的方式引入即可(css文件会被自动抽出，可在webpack配置文件中修改定制)。<br>
            例： 我们有一个html页面 <em>page/demos/resource/index.html</em>，需要引入静态资源。那么建立一个 <em>resources/demos/resource/main.js</em> 文件即可，不需要手动引入。<br>
          </blockquote>
          <p>
            开发期间(tiresias run dev)的资源编译结果和生产环境(tiresias run prod)的资源编译结果略有不同。
          </p>
          <blockquote>
            · 开发期间的所有css都不会被抽出到独立css文件，而是js动态插入style标签<br>
            · 所有以 <em>相对路径形</em> 式引入的图片，在生产环境编译的时候，都会被默认做压缩优化<br>
          </blockquote>
          <p>
            <a href="/demos/resource" target="_blank">静态资源引入示例</a>
          </p>

        </div>
      </div>

      <div class="block">
        <div class="title" id="tiresias-run-prod">
          构建项目
        </div>
        <div class="content">
          <p>
            开发完毕的tiresias项目需要编译成基于Express的nodejs项目。如果你那创建项目的时候使用的是 <em>tiresias init yourProjectName</em>，那么您需要使用 <em>tiresias run prod</em>来构建。如果您创建项目的时候使用的是 <em>tiresias init yourProjectName --custom</em>，那么您需要使用 <em>tiresias run pord --custom</em>。<br>
            编译结果在项目根目录下的 <em>dist</em> 文件夹中。您可以执行 <em>node index.js</em>来启动它。在启动之前记得执行 <em>npm install</em> 安装所需的依赖。
          </p>
        </div>
      </div>








  </div>
</template>
<script>
export default {
  name: 'TiresiasCli',
  data () {
    return {}
  }
}
</script>
<style lang="less">
  .right-container {
    padding-top: 50px;
    margin-left: 230px;
    .block {
      margin: 50px auto;
      line-height: 40px;
      .title {
        font-size: 18px;
        font-weight: bold;
        &:before {
          content: '#';
          display: block;
          float: left;
          line-height: 40px;
          color: #a00909;
          margin-right: 5px;
        }          
      }
      .sub-title {
        margin-top: 10px;
        margin-left: 20px;
        color: #a00909;
      }
      p {
        margin: 0;
        margin-left: 20px;
      }
      code {
        display: block;
        background: #fff;
        padding: 5px 15px;
        margin-left: 20px;
        margin-right: 100px;
        border-radius: 4px;
        opacity: .7;
        position: relative;
        &:after {
          content: 'code';
          position: absolute;
          right: 5px;
          top: 5px;
          line-height: 14px;
          height: 14px;
          color: #ccc;
        }
        pre {
          line-height: 16px;
          margin: 0;
          padding: 0;
          padding-top: 16px;
        }
      }
      em {
        background: #fff;
        padding: 0 5px;
        color: #a00909;
        border-radius: 4px;
        opacity: .7;
      }
      blockquote {
        opacity: .7;
        padding: 5px 20px;
        margin-left: 20px;
        margin-right: 100px;
        display: block;
        background: #fff;
        border-left: 3px solid #a00909;
        pre {
          line-height: 24px;
          margin: 0;
          padding: 0;
          padding-top: 24px;
        }
      }
    } 
  }
</style>
