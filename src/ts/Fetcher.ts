import { ref } from "vue";

const config = ref({
  scale: 1,
  bgPrimary: "#4a4a55",
  bgSecondary: "#35353f",
  tlActive: "#ff666f",
  tlInactive: "#4a4a55",
  langShopname: "Motorrollerverleih",
  langMoreInfo: "Weitere Infos",
  langBuy: "Jetzt Mieten",
  langBack: "Umdrehen",
});
const products = ref<unknown[]>([]);

function fetchData(): void {
  fetch("https://gm_bikerental/config", {
    method: "post",
  })
    .then((res) => res.json())
    .then((data) => {
      config.value = { ...data };
    });
  fetch("https://gm_bikerental/products", {
    method: "post",
  })
    .then((res) => res.json())
    .then((data) => {
      products.value = [...data];
    });
}

export { config, fetchData, products };
