<template>
  <div class="box" @mouseover="Over" @mousemove="Move($event)" @mouseleave="Out">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- 轮播内容 -->
      <swiper-slide v-for="item in panelContents" :key="item.id">
        <div class="swiper-each">
          <img class="picUrl" :src="item.picUrl" alt />
          <img class="picUrl2" :src="item.picUrl2" alt />
          <img class="picUrl3" :src="item.picUrl3" alt />
        </div>
      </swiper-slide>
      <!-- 指示器 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "XmCarousel",
  props: {
    panelContents: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      value: 0,
      option: {
        offsetLeft: 0,
        offsetTop: 0,
        offsetWidth: 0,
        offsetHeight: 0
      },
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    //鼠标移入获取当前dom的状态
    Over() {
      this.option = {
        offsetLeft: document.querySelector(".box").offsetLeft,
        offsetTop: document.querySelector(".box").offsetTop,
        offsetWidth: document.querySelector(".box").offsetWidth,
        offsetHeight: document.querySelector(".box").offsetHeight
      };
    },
    //操作dom元素
    Move(eve) {
      let actived = document.querySelector(".swiper-slide-active");
      let mouseX = eve.pageX - this.option.offsetLeft;
      let mouseY = eve.pageY - this.option.offsetTop - 20;
      let X = mouseX - this.option.offsetWidth / 2;
      let Y = this.option.offsetHeight / 2 - mouseY;
      actived.querySelector(".swiper-each").style.transform = `rotateY(${X /
        50}deg) rotateX(${Y / 50}deg)`;
    },
    //鼠标移出还原dom元素状态
    Out() {
      let actived = document.querySelector(".swiper-slide-active");
      actived.querySelector(".swiper-each").style.transform =
        "rotateY(0deg) rotateX(0deg)";
    },
    godetail(index) {
      let id = this.panelContents[index].productId;
      this.$router.push({ name: "detail", query: { id: id } });
    }
  },
  components: { swiper, swiperSlide }
};
</script>

<style scoped lang="scss">
.box {
  margin: 0 auto;
  width: 1220px;
  height: 550px;
}
.swiper-slide {
  width: 1200px;
  height: 500px;
  margin: 20px auto;
  perspective: 3000px;
}
.swiper-each {
  position: relative;
  width: 1200px;
  height: 500px;
  margin: 0 auto;
  border-radius: 10px;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  transform: rotateY(0deg) rotateX(0deg);
  transition: all 0.3s;
  transition-timing-function: linear;
  img {
    border-radius: 10px;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .picUrl2 {
    top: -5px !important;
    z-index: 20;
    transform: translateZ(40px);
  }
  .picUrl3 {
    z-index: 20;
    transform: translateZ(30px);
  }
}
.swiper-pagination {
  bottom: 30px;
  /deep/ span {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
