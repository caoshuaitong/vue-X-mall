<template>
  <div>
    <xm-carousel :panelContents="data[0].panelContents" />
    <xm-active :activeList="data[1].panelContents" />
  </div>
</template>

<script>
import xmCarousel from "../components/index/XmCarousel";
import xmActive from "../components/index/XmActive";
export default {
  name: "Index",
  props: {},
  data() {
    return {
      data: [{}, {}, {}, {}, {}, {}, {}]
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
          this.data = res.data;
          console.log(res.data);
        }
      });
    }
  },
  components: {
    xmCarousel,
    xmActive
  }
};
</script>

<style scoped lang="scss">
</style>
