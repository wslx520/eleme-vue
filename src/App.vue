<template>
  <div id="app" class="app">
    <app-head :seller="seller"></app-head>
    <nav-bar></nav-bar>
    <div class="content">
      body
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/Header'
  import NavBar from './components/NavBar'
  const CODE_OK = 0;
export default {
  name: 'App',
  components: {
    'app-head' : Header,
    'nav-bar': NavBar
  },
  data() {
    return {
      seller: {}
    }
  },
  created() {
    const self = this;
    this.$http.get('/api/seller')
      .then((res) => {
        const data = res.data;
        if (data.errno === CODE_OK) {
          self.seller = data.data;
          console.log(self.seller);
        }
      })
  }
}
</script>

<style lang="scss">
  @import './common/font.css';
  @import './common/scss/base';
</style>
