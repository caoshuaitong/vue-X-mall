<template>
  <div class="xm-center">
    <div class="address-list">
      <div class="table-name">收货信息</div>
      <div class="address-main">
        <div>姓名：{{address.username}}</div>
        <div>联系电话：{{address.phone}}</div>
        <div>详细地址：{{address.address}}</div>
      </div>
    </div>
    <div class="paylist">
      <div class="table-name">购物清单</div>
      <div v-if="payList.length>0">
        <div class="table-title">
          <div class="w70">商品信息</div>
          <div class="w10">单价</div>
          <div class="w10">数量</div>
          <div class="w10">小计</div>
        </div>
        <div v-for="row in payList" :key="row.id" class="flex Cart-each">
          <div class="goodinfo w70">
            <div class="goodinfo-img">
              <img :src="row.productImageBig" alt />
            </div>
            <div class="goodinfo-name">{{row.productName}}</div>
          </div>
          <div class="salePrice w10">￥{{row.salePrice.toFixed(2)}}</div>
          <div class="w10">
            <div class="steper">{{row.count}}</div>
          </div>
          <div class="sum w10">￥{{(row.count*row.salePrice).toFixed(2)}}</div>
        </div>
      </div>
      <div class="bottom-pay">
        <div class="pay-right">
          <div class="payable">
            商品总计：
            <span class="pay-num">￥{{checkedSum.toFixed(2)}}</span>
          </div>
          <div class="payable">
            运费：
            <span>+ ¥ 0.00</span>
          </div>
        </div>
        <div class="bottom-pay flex">
          <div class="checkedSum">
            订单金额：
            <span>￥{{checkedSum.toFixed(2)}}</span>
          </div>
          <div class="checkedSum">
            实际应付金额：
            <span>￥{{checkedSum.toFixed(2)}}</span>
          </div>
          <Button @click="clear">立即支付</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",
  props: {},
  data() {
    return {};
  },
  computed: {
    payList() {
      let arr = this.$store.state.goodsList;
      return arr.filter(item => item.checked);
    },
    checkedSum() {
      let sum = 0;
      this.payList.map(item => {
        if (item.checked) {
          sum += item.count * item.salePrice;
        }
      });
      return sum;
    },
    address() {
      return this.$store.state.address;
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    clear() {
      this.payList.map(item => {
        this.$api.delCart(item._id).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.$store.dispatch("getCart");
          }
        });
      });
      this.$Message.info(`结算成功，共支付${this.checkedSum.toFixed(2)}元`);
      this.$router.push("/");
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.table-name {
  position: relative;
  height: 60px;
  padding: 0 10px 0 24px;
  border-bottom: 1px solid #d4d4d4;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.06);
  background: #f3f3f3;
  background: linear-gradient(#fbfbfb, #ececec);
  line-height: 60px;
  font-size: 18px;
  color: #333;
}
.address-list,
.paylist {
  margin: 30px 0;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  overflow: hidden;
}
.address-main {
  padding: 20px;
  background: white;
}
.address-box {
  overflow: hidden;
  background: white;
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0;
}
.defaultColor {
  border: 1px solid rgb(106, 143, 229) !important;
  background: white !important;
}
.address-each {
  width: 276px;
  height: 158px;
  margin: 10px 14px;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  background: #fafafa;
  line-height: 14px;
  text-align: left;
  color: #626262;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    background: #f1f1f1;
  }
  .each-main {
    padding: 19px 14px 0 19px;
    line-height: 26px;
    .add-default {
      position: absolute;
      top: 10px;
      right: 20px;
      .icon-gou {
        color: rgb(106, 143, 229);
      }
    }
  }
  .each-btn-group {
    position: absolute;
    display: flex;
    width: 100%;
    bottom: -30px;
    left: 0;
    background: white;
    div {
      &:hover {
        background: #fafafa;
      }
      height: 30px;
      width: 50%;
      border: 1px solid #e5e5e5;
      line-height: 30px;
      text-align: center;
    }
  }
  &:hover .each-btn-group {
    animation: upbtn 0.5s;
    @keyframes upbtn {
      to {
        bottom: 0;
      }
      from {
        bottom: -30px;
      }
    }
    bottom: 0;
  }

  .each-add {
    font-size: 16px;
    line-height: 20px;
    width: 80px;
    height: 50px;
    margin-left: -40px;
    margin-top: -25px;
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
  }
}
.table-title {
  display: flex;
  background: #eee;
  border-bottom: 1px solid #dbdbdb;
  border-bottom-color: rgba(0, 0, 0, 0.08);
  line-height: 38px;
  height: 38px;
  font-size: 12px;
}
.w70 {
  width: 70%;
  padding-left: 30px;
}
.w10 {
  width: 10%;
  text-align: center;
}
.Cart-each {
  background: white;
  .salePrice,
  .sum {
    font-size: 14px;
    height: 21px;
    margin: 41px 0;
  }
  .sum {
    font-weight: 800;
  }
  .steper {
    width: 80px;
    overflow: hidden;
    height: 21px;
    margin: 41px auto;
  }
}
.goodinfo {
  display: flex;
  margin: 10px 0;
  .check {
    margin: 31px 0;
  }
  .goodinfo-img {
    margin: 0 10px;
    width: 80px;
    height: 80px;
    border-radius: 3px;
    border: 0 solid hsla(0, 0%, 100%, 0.1);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
  }
  img {
    width: 80px;
  }
  .goodinfo-name {
    line-height: 18px;
    margin: 31px 20px;
    color: #333;
    font-size: 16px;
  }
}
.bottom-pay {
  border-radius: 0 0 8px 8px;
  width: 100%;
  background-position: 50%;
  background: #fdfdfd;
  background: linear-gradient(#fdfdfd, #f9f9f9);
  border-top: 1px solid #e9e9e9;
  .pay-right {
    height: 100%;
    padding: 20px 30px;
    line-height: 25px;
    text-align: right;
    .payable {
      color: #323232;
      font-size: 16px;
      line-height: 20px;
      span {
        color: #615857;
        text-align: center;
        display: inline-block;
        width: 60px;
        font-weight: 800;
      }
    }
    .btn {
      width: 130px;
      height: 50px;
    }
  }
}
.flex {
  padding: 10px;
  line-height: 32px;
  text-align: right;
}
</style>
