<template>
  <div>
    <Carousel v-model="value" height="500px" loop>
      <CarouselItem v-for="item in panelContents" :key="item.id">
        <img class="picUrl" :src="item.picUrl" alt />
        <img class="picUrl2" :src="item.picUrl2" alt />
        <img class="picUrl3" :src="item.picUrl3" alt />
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
export default {
  name: "XmCarousel",
  props: {},
  data() {
    return {
      panelContents: [],
      value: 0
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
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.ivu-carousel {
  margin: 20px auto;
  width: 1220px;
  height: 500px;
}

.ivu-carousel-item {
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
