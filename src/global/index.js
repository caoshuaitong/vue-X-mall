import Vue from 'vue'

Vue.prototype.$godetail = function(id) {
    console.log(1);
    this.$router.push({
        name: "detail",
        params: {
            id: id
        }
    });
}