<template>
  <div>
    <div class="container">
      <p>
        <img src="/static/tiresias.png" />
      </p>
      <h1 class="logo-font">
        Tiresias
      </h1>
      <h3>
        Tiresias
      </h3>
      <p>
        <a href="/docs">
          Documents
        </a>
      </p>
      <h4>
        tiresias core
      </h4>
      <p>
        <a href="https://github.com/kerwin0104/tiresias" target="_blank">
          tiresias
        </a>
        <a href="https://github.com/kerwin0104/tiresias-webpack" target="_blank">
          tiresias-webpack
        </a>
        <a href="https://github.com/kerwin0104/tiresias-cli" target="_blank">
          tiresias-cli
        </a>
      </p>
      <h4>
        tiresias other template
      </h4>
      <p>
        <a href="https://github.com/kerwin0104/tiresias-hbs-template" target="_blank">
          tiresias-hbs-template
        </a>
        <a href="https://github.com/kerwin0104/tiresias-template" target="_blank">
          tiresias-template
        </a>
        <a href="https://github.com/kerwin0104/tiresias-custom-template" target="_blank">
          tiresias-custom-template
        </a>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'hello-tiresias-vue',
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
  .logo-font {
    font-family: 'Brush Script MT';
    font-size: 50px;
  }
  html, body {
    margin: 0;
    padding: 0;
  }
  body {
    background: #eee;
  }
  a {
    margin: 0 10px;
    &:link {
      color: #a00909;
    }
    &:hover{
      opacity: .6;
    }
    &:visited {
      color: #a00909;
    }
  }
  .container {
    width: 500px;
    margin: 0 auto;
    text-align: center;
    img {
      margin: 10px 0;
    }
    h1 {
      margin: 10px auto;
    }
  }
</style>
