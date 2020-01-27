<template>
  <div class="box">
    <div
      @mouseover="Over($refs.carousel)"
      @mousemove="Move($refs.carousel,$event)"
      @mouseout="Out($refs.carousel)"
      ref="carousel"
      class="carousel"
    >
      <Carousel v-model="value" :height="500" loop radius-dot>
        <CarouselItem v-for="item in panelContents" :key="item.id">
          <img class="picUrl" :src="item.picUrl" alt />
          <img class="picUrl2" :src="item.picUrl2" alt />
          <img class="picUrl3" :src="item.picUrl3" alt />
        </CarouselItem>
      </Carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "XmCarousel",
  props: {},
  data() {
    return {
      panelContents: [],
      value: 0,
      option: {
        offsetLeft: 0,
        offsetTop: 0,
        offsetWidth: 0,
        offsetHeight: 0
      }
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getHomeData();
  },
  watch: {},
  methods: {
    getHomeData() {
      this.$api.getHome().then(res => {
        if (res.code === 200) {
          this.panelContents = res.data[0].panelContents;
          console.log(this.panelContents);
        }
      });
    },
    //鼠标移入获取当前dom的状态
    Over(dom) {
      this.option = {
        offsetLeft: dom.offsetLeft,
        offsetTop: dom.offsetTop,
        offsetWidth: dom.offsetWidth,
        offsetHeight: dom.offsetHeight
      };
    },
    //操作dom元素
    Move(dom, eve) {
      let X, Y;
      let mouseX = eve.pageX - this.option.offsetLeft;
      let mouseY = eve.pageY - this.option.offsetTop;
      X = mouseX - this.option.offsetWidth / 2;
      Y = this.option.offsetHeight / 2 - mouseY;
      dom.style.transform = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`;
    },
    //鼠标移出还原dom元素状态
    Out(dom) {
      dom.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.box {
  perspective: 1000px;
}
.carousel {
  position: relative;
  width: 1220px;
  height: 500px;
  margin: 20px auto;
  background-size: 100% 100%;
  border-radius: 10px;
  transform-origin: 50% 50%;
  transform: rotateY(0deg) rotateX(0deg);
  transition: all 0.5s linear;
}
.ivu-carousel {
  margin: 20px auto;
  width: 1220px;
  height: 500px;
}
/deep/.ivu-carousel-arrow,
/deep/.ivu-carousel-arrow:hover {
  display: none !important;
}
/deep/.ivu-carousel-dots {
  .radius {
    width: 15px !important;
    height: 15px !important;
    margin-top: -20px;
  }
}
.ivu-carousel-item {
  z-index: 999;
  position: relative;
  .picUrl {
    position: absolute;
    border-radius: 10px;
    width: 100%;
    height: 490px;
    bottom: 0;
  }
  .picUrl2 {
    position: absolute;
    width: 100%;
  }
  .picUrl3 {
    position: absolute;
    width: 100%;
  }
}
</style>
