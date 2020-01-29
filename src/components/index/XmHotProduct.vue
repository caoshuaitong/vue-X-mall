<template>
  <div class="xm-center">
    <div class="hot-title">{{hotTitle}}</div>
    <div class="flex">
      <div class="hot-box" v-for="item in hotProductsList" :key="item.id">
        <div class="hot-each">
          <img :src="item.picUrl" alt />
          <div class="hot-name">{{item.productName}}</div>
          <div class="hot-sub">{{item.subTitle}}</div>
          <div>￥{{item.salePrice.toFixed(2)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "XmHotProduct",
  props: {
    hotProductsList: {
      type: Array,
      default: () => []
    },
    hotTitle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {},
  filters: {}
};
</script>

<style scoped lang="scss">
.xm-center {
  border: 1px solid #d4d4d4;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}
.hot-title {
  width: 100%;
  height: 60px;
  background: linear-gradient(#fbfbfb, #ececec);
  border-bottom: 1px solid #d4d4d4;
  font-size: 18px;
  font-weight: 400;
  color: #626262;
  line-height: 60px;
  padding: 0 20px;
}
.flex {
  overflow-y: hidden;
}
.hot-box {
  width: 50%;
  flex: 1;
  height: 430px;
  text-align: center;
  background: rgba($color: #999, $alpha: 0.1);
  .hot-each {
    background: white;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    transition: all 0.5s linear;
    cursor: pointer;
    img {
      overflow: hidden;
      margin: 50px auto 10px;
      width: 206px;
      height: 206px;
      display: block;
    }
    .hot-name {
      line-height: 1.2;
      font-size: 16px;
      color: #424242;
      padding: 10px 0;
    }
    .hot-sub {
      line-height: 1.2;
      font-size: 12px;
      color: #d0d0d0;
      padding: 16px 0;
    }
  }
  .hot-each:hover {
    transform: translateY(-3px);
    box-shadow: 1px 1px 20px #999;
  }
}
</style>
