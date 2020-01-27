<template>
  <div class="header-container">
    <div class="header-top">
      <div ref="headerTop" class="xm-center header-top-box flex">
        <div>
          <i class="logo"></i>
        </div>
        <div>
          <Input suffix="ios-search" placeholder="Enter text" style="width: auto" />
        </div>
        <div>全部商品</div>
        <div>捐赠</div>
        <div ref="control" class="header-control flex">
          <div>
            <i class="icon-user"></i>
          </div>
          <div>
            <i class="icon-cart"></i>
          </div>
        </div>
      </div>
    </div>
    <div :class="flag?'inFixed':'inTop'" class="header-bottom">
      <div ref="headerBottom" class="header-bottom-box flex xm-center">
        <ul class="header-nav flex">
          <li
            class="nav-each"
            v-for="item in nav"
            :key="item.id"
            :class="item.path===$route.path?'nav-weight':''"
            @click="jump(item.path)"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "XmHeader",
  props: {},
  data() {
    return {
      nav: [
        {
          name: "首页",
          path: "/"
        },
        {
          name: "全部",
          path: "/goods"
        },
        {
          name: "品牌周边",
          path: ""
        },
        {
          name: "捐赠名单",
          path: ""
        },
        {
          name: "后台管理系统",
          path: ""
        },
        {
          name: "XPay支付系统",
          path: ""
        },
        {
          name: "XBoot开发平台",
          path: ""
        },
        {
          name: "宣传视频",
          path: ""
        },
        {
          name: "Github",
          path: ""
        },
        {
          name: "商用授权",
          path: ""
        }
      ],
      flag: false
    };
  },
  computed: {},
  created() {},
  mounted() {
    window.addEventListener("scroll", () => {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      console.log(scrollTop);
      if (scrollTop > 100) {
        this.flag = true;
        this.$refs.headerBottom.append(this.$refs.control);
      } else {
        this.flag = false;
        this.$refs.headerTop.append(this.$refs.control);
      }
    });
  },
  watch: {},
  methods: {
    jump(item) {
      if (item !== "") {
        if (item === this.$route.path) {
          // this.$router.go(0);
        } else {
          this.$router.push(item);
        }
      } else {
        this.$Message.error("功能开发中！敬请期待");
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.header-container {
  width: 100%;
  .header-top {
    width: 100%;
    height: 100px;
    background: black;
    .header-top-box {
      padding: 30px 0;
      .logo {
        background: url("../../assets/xm-logo.png") no-repeat 50%;
        background-size: cover;
        display: block;
        width: 50px;
        height: 40px;
        background-position: 0 0;
      }
      .header-control {
        position: absolute;
        right: 0;
        height: 20px;
        padding: 10px;
      }
    }
  }
  .inTop {
    height: 90px;
    .header-bottom-box {
      padding: 31px 0;
    }
  }
  .inFixed {
    height: 60px;
    position: fixed;
    top: 0;
    .header-bottom-box {
      padding: 16px 0;
      .header-control {
        position: absolute;
        right: 0;
        height: 20px;
        padding: 4px;
      }
    }
  }
  .header-bottom {
    width: 100%;
    background: white;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    .header-nav {
      .nav-each {
        line-height: 28px;
        padding: 0 10px;
        font-size: 14px;
        cursor: pointer;
      }
      .nav-weight {
        font-weight: 700;
      }
    }
  }
}
</style>
