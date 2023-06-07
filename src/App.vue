<template>
  <div id="app">
    <HeaderBar />
    <router-view />
  </div>
</template>

<script>
import HeaderBar from "./components/Header-bar.vue";

export default {
  name: "App",
  components: {
    HeaderBar,
  },
};
</script>

<style>
@import url("https://fonts.cdnfonts.com/css/pokemon-solid");

html {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(119, 9, 121, 1) 59%,
    rgba(255, 0, 93, 1) 100%
  );
  font-family: "Pokemon Solid", sans-serif;
  letter-spacing: 0.2em;
  line-height: 1.3vw;
}
</style>
