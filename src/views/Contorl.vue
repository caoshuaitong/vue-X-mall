<template>
  <div class="xm-center">
    <div class="contorl-left">
      <img src="../assets/logo.png" alt />
      <div>{{username}}</div>
      <div
        v-for="item in usercontorl"
        :key="item.id"
        @click="gocontorl(item.path)"
        :class="actived===item.path?'actived':''"
        class="aside-each"
      >{{ item.title }}</div>
    </div>
    <div class="contorl-right"></div>
  </div>
</template>

<script>
export default {
  name: "Contorl",
  props: {},
  data() {
    return {
      usercontorl: [
        {
          title: "我的订单",
          path: "orderList"
        },
        {
          title: "账号资料",
          path: "information"
        },
        {
          title: "收货地址",
          path: "addressList"
        },
        {
          title: "我的优惠",
          path: "coupon"
        },
        {
          title: "售后服务",
          path: "support"
        },
        {
          title: "以旧换新",
          path: "aihuishou"
        }
      ],
      actived: "orderList"
    };
  },
  computed: {
    username() {
      return this.$store.state.username;
    }
  },
  created() {},
  mounted() {
    this.actived = this.$route.query.id;
    console.log(this.actived);
  },
  watch: {},
  methods: {
    gocontorl(path) {
      if (path !== this.$route.query.id) {
        this.$router.push({ name: "contorl", query: { id: path } });
        this.actived = path;
      }
    }
  },
  components: {},
  filters: {}
};
</script>

<style scoped lang="scss">
.contorl-left {
  width: 210px;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
}
.aside-each {
  text-align: center;
  width: 100%;
  height: 48px;
  border-top: 1px solid #ebebeb;
  line-height: 48px;
  font-style: normal;
  text-decoration: none;
  color: #5079d9;
  cursor: pointer;
  transition: all 0.15s ease-out;
  &:hover {
    background-color: #98afee;
    color: white;
  }
}
.actived {
  background-color: #98afee;
  color: white;
}
</style>
