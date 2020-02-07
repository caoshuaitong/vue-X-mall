import Vue from 'vue'

Vue.prototype.$godetail = function(id) {
    this.$router.push({
        name: "detail",
        query: {
            id: id
        }
    });
}