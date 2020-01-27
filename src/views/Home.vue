<template>
  <div>
    <xm-header/>
    <router-view />
    <div style="height:3000px"></div>
  </div>
</template>

<script>
import xmHeader from "../components/common/XmHeader";
export default {
  props: {},
  data() {
    return {};
  },
  components: {
    xmHeader
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>