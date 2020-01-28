<template>
  <div class="header-container">
    <div class="header-top">
      <div ref="headerTop" class="xm-center header-top-box flex">
        <div>
          <i class="logo"></i>
        </div>
        <div class="header-search">
          <Input
            suffix="ios-search"
            v-model="keyword"
            @on-change="search(keyword)"
            @on-blur="onBlur"
            @on-focus="show=true"
            placeholder="请输入商品信息"
            style="width: auto"
          />
          <div class="search-result" v-if="searchList.length>0&&show">
            <div
              v-for="item in searchList"
              :key="item.id"
              @click="godetail(item.productId)"
            >{{ item.productName }}</div>
          </div>
        </div>
        <div class="header-link-box">
          <div class="top-link"  @click="jump('/goods')">全部商品</div>
          <div class="top-link" @click="jump('')">捐赠</div>
          <div>|</div>
        </div>
        <div ref="control" class="header-control flex">
          <div class="icon">
            <Poptip trigger="hover" title="Title" content="content">
              <i class="iconfont icon-yonghu"></i>
            </Poptip>
          </div>
          <div class="icon">
            <i class="iconfont icon-gouwuche"></i>
            <div class="cart-num">{{cartNum}}</div>
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
      flag: false,
      searchList: [],
      keyword: "",
      show: false
    };
  },
  computed: {
    cartNum() {
      if (localStorage.getItem("shopcart")) return count.length;
      else return 0;
    }
  },
  created() {},
  mounted() {
    window.addEventListener("scroll", () => {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
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
    },
    search(keyword) {
      if (keyword !== "") {
        this.$api.searchKeyword(keyword).then(res => {
          if (res.code === 200) {
            this.searchList = res.data;
          }
        });
      } else {
        this.searchList = [];
      }
    },
    godetail(id) {
      this.$router.push({ name: "detail", params: { id: id } });
    },
    onBlur() {
      setTimeout(() => {
        this.show = false;
      }, 200);
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
      .header-search {
        position: relative;
        left: 40%;
        margin-top: 5px;
        /deep/.ivu-input {
          width: 258px;
          height: 30px;
        }
        .search-result {
          position: absolute;
          background: white;
          width: 258px;
          padding: 10px;
          border-radius: 5px;
          z-index: 99;
          border: 1px solid gray;
        }
      }
      .header-control {
        height: 40px;
      }
      .header-link-box {
        position: absolute;
        right: 150px;
        display: flex;
        :nth-last-child(1) {
          line-height: 40px;
        }
      }
      .top-link {
        width: 110px;
        color: #c8c8c8;
        display: block;
        font-size: 14px;
        line-height: 40px;
        padding: 0 25px;
        cursor: pointer;
      }
      .top-link:hover {
        color: white;
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
      padding: 10px 0;
      .icon:hover {
        color: black;
      }
    }
    .nav-each {
      line-height: 40px !important;
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
  .header-control {
    position: absolute;
    right: 0;
    height: 20px;
    .icon {
      padding-top: 6px;
      // overflow: hidden;
      margin-left: 50px;
      color: #999999;
      cursor: pointer;
    }
    .icon:hover {
      color: white;
    }
    .icon-yonghu {
      font-size: 20px;
      line-height: 28px;
    }
    .icon-gouwuche {
      font-size: 22px;
      line-height: 28px;
      margin-right: 10px;
    }
    .cart-num {
      overflow: hidden;
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
      color: white;
      background: #969696 !important;
      background-image: linear-gradient(#a4a4a4, #909090);
      box-shadow: inset 0 0 1px #838383, 0 1px 2px #838383;
    }
  }
}
</style>
