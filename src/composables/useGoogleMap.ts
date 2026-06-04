import { ref, onUnmounted } from "vue";
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

    const { Map, InfoWindow } = await importLibrary("maps");

    // 建立地圖，掛到 DOM
    mapInstance.value = new Map(el, {
      center: { lat: stores[0]?.lat, lng: stores[0]?.lng }, // 用第一個門市的座標
      zoom: 13,
      mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID,
    });

    // 載入 Marker library，建立 marker
    const { Marker } = await importLibrary("marker");
    const infoWindow = new InfoWindow();
    for (const store of stores) {
      // 建立並「釘」到地圖
      const marker = new Marker({
        position: { lat: store.lat, lng: store.lng }, // marker 的位置
        map: mapInstance.value, // 把 marker 掛到地圖上
        title: store.name, // 鼠標移到 marker 上會顯示的文字
      });
      markers.push(marker);

      marker.addListener("click", () => {
        infoWindow.setContent(`
          <div style="font-family: sans-serif; padding: 10px; min-width: 200px;">
            <h2 style="text-align: center; font-weight: 700; font-size: 15px; color: #4A3D2F; margin: 0 0 8px;">${store.name}</h2>
            <p style="font-size: 13px; color: #6B5444; margin: 0 0 4px 0;">📍 ${store.address}</p>
            <p style="font-size: 13px; color: #6B5444; margin: 0 0 4px 0;">📞 ${store.phone}</p>
            <p style="font-size: 13px; color: #6B5444; margin: 0 0 10px 0;">🕐 ${store.hours}</p>
            <div style="text-align: center;">
              <a href="https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}"
                target="_blank"
                rel="noopener noreferrer"
                style="display: inline-block; background: #4A3D2F; color: #fff; font-size: 13px; font-weight: 600; padding: 6px 14px; border-radius: 9999px; text-decoration: none;">
                導航前往
              </a>
            </div>
          </div>
        `);
        infoWindow.open({ anchor: marker, map: mapInstance.value });
      });
    }
  }

  // 把地圖移動到指定門市的位置，並放大
  function panTo(store: Store) {
    mapInstance.value?.panTo({ lat: store.lat, lng: store.lng });
    mapInstance.value?.setZoom(16);
  }

  // Composable 裡的 lifecycle hook 會自動綁定到「呼叫它的元件」的生命週期，所以這裡的 onUnmounted 是在說「當使用這個 composable 的元件被卸載時，要執行這段程式碼」
  onUnmounted(() => {
    // 元件卸載時清除 marker 和地圖 instance，避免記憶體洩漏
    markers.forEach((marker) => marker.setMap(null));
  });

  return {
    initMap,
    panTo,
  };
}
