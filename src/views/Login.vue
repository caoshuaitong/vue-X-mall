<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-logo">
        <img src="../assets/smartisan-logo.png" alt />
      </div>
      <div class="login-title">使用 XMall 账号 登录官网</div>
      <div class="login-input">
        <Input v-model="username" placeholder="账号" style="width: 350px" />
      </div>
      <div class="login-input">
        <Input v-model="passwd" type="password" password placeholder="密码" style="width: 350px" />
      </div>
      <div
        id="vaptchaContainer"
        style="width: 350px;height: 40px;margin: 20px auto;margin-top: 20px;"
      >
        <!--vaptcha-container是用来引入VAPTCHA的容器，下面代码为预加载动画，仅供参考-->
        <div class="vaptcha-init-main">
          <div class="vaptcha-init-loading">
            <a href="/" target="_blank">
              <img src="https://r.vaptcha.com/public/img/vaptcha-loading.gif" />
            </a>
            <span class="vaptcha-text">Vaptcha启动中...</span>
          </div>
        </div>
      </div>
      <div class="login-other">
        <div>
          <Checkbox v-model="flag">记住密码</Checkbox>
        </div>
        <div class="login-link">
          <span>
            <a href="/register">注册 XMall 账号</a>
          </span>
          <span>
            <a href="javascript:0;" @click="forget">忘记密码 ?</a>
          </span>
        </div>
      </div>
      <div class="btn-box">
        <Button class="btn" :class="flag?'submit':'not-allowed'" @click="submit">登录</Button>
      </div>
      <div class="btn-box">
        <Button class="btn" @click="submit">返回</Button>
      </div>
      <div class="support-more">
        其它账号登录：
        <i class="iconfont icon-weibo" @click="support"></i>
        <i class="iconfont icon-weixin" @click="support"></i>
        <i class="iconfont icon-qq" @click="support"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  props: {},
  data() {
    return {
      username: "",
      passwd: "",
      repasswd: "",
      checked: false,
      checkVaptcha: false,
      flag: false
    };
  },
  computed: {},
  created() {},
  mounted() {
    let _this = this;
    this.vaptcha(_this);
  },
  watch: {},
  methods: {
    //创建验证实例
    vaptcha(_this) {
      var token = "";
      vaptcha({
        vid: "5e33eb0b76cb1970819ea979",
        type: "click", // 展现类型 点击式
        container: "#vaptchaContainer", // 按钮容器，可为Element 或者 selector
        offline_server: "/offline"
        // mode: 'offline' 调试离线模式时使用
      }).then(function(vaptchaObj) {
        vaptchaObj.render(); // 调用验证实例 vaptchaObj 的 render 方法加载验证按钮
        vaptchaObj.listen("pass", function() {
          token = vaptchaObj.getToken();
          _this.checkVaptcha = true;
          _this.changeData();
        });
        $("#reset").on("click", function() {
          vaptchaObj.reset();
          $("#result").html("请验证..");
        });
      });
      $("#validate").on("click", function() {
        $.post(
          "/validate",
          {
            token: token
          },
          function(res) {
            if (res.success == 1) {
              $("#result").html("验证成功");
            } else {
              $("#result").html("验证失败");
            }
          },
          "json"
        );
      });
    },
    submit() {},
    forget() {
      let nodesc = false;
      this.$Notice.warning({
        title: "想多了",
        desc: nodesc ? "" : "不可能给你找回密码的! "
      });
    },
    support() {
      let nodesc = false;
      this.$Notice.warning({
        title: "功能开发中...",
        desc: nodesc ? "" : "不可能给你找回密码的! "
      });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.login-container {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../assets/login-bg.png");
}

.login-box {
  overflow: hidden;
  width: 450px;
  margin: 100px auto;
  background: white;
  border-bottom: 1px solid #dcdcdc;
  border-radius: 10px;
  box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
}
.login-logo {
  width: 140px;
  height: 140px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
}
.login-title {
  padding: 0;
  text-align: center;
  font-weight: 400;
  font-size: 20px;
  height: 40px;
  line-height: 40px;
}
.login-input {
  margin: 20px auto;
  width: 350px;
  color: rgb(153, 153, 153);
  /deep/input {
    height: 50px;
    border-radius: 8px;
  }
  /deep/.ivu-icon {
    font-size: 22px;
    line-height: 50px;
  }
}
.login-other {
  display: flex;
  justify-content: space-between;
  width: 350px;
  height: 40px;
  line-height: 20px;
  margin: 10px auto;
  color: rgb(153, 153, 153);
  .login-link {
    span {
      padding: 0 10px;
      &:nth-child(1) {
        border-right: 1px solid #dcdcdc;
      }
    }
  }
}
.btn-box {
  width: 350px;
  height: 50px;
  margin: 20px auto;
}
.btn {
  font-size: 18px;
  width: 350px;
  height: 50px;
  border-radius: 4px;
}
.not-allowed {
  color: #fff;
  cursor: not-allowed;
  border: 1px solid #afafaf;
  background-color: #a9a9a9;
  background-image: linear-gradient(180deg, #b8b8b8, #a9a9a9);
}
.submit {
  color: #fff;
  cursor: pointer;
  background-color: #678ee7;
}
.support-more {
  color: rgb(153, 153, 153);
  border-top: 1px solid #dcdcdc;
  width: 350px;
  margin: auto;
  padding: 20px 0;
  .iconfont {
    margin: 0 5px;
    cursor: pointer;
  }
}
</style>
