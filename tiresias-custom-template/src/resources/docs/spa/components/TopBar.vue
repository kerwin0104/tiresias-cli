<template>
  <div class="top-bar">
    <a href="/" class="logo">
      Tiresias
    </a>
  </div>
</template>
<script>
export default {
  name: 'TopBar',
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
  .top-bar {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #eee;
    box-shadow: 0 0 20px #aaa;
    overflow: hidden;
    position: fixed;
    top: 0;
    z-index: 1;
    .logo {
      color: #333;
      text-decoration: none;
      font-family: 'Brush Script MT';
      font-size: 35px;
      margin-left: 20px;
      float: left;
    }
    .nav {
      float: right;
      a {
        margin: 0 20px;
      }
    }
  }
</style>
