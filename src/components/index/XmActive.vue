<template>
  <div class="xm-center">
    <div class="active-box"></div>
  </div>
</template>

<script>
export default {
  name: "XmActive",
  props: {
    activeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {
    console.log(this.activeList);
  },
  watch: {},
  methods: {},
  components: {},
  filters: {}
};
</script>

<style scoped lang="scss">
.active-box {
  width: 25%;
}
</style>
