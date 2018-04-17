<template>
    <div class="tab">
        <div class="tab-item">
            <router-link to="/goods" active-class="active">商品</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/ratings" active-class="active">评论</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/seller" active-class="active">商家</router-link>
        </div>
    </div>
</template>
<script>
    export default {}
</script>

<style lang="scss">
.app {
  .tab {
    display: flex;
    height: 40px;
    line-height: 40px;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    .tab-item {
      flex-grow: 1;
      > a {
        display: block;
        font-size: 14px;
        color: rgb(77,85,93);
        &.active {
          color: rgb(240,20,20);
        }
      }
    }
  }
}
</style>