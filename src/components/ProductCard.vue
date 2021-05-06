<script lang="ts">
import { defineComponent, ref } from "vue";
import { config } from "../ts/Fetcher";

export default defineComponent({
  setup(props) {
    let flipped = ref(false);
    let bgImg = ref("scooter.png");

    function flip() {
      flipped.value = !flipped.value;
    }

    function buy(prodIndex: string) {
      fetch("https://gm_bikerental/buy", { method: "post", body: prodIndex });
      postMessage({ type: "gm_window_close" }, "https:/gm_bikerental/");
    }

    return {
      config,
      props,
      flipped,
      flip,
      bgImg,
      buy,
    };
  },
  props: {
    index: {
      default: "0",
      type: String,
    },
    name: String,
    price: String,
    image: String,
    additional: Array,
  },
});
</script>

<template lang="pug">
.product-card-container(:class="{ moreinfo: flipped }")
  .product-card
    .front
      .img-container
        .img(:style="{ backgroundImage: `url('./${props.image}')` }")
      .info
        h1.productname {{ props.name }}
        .pricetag {{ props.price }}
      .btns-container
        .btns
          .btn-container(@click="flip()")
            .btn.moreinfo {{ config.langMoreInfo }}
          .btn-container(@click="buy(props.index)")
            .btn.buybtn {{ config.langBuy }}
    .back
      .textcontainer 
        .textcontent(v-for="paragraph in props.additional") {{ paragraph }}
      .back-btn-container-outer
        .back-btn-container-inner
          .null
          .btn-container
            .bbtn(@click="flip()") {{ config.langBack }}
          .null
</template>

<style lang="sass">
.product-card-container
  perspective: 300vh
  flex: 1
  .product-card
    border: 0.5vh solid var(--cardframe)
    height: 47.5vh
    min-width: 35vh
    border-radius: 3vh
    position: relative
    transform-style: preserve-3d
    transition: transform 0.5s
    .front, .back
      // background-color: var(--bg-primary)
      position: absolute
      width: 100%
      height: 100%
      backface-visibility: hidden
      border-radius: 2.25vh
    .front
      background-color: var(--bg-primary)
      .img
        background-image: none
        background-size: auto 100%
        background-position: center
        background-repeat: no-repeat
        margin-top: 2vh
        height: 27.5vh
        width: 100%
        padding: 5%
      .info
        margin: 2vh
        margin-top: 2.5vh
        .productname
          color: white
          font-size: 4vh
          margin-bottom: 0
          line-height: 3.5vh
        .pricetag
          font-size: 2vh
      .btns-container
        $gap: 2vh
        padding: 0.5vh $gap
        height: 6vh
        .btns
          width: 100%
          display: grid
          grid-template-columns: 1fr 1fr
          gap: $gap
          padding-bottom: 2vh
          .btn-container
            border-radius: 2vh
            cursor: pointer
            .btn
              height: 4vh
              font-size: 2vh
              border-radius: 2vh
              text-align: center
              line-height: 3vh
              border: 0.5vh solid var(--brand)
              transition: transform 0.25s, background-color 0.175s, box-shadow 0.25s
              &.buybtn
                background-color: var(--brand)
            &:hover
              .btn
                transform: scale(1.03) translateY(-10%)
                background-color: var(--brand)
                box-shadow: 0 0.75vh 1.5vh var(--brand-transparent)
                transition: transform 0.15s, background-color 0.1s, box-shadow 0.15s
    .back
      transform: rotateY(180deg)
      .textcontainer
        height: 40.5vh
        padding: 3vh
      .back-btn-container-outer
        $gap: 2vh
        padding: 0.5vh $gap
        height: 6vh
        .back-btn-container-inner
          width: 100%
          display: grid
          grid-template-columns: 1fr 5fr 1fr
          gap: $gap
          padding-bottom: 2vh
          .btn-container
            border-radius: 2vh
            .bbtn
              cursor: pointer
              height: 4vh
              border-radius: 2vh
              text-align: center
              line-height: 3vh
              border: 0.5vh solid var(--brand)
              transition: transform 0.25s, background-color 0.175s, box-shadow 0.25s
            &:hover
              .bbtn
                transform: scale(1.03) translateY(-10%)
                background-color: var(--brand)
                box-shadow: 0 0.75vh 1.5vh var(--brand-transparent)
                transition: transform 0.15s, background-color 0.1s, box-shadow 0.15s
  &.moreinfo
    .product-card
      transform: rotateY(180deg)
      .btn
        transform: none !important
</style>
