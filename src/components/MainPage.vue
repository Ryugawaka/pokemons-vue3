<template>
  <div class="test">
    <div class="container">
      <div
        v-for="item in (!state.search  ?  state.pokemons : state.filteredPokemons)"
        v-bind:key="item.id"
        class="card"
        @click="$router.push(`/${item.name}`)"
      >
        <img :src="item.sprites['front_default']" class="sprite" />
        <p class="name">{{ item.name }}</p>
        <p class="id">id:{{ item.id }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, onUnmounted, reactive } from "vue";
import EventHandler from "./EventHandler";

export default {
  name: "MainPage",
  data() {
    const state = reactive({
      filteredPokemons: [],
      pokemons: [],
      search: null,
    });
    return {
      state,
    };
  },
  mounted() {
    EventHandler.on("search", (data) => {
      this.state.search = data;
      this.filter();
    });
  },
  unmounted() {
    onUnmounted(() => {
      EventHandler.off("search");
    });
  },
  async created() {
    onMounted(async () => {
      this.state.pokemons = [];
      for (let i = 1; i < 152; i++) {
        await axios
          .get(`https://pokeapi.co/api/v2/pokemon/${i}`)
          .then((res) => {
            this.state.pokemons.push(res.data);
          });
      }
    });
  },
  // updated() {},
  methods: {
    filter() {
      if (this.state.search) {
        console.log(this.state.search);
        this.state.filteredPokemons = this.state.pokemons.filter((el) =>
          el.name.includes(this.state.search) || el.id == this.state.search
        );
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  height: 13vw;
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
