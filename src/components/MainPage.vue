<template>
  <div class="container">
    <div
      v-for="item in search === '' ? allPokemons : filteredPokemons"
      v-bind:key="item.id"
      class="card"
      @click="$router.push(`/${item.name}`)"
    >
      <img :src="item.sprites['front_default']" class="sprite" />
      <p class="name">{{ item.name }}</p>
      <p class="id">id:{{ item.id }}</p>
    </div>
    <span ref="fetchMore"></span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MainPage",

  computed: mapGetters(["allPokemons", "filteredPokemons", "search"]),
  mounted() {
    this.$store.dispatch("getPokemons");

    this.allPokemons.length >= 1010
      ? window.removeEventListener("scroll", this.checkVisibility)
      : window.addEventListener("scroll", this.checkVisibility);
  },
  unmounted() {
    window.removeEventListener("scroll", this.checkVisibility);
  },
  methods: {
    checkVisibility() {
      const element = this.$refs.fetchMore;
      if (this.allPokemons.length > 150 && this.allPokemons.length < 1010) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top <= windowHeight && rect.bottom >= 0) {
          this.$store.dispatch("fetchMore");
          window.removeEventListener("scroll", this.checkVisibility);
          setTimeout(() => {
            window.addEventListener("scroll", this.checkVisibility);
          }, 3000);
      }
    }}
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  padding-top: 80px;
  display: flex;
  flex-wrap: wrap;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 9.4vw;
  height: 14vw;
  padding: 5px;
  margin-right: 20px;
  margin-bottom: 20px;
  border: 1px solid black;
  background-color: #e0dbde;
  color: #0f067a;
  overflow: hidden;
  font-size: 1vw;
}
.card:hover {
  cursor: pointer;
  background-color: #da8edb;
}
.sprite {
  width: 7vw;
  height: 7vw;
}
.name {
  font-weight: 600;
}
.id {
  align-self: start;
}
</style>
