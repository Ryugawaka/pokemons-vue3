<template>
  <div class="header">
    <div class="logoBlock" @click="$router.push('/')">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"
        alt="logo"
        class="logo"
      />
      <p>{{ this.title }}</p>
    </div>
    <div class="searchBlock">
      <p class="title">Search by Name/id</p>
      <input class="searchInput" v-model="text" @input="onSearch" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Header-bar",
  data() {
    return { title: "PokeDB-VUE" };
  },
  computed: mapActions["filterPokemons"],
  methods: {
    onSearch(e) {
      this.$store.dispatch("filterPokemons", e.target.value);
    },
  },
  mounted() {},
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  height: 5vw;
  background-color: gray;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}
.logo {
  width: 40px;
  height: 40px;
}
.logoBlock {
  display: flex;
  align-items: center;
  color: white;
  font-size: 30px;
  cursor: pointer;
}
.searchBlock {
  color: white;
  font-size: 1.2vw;
  margin-right: 40px;
}
.title {
  margin-top: 0;
  margin-bottom: 0;
}
.searchInput {
  height: 1vw;
  width: 15vw;
  outline: none;
}
</style>
