import type { Store } from "../types/stores";

export const stores: Store[] = [
  {
    id: 1,
    name: "Mochi Café 台北101店",
    address: "110 台北市信義區市府路45號",
    phone: "02-8101-0101",
    lat: 25.033968,
    lng: 121.564468,
    hours: "週一至週日 09:00 - 21:30",
  },
  {
    id: 2,
    name: "Mochi Café 西門門市",
    address: "108 台北市萬華區成都路15號",
    phone: "02-2388-0202",
    lat: 25.042233,
    lng: 121.507389,
    hours: "週一至週日 09:00 - 23:00",
  },
  {
    id: 3,
    name: "Mochi Café 台中勤美店",
    address: "403 台中市西區公益路68號",
    phone: "04-2301-0303",
    lat: 24.151105,
    lng: 120.662963,
    hours: "週一至週日 08:30 - 21:30",
  },
];
