import Vuex from "vuex";
import axios from "axios";
// import EventHandler from "@/components/EventHandler";

export default new Vuex.Store({
  state: {
    pokemons: [],
    filteredPokemons: [],
    search: "",
  },
  mutations: {
    updatePokemons(state, pokemon) {
      state.pokemons.push(pokemon);
    },
    filter(state, search) {
      state.search = search;
      if (search) {
        state.filteredPokemons = state.pokemons.filter(
          (el) => el.name.includes(search) || el.id == search
        );
      }
    },
  },
  actions: {
    async getPokemons(ctx) {
      if (this.state.pokemons.length === 0) {
        for (let i = 1; i < 152; i++) {
          await axios
            .get(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then((res) => {
              ctx.commit("updatePokemons", res.data);
            });
        }
      }
    },

    filterPokemons(ctx, search) {
      ctx.commit("filter", search);
    },
  },
  getters: {
    allPokemons(state) {
      return state.pokemons;
    },
    filteredPokemons(state) {
      return state.filteredPokemons;
    }, 
      search(state) {
      return state.search;
    },
  },
});
