<template>
  <div class="xm-center">
    <div class="title">{{title}}</div>
    <div class="box">
      <div v-for="(item,index) in list" :key="item.id">
        <div v-if="index===0" class="pro-first">
          <div class="first-shadow"></div>
          <img :src="item.picUrl" alt />
        </div>
        <div v-else class="pro-each">
          <img :src="item.picUrl" alt />
          <div class="pro-name">{{item.productName}}</div>
          <div class="pro-sub">{{item.subTitle}}</div>
          <div class="pro-price">￥{{item.salePrice.toFixed(2)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "XmProducts",
  props: {
    title: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default: () => []
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
  border-radius: 8px;
  overflow: hidden;
  margin: 20px auto;
}

.title {
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
.box {
  overflow-x: hidden;
}
.pro-first {
  float: left;
  width: 50%;
  height: 430px;
  position: relative;
  img {
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: block;
  }
  .first-shadow {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: all 0.15s ease-out;
  }
  .first-shadow:hover {
    background: rgba(0, 0, 0, 0.04);
  }
}
.pro-each {
  float: left;
  background: white;
  width: 25%;
  height: 430px;
  overflow-y: hidden;
  transition: all 0.5s linear;
  text-align: center;
  cursor: pointer;
  img {
    overflow: hidden;
    margin: 50px auto 10px;
    width: 206px;
    height: 206px;
    display: block;
  }
  .pro-name {
    line-height: 1.2;
    font-size: 16px;
    color: #424242;
    padding: 10px 0;
  }
  .pro-sub {
    line-height: 1.2;
    font-size: 12px;
    color: #d0d0d0;
    padding: 16px 0;
  }
}
.pro-each:hover {
  transform: translateY(-3px);
  box-shadow: 1px 1px 20px #999;
}
</style>
