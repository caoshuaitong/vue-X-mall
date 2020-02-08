<template>
  <div class="container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div v-show="cart.show" class="cartPic">
        <img :src="cart.pic" alt />
      </div>
    </transition>
    <Modal v-model="flag" title="长时间未操作" @on-ok="asyncOK">
      <p>由于您5分钟未操作，先已清除您的登录状态，点击确定重新登录</p>
    </Modal>
    <xm-header />
    <router-view />
    <xm-footer class="footer" />
  </div>
</template>

<script>
import xmHeader from "../components/common/XmHeader";
import xmFooter from "../components/common/XmFooter";
export default {
  props: {},
  data() {
    return {
      flag: false,
      show: false
    };
  },
  components: {
    xmHeader,
    xmFooter
  },
  methods: {
    //判断是否10分钟未点击，如果未点击则
    check() {
      var lastTime = new Date().getTime();
      var currentTime = new Date().getTime();
      var timeOut = 5 * 60 * 1000; //设置超时时间： 30分
      let _this = this;
      function checkTimeout() {
        currentTime = new Date().getTime(); //更新当前时间
        lastTime = localStorage.getItem("lastTime");
        console.log(currentTime - lastTime);
        console.log(timeOut);
        if (currentTime - lastTime > timeOut) {
          //判断是否超时，超时则清理登录状态
          console.log("超时");
          localStorage.removeItem("username");
          _this.$store.state.username = "";
          _this.flag = true;

          clearInterval(timer);
        }
      }
      /* 定时器 间隔30秒检测是否长时间未操作页面 */
      let timer = setInterval(checkTimeout, 30000);
    },
    asyncOK() {
      this.$router.push("/login");
    },
    //动画开始
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
      el.style.top = `${this.cart.clientY}px`;
      el.style.left = `${this.cart.clientX}px`;
    },
    enter(el, done) {
      //获取购物车图标的位置
      let x = 0,
        y = 0;
      let el1 = document.querySelector(".header-top-box");
      x = el1.offsetLeft + el1.offsetWidth - 40;
      y = el1.offsetTop + el1.offsetHeight / 2 - 5;
      el.style.transform = `translate(${x - this.cart.clientX}px,${y -
        this.cart.clientY}px)`;
      el.style.transition = "all 1s ease";
      done();
    },
    //动画结束令show=false
    afterEnter() {
      this.$store.state.cart.show = false;
    }
  },
  mounted() {
    if (localStorage.getItem("username")) {
      //当username存在时创建点击事件监听
      window.addEventListener("mousedown", e => {
        let lastTime = new Date().getTime();
        localStorage.setItem("lastTime", lastTime);
      });
      this.$store.state.username = localStorage.getItem("username");
      this.check();
    }
    this.$store.dispatch("getCart");
  },
  watch: {},
  computed: {
    cart() {
      return this.$store.state.cart;
    }
  }
};
</script>

<style scoped lang='scss'>
.cartPic {
  position: fixed;
  z-index: 999;
  width: 20px;
  height: 20px;
  img {
    width: 20px;
    height: 20px;
  }
}
.container {
  background: #ededed;
}
.footer {
  border-top: 1px solid #e6e6e6;
  background: #fafafa;
}
</style>