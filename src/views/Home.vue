<template>
  <div class="container">
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
    return {};
  },
  components: {
    xmHeader,
    xmFooter
  },
  methods: {},
  mounted() {
    this.$store.dispatch("getCart");
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.container {
  background: #ededed;
}
.footer {
  border-top: 1px solid #e6e6e6;
  background: #fafafa;
}
</style>