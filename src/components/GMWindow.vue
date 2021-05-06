<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import makeDraggable from "../ts/ui/DragFunctions";
import { config, products } from "../ts/Fetcher";
import ProductCard from "./ProductCard.vue";

export default defineComponent({
  setup(props) {
    const draggable = ref(props.isDraggable);
    const root = ref<HTMLDivElement | null>(null);
    let windowClosed = ref(false);

    function closeWindow(): void {
      windowClosed.value = true;
      fetch("https://gm_bikerental/close", { method: "post" });
    }
    function openWindow(): void {
      windowClosed.value = false;
    }

    onMounted(() => {
      if (root.value) {
        makeDraggable(root.value);
      }
      window.addEventListener("message", (e: MessageEvent) => {
        let dat = e.data;

        switch (dat.type) {
          case "gm_window_open":
            openWindow();
            break;
          case "gm_window_close":
            closeWindow();
            break;
        }
      });
    });

    return {
      draggable,
      root,
      config,
      products,
      windowClosed,
      closeWindow,
    };
  },
  components: {
    ProductCard,
  },
  props: {
    isDraggable: Boolean,
  },
});
</script>

<template lang="pug">
#storewindow(
  ref="root",
  :style="{ '--scale': config.scale, '--bg-primary': config.bgPrimary, '--bg-secondary': config.bgSecondary, '--trafficlight-active': config.tlActive, '--trafficlight-inactive': config.tlInactive }",
  :class="{ closed: windowClosed }"
)
  .gm-frame {{ config.langShopname }}
    .close-btn(@click="closeWindow")
  .card-container
    ProductCard(
      v-for="p in products.products",
      :key="p.id",
      :index="p.id",
      :name="p.name",
      :price="p.price",
      :image="p.image",
      :additional="p.additionalInfo"
    )
</template>

<style lang="sass">
#storewindow
  //vars
  --scale: 1
  --brand: #23bf7c
  --brand-transparent: #23bf7c7f
  --bg-primary: #4a4a55
  --bg-secondary: #35353f
  --trafficlight-active: #ff666f
  --trafficlight-inactive: var(--bg-primary)
  --cardframe: #5b5b69
  --text-color: #e7e7e7

  background-color: #4a4a55
  user-select: none
  width: calc(var(--scale) * 90vh)
  height: calc(var(--scale) * 60vh)
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  border-radius: calc(var(--scale) * 1.25vh)

  overflow: auto
  font-family: 'Montserrat', Avenir, Arial, Helvetica, sans-serif

  transition: opacity 0.15s, transform 0.15s
  .card-container
    scroll-behavior: smooth
    display: flex
    flex-wrap: wrap
    width: 100%
    height: 100%
    position: absolute
    overflow: overlay
    bottom: 1px
    padding: 5vh
    padding-top: calc(7.25vh + var(--scale) * 0.25vh)
    gap: 5vh
    color: white
    &::-webkit-scrollbar
      width: 1.5vh
    &::-webkit-scrollbar-track
      background-color: transparent
      margin-top: calc(2.25vh + var(--scale) * 1.25vh)
    &::-webkit-scrollbar-thumb
      border-radius: 50vh
      background-color: var(--cardframe)
      background-clip: padding-box
      border: 0.5vh solid transparent
  .gm-frame
    position: absolute
    z-index: 2
    font-size: 2.25vh
    width: calc(100% - 2px)
    color: white
    padding: calc(var(--scale) * 0.25vh)
    cursor: move
    text-align: center
    background-color: var(--bg-secondary)
    .close-btn
      background-color: var(--bg-primary)
      height: calc(var(--scale) * 1.5vh)
      width: calc(var(--scale) * 1.5vh)
      position: absolute
      top: calc(var(--scale) * 1vh)
      left: calc(var(--scale) * 1vh)
      transform: scale(1.01)
      border-radius: 50%
      cursor: pointer
      &:hover
        background-image: url("../assets/icons/closewindow.svg")
        background-size: 75%
        background-position: center
    &:hover
      .close-btn
        background-color: #ff666f
  &.closed
    opacity: 0
    transform: scale(0.75) translate(-62.5%, -62.5%)
    transition: opacity 0.15s, transform 0.15s
</style>
