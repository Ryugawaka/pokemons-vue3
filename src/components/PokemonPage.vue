<template>
  <div v-if="evolutionChain" class="containter">
    <div class="mainInfo">
      <div class="statCard">
        <p class="name">Name: {{ pokemonInfo.name }}</p>
        <p class="name">id: {{ pokemonInfo.id }}</p>
        <img
          :src="pokemonInfo.sprites.other['official-artwork']['front_default']"
          class="image"
          alt="imageFront"
        />
        <div class="types">
          <p>Types:</p>
          <p v-for="(item, index) in pokemonInfo.types" v-bind:key="index">
            {{ index > 0 ? "/" + item.type.name : item.type.name }}
          </p>
        </div>
      </div>
      <div class="statCard">
        <p class="title">Base Stats</p>
        <div
          v-for="(s, index) in pokemonInfo.stats"
          class="stats"
          v-bind:key="index"
        >
          <p class="statName">{{ s.stat.name }}</p>
          <p class="statName">{{ s.base_stat }}</p>
        </div>
      </div>
    </div>
    <div class="statCard">
      <p class="title">Evolve forms</p>
      <div class="evolveList">
        <div
          class="link"
          @click="$router.push(`/${evolutionChain.chain.species.name}`)"
        >
          {{ evolutionChain.chain.species.name }}
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/57/57116.png"
          v-if="evolutionChain.chain['evolves_to'][0]"
          class="arrow"
        />
        <div v-if="evolutionChain.chain['evolves_to'][0]">
          <div
            v-for="(evolve, index) in evolutionChain.chain['evolves_to']"
            v-bind:key="index"
            @click="$router.push(`/${evolve.species.name}`)"
            class="link"
          >
            {{ evolve.species.name }}
          </div>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/57/57116.png"
          v-if="
            evolutionChain.chain['evolves_to'][0] &&
            evolutionChain.chain['evolves_to'][0]['evolves_to'][0]
          "
          class="arrow"
        />

        <div
          v-if="
            evolutionChain.chain['evolves_to'][0] &&
            evolutionChain.chain['evolves_to'][0]['evolves_to']
          "
        >
          <p
            v-for="(evolve, index) in evolutionChain.chain['evolves_to'][0][
              'evolves_to'
            ]"
            v-bind:key="index"
            @click="$router.push(`/${evolve.species.name}`)"
            class="link"
          >
            {{ evolve.species.name }}
          </p>
        </div>
      </div>
    </div>
    <div class="statCard">
      <div class="move">
        <p>Available moves:</p>
        <p>Learn method:</p>
        <p>Level:</p>
      </div>
      <div
        v-for="(move, index) in pokemonInfo.moves"
        class="move"
        v-bind:key="index"
      >
        <p>{{ move.move.name }}</p>
        <p>
          {{ move["version_group_details"][0]["move_learn_method"].name }}
        </p>
        <p>{{ move["version_group_details"][0]["level_learned_at"] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PokemonPage",
  data() {
    return {
      pokemonInfo: undefined,
      pokemonSpecies: undefined,
      evolutionChain: undefined,
    };
  },
  methods: {
    async getInfo() {
      this.pokemonInfo = undefined;
      this.pokemonSpecies = undefined;
      this.evolutionChain = undefined;
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon${window.location.pathname}`)
        .then((res) => (this.pokemonInfo = res.data))
        .then(
          async () =>
            await axios
              .get(this.pokemonInfo.species.url)
              .then((specRes) => (this.pokemonSpecies = specRes.data))
        )
        .then(
          async () =>
            await axios
              .get(this.pokemonSpecies["evolution_chain"]["url"])
              .then((evRes) => (this.evolutionChain = evRes.data))
        );
    },
  },
  watch: {
    $route() {
      this.getInfo();
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style scoped>
.containter {
  padding: 20px;
  padding-top: 80px;
  color: white;
}
.mainInfo {
  display: flex;
  justify-content: space-between;
}
.name {
  font-size: 25px;
  margin-bottom: 20px;
  width: 50vw;
}
.image {
  width: 35vw;
  height: 35vw;
  align-self: center;
}
.types {
  display: flex;
  align-items: center;
  font-size: 20px;
}
.title {
  font-size: 30px;
}
.statCard {
  border: 1px solid gray;
  padding-left: 40px;
  padding-right: 40px;
  background-color: #6a0893;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}
.stats {
  display: flex;
  width: 33vw;
  justify-content: space-between;
}
.evolveList {
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
}
.link {
  cursor: pointer;
}
.move {
  margin-top: 5px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  text-align: center;
}
.arrow {
  width: 5vw;
}
</style>
