<template>
  <div>
    <TopBar></TopBar>
    <LeftNav></LeftNav>
    <div class="content">
      <router-view /> 
    </div>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import TopBar from './components/TopBar'
import LeftNav from './components/LeftNav'
import BottomBar from './components/BottomBar'

export default {
  name: 'App',
  data () {
    return {}
  },
  components: { 
    TopBar,
    LeftNav ,
    BottomBar
  },
}
</script>

<style lang="less">
  html, body {
    margin: 0;
    padding: 0;
  }
  body {
    background: #eee;
  }
  .clearfix {
    *zoom: 1;
    &:after {
      content: '';
      height: 0;
      overflow: hidden;
      display: block;
      clear: both;
    }
  }
  a {
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
</style>
