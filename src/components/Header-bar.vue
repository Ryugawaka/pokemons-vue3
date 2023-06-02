<template>
  <div class="header" @click="$router.push('/')">
    <div class="logo-block">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"
        alt="logo"
        class="logo"
      />
      <p>PokeDB-VUE</p>
    </div>
    <div class="searchBlock">
      <p class="title">Search by Name/id</p>
      <input class="searchInput" v-model="text" @input="onSearch" />
    </div>
  </div>
</template>

<script>
import EventHandler from './EventHandler'

export default {
  name: "Header-bar",
  data() {
  },
  emits:['search'],
  methods: {
    onSearch(e) {
      EventHandler.emit('search', e.target.value)
    },
  },
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  background-color: gray;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
}
.logo {
  width: 40px;
  height: 40px;
}
.logo-block {
  display: flex;
  align-items: center;
  color: white;
  font-size: 30px;
}
.searchBlock {
  color: white;
  font-size: 14px;
  margin-right: 40px;
}
.title {
  margin-top: 0;
  margin-bottom: 0;
}
.searchInput {
  height: 20px;
  width: 200px;
  outline: none;
}
</style>
