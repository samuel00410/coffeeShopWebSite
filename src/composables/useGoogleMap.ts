import { ref } from "vue";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import type { Store } from "../types/stores";

// === 把地圖初始化和 marker 管理封裝成可複用的函式 ===
// 為什麼用 composable 而不是寫在元件裡：地圖 instance 是 imperative API（命令式），和 Vue 的宣告式風格不搭，獨立出來更好管理生命週期
export function useGoogleMap() {
  const mapInstance = ref<google.maps.Map | null>(null);
  const markers: google.maps.Marker[] = [];

  // 初始化地圖，傳入 DOM 元素和門市資料
  async function initMap(el: HTMLElement, stores: Store[]) {
    setOptions({
      key: import.meta.env.VITE_GOOGLE_MAPS_KEY,
      v: "weekly",
    });

    const { Map } = await importLibrary("maps");

    // 建立地圖，掛到 DOM
    mapInstance.value = new Map(el, {
      center: { lat: stores[0]?.lat, lng: stores[0]?.lng }, // 用第一個門市的座標
      zoom: 13,
      mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID,
    });

    // 載入 Marker library，建立 marker
    const { Marker } = await importLibrary("marker");
    for (const store of stores) {
      // 建立並「釘」到地圖
      const marker = new Marker({
        position: { lat: store.lat, lng: store.lng }, // marker 的位置
        map: mapInstance.value, // 把 marker 掛到地圖上
        title: store.name, // 鼠標移到 marker 上會顯示的文字
      });
      markers.push(marker);
    }
  }

  // 把地圖移動到指定門市的位置，並放大
  function panTo(store: Store) {
    mapInstance.value?.panTo({ lat: store.lat, lng: store.lng });
    mapInstance.value?.setZoom(16);
  }

  return {
    initMap,
    panTo,
  };
}
