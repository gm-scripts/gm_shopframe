<template lang="pug">
#ui-container
  GMWindow( :isDraggable="true" )
</template>
<script lang="ts">
import { defineComponent } from "vue";
import GMWindow from "./components/GMWindow.vue";
import { fetchData } from "./ts/Fetcher";
export default defineComponent({
  setup() {
    fetchData();
  },
  components: { GMWindow },
});
</script>

<style lang="sass">
// @import "./assets/scss/root.sass";

#app
  font-family: Montserrat, Avenir, Arial, Helvetica, sans-serif
*
  margin: 0
  padding: 0
  box-sizing: border-box
</style>
