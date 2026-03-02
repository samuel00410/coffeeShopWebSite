<template>
  <div class="py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center gap-2 bg-white rounded-full px-8 py-4 shadow-[0_4px_0_0_#E8DBC8] mb-6 border-3 border-[#4A3D2F]"
        >
          <FontAwesomeIcon
            class="text-[#FFD4B0] text-lg"
            :icon="faBagShopping"
          />
          <span class="text-lg font-black text-[#4A3D2F]">結帳</span>
        </div>
        <h1 class="text-[#4A3D2F] mb-4">填寫訂單資訊</h1>
      </div>

      <div class="mb-16 flex items-center justify-center gap-3">
        <div
          :class="[
            'px-6 py-3 rounded-full font-bold shadow-md border-2',
            currentStep === 1
              ? 'bg-linear-to-r from-[#FFE5D1] to-[#FFD4B0] text-[#4A3D2F]  border-white'
              : 'bg-white text-[#8B7A68] border-[#FFE5D1]',
          ]"
        >
          1. 建立訂單
        </div>
        <div class="text-[#D4B5A0]">→</div>
        <div
          :class="[
            'px-6 py-3 rounded-full font-bold shadow-md border-2',
            currentStep === 2
              ? 'bg-linear-to-r from-[#FFE5D1] to-[#FFD4B0] text-[#4A3D2F]  border-white'
              : 'bg-white text-[#8B7A68] border-[#FFE5D1]',
          ]"
        >
          2. 確認及付款
        </div>
        <div class="text-[#D4B5A0]">→</div>
        <div
          :class="[
            'px-6 py-3 rounded-full font-bold shadow-md border-2',
            currentStep === 3
              ? 'bg-linear-to-r from-[#FFE5D1] to-[#FFD4B0] text-[#4A3D2F]  border-white'
              : 'bg-white text-[#8B7A68] border-[#FFE5D1]',
          ]"
        >
          3. 訂單完成
        </div>
      </div>

      <!-- 內容 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- 左半部 -->

        <!-- Step 1: 填寫資訊 -->
        <div v-if="currentStep === 1" class="lg:col-span-7">
          <div
            class="bg-white p-8 md:p-10 border-2 border-[#FFE5D1] rounded-4xl shadow-lg"
          >
            <h2 class="text-[#4A3D2F] mb-8">訂單資訊</h2>

            <form @submit.prevent="submitOrder" class="space-y-6">
              <div>
                <label class="checkout-form-label" for="name"
                  >姓名 <span class="text-red-500">*</span></label
                >
                <input
                  v-model="name"
                  v-bind="nameAttrs"
                  id="name"
                  class="checkout-form-input"
                  type="text"
                  placeholder="請輸入您的姓名"
                />
                <span
                  v-if="errors.name"
                  class="text-red-500 text-sm mt-1 block"
                >
                  {{ errors.name }}
                </span>
              </div>

              <div>
                <label class="checkout-form-label" for="phone"
                  >電話 <span class="text-red-500">*</span></label
                >
                <input
                  v-model="phone"
                  v-bind="phoneAttrs"
                  id="phone"
                  class="checkout-form-input"
                  type="tel"
                  placeholder="請輸入您的電話號碼"
                />
                <span
                  v-if="errors.phone"
                  class="text-red-500 text-sm mt-1 block"
                >
                  {{ errors.phone }}
                </span>
              </div>

              <div>
                <label class="checkout-form-label" for="email"
                  >Email <span class="text-red-500">*</span></label
                >
                <input
                  v-model="email"
                  v-bind="emailAttrs"
                  id="email"
                  class="checkout-form-input"
                  type="email"
                  placeholder="example@example.com"
                />
                <span
                  v-if="errors.email"
                  class="text-red-500 text-sm mt-1 block"
                >
                  {{ errors.email }}
                </span>
              </div>

              <div>
                <label class="checkout-form-label" for="paymentMethod"
                  >付款方式 <span class="text-red-500">*</span></label
                >
                <select
                  v-model="paymentMethod"
                  v-bind="paymentMethodAttrs"
                  id="paymentMethod"
                  class="select bg-[#FFFBF5] border-[#FFE5D1] text-[#6B5444]"
                >
                  <option selected disabled value="">請選擇付款方式</option>
                  <option value="cash">現金</option>
                  <option value="creditCard">信用卡</option>
                </select>
                <span
                  v-if="errors.paymentMethod"
                  class="text-red-500 text-sm mt-1 block"
                >
                  {{ errors.paymentMethod }}
                </span>
              </div>

              <div>
                <label class="checkout-form-label" for="orderNotes"
                  >訂單備註</label
                >
                <textarea
                  v-model="orderNotes"
                  v-bind="orderNotesAttrs"
                  id="orderNotes"
                  class="checkout-form-input"
                  placeholder="有特殊需求嗎? 例如: 少糖、少冰等..."
                ></textarea>
              </div>

              <button class="btn-primary w-full px-8 py-4">
                確認訂單(下一步)
              </button>
            </form>
          </div>
        </div>

        <!-- Step 2: 確認訂單 -->
        <div v-if="currentStep === 2" class="lg:col-span-6 space-y-6">
          <div
            class="bg-linear-to-br from-white via-[#FFFBF5] to-[#FFF9F0] p-8 md:p-10 border-2 border-[#FFE5D1] rounded-4xl shadow-lg"
          >
            <h2 class="text-[#4A3D2F] mb-8">訂餐資訊</h2>

            <!-- 顯示用戶填寫的資料 -->
            <div class="space-y-7 pl-1">
              <div class="flex gap-4 text-xl">
                <span class="text-[#A68F7C]">姓名：</span>
                <span class="text-[#3E3835] font-bold">{{ values.name }}</span>
              </div>
              <div class="flex gap-4 text-xl">
                <span class="text-[#A68F7C]">電話：</span>
                <span class="text-[#3E3835] font-bold">{{ values.phone }}</span>
              </div>
              <div class="flex gap-4 text-xl">
                <span class="text-[#A68F7C]">Email：</span>
                <span class="text-[#3E3835] font-bold">{{ values.email }}</span>
              </div>

              <div class="border-t border-[#FFE5D1] my-6"></div>

              <div class="flex gap-4 text-xl">
                <span class="text-[#A68F7C]">付款方式：</span>
                <span class="text-[#3E3835] font-bold">{{
                  computedPaymentMethod
                }}</span>
              </div>
              <div v-if="values.orderNotes" class="flex gap-4 text-xl">
                <span class="text-[#A68F7C]">備註：</span>
                <span class="text-[#3E3835] font-bold">{{
                  values.orderNotes
                }}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row justify-between gap-4">
            <button
              @click="goBackToEdit"
              class="flex-1 sm:flex-none px-4 py-2 bg-[#E8D5C4] text-[#6B5444] shadow-[0_4px_0_0_#C4A68A] hover:shadow-[0_6px_0_0_#C4A68A] rounded-full font-bold border-2 border-[#4A3D2F] hover:scale-105 transition-all cursor-pointer"
            >
              ← 返回修改
            </button>
            <button
              class="flex-1 sm:flex-none btn-primary px-4 py-2 text-lg"
              @click="createOrder"
            >
              確認付款
            </button>
          </div>
        </div>

        <!-- Step 3: 訂單完成 -->
        <div v-if="currentStep === 3" class="lg:col-span-6">
          <div
            class="bg-white p-8 md:p-10 border-2 border-[#FFE5D1] rounded-4xl shadow-lg"
          >
            <div class="text-6xl mb-6">🎉</div>
            <h2 class="text-[#4A3D2F] mb-4">訂單建立成功！</h2>
            <p class="text-[#8B7A68] mb-8">感謝您的訂購，我們將盡快為您準備</p>

            <div class="bg-[#FFFBF5] p-6 rounded-2xl mb-8">
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-[#8B7A68]">訂單編號：</span>
                  <span class="text-[#4A3D2F] font-bold">{{
                    orderResult.orderId
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-[#8B7A68]">付款日期：</span>
                  <span class="text-[#4A3D2F] font-bold">
                    {{
                      new Date(orderResult.createAt * 1000).toLocaleString(
                        "zh-TW",
                      )
                    }}
                  </span>
                </div>
              </div>
            </div>

            <button
              @click="$router.push({ name: 'Home' })"
              class="btn-primary px-8 py-4"
            >
              返回首頁
            </button>
          </div>
        </div>

        <!-- 右半部 -->
        <div v-if="currentStep !== 3" class="lg:col-span-5">
          <div
            class="bg-white p-8 md:p-10 border-2 border-[#FFE5D1] rounded-4xl shadow-lg"
          >
            <h3 class="text-[#4A3D2F] mb-8">訂單明細</h3>
            <div class="pb-5 border-b-2 border-[#FFE5D1]">
              <div
                v-for="item in cartStore.cartData"
                :key="item.id"
                class="flex gap-4 mb-3"
              >
                <div
                  class="w-18 h-18 overflow-hidden bg-[#FFFBF5] border-2 border-[#FFE5D1] rounded-2xl"
                >
                  <img
                    class="w-full h-full object-cover"
                    :src="item.product.imageUrl"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <h4 class="text-[#4A3D2F]">
                      {{ item.product.title }}
                    </h4>
                    <p class="text-[#4A3D2F]">x {{ item.qty }}</p>
                  </div>
                  <div>
                    <p class="text-gray-400">NT$ {{ item.product.price }}</p>
                    <p class="text-end text-[#4A3D2F]">NT$ {{ item.total }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-4">
              <div
                class="flex items-center justify-between pb-5 border-b-2 border-[#FFE5D1] text-[#6B5444]"
              >
                <span>付款方式</span>

                <span>{{ computedPaymentMethod }}</span>
              </div>
            </div>

            <div class="pt-4">
              <div>
                <div
                  v-if="cartStore.hasCoupon"
                  class="flex justify-between items-center text-[#4A3D2F] text-lg"
                >
                  <div>小計：</div>
                  <div>NT$ {{ cartStore.total }}</div>
                </div>
                <div
                  v-if="cartStore.hasCoupon"
                  class="flex justify-between items-center text-[#4A8A4A] text-lg"
                >
                  <div>優惠：</div>
                  <div>-NT$ {{ cartStore.discount }}</div>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-xl font-bold text-[#4A3D2F]">總計</span>
                <span class="text-2xl font-black text-[#4A3D2F]"
                  >NT$ {{ cartStore.finalTotal }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <div v-else class="lg:col-span-5">
          <div
            class="bg-white p-8 md:p-10 border-2 border-[#FFE5D1] rounded-4xl shadow-lg"
          >
            <h3 class="text-[#4A3D2F] mb-8">訂單明細</h3>
            <div class="pb-5 border-b-2 border-[#FFE5D1]">
              <div
                v-for="item in orderSnapshot.items"
                :key="item.id"
                class="flex gap-4 mb-3"
              >
                <div
                  class="w-18 h-18 overflow-hidden bg-[#FFFBF5] border-2 border-[#FFE5D1] rounded-2xl"
                >
                  <img
                    class="w-full h-full object-cover"
                    :src="item.product.imageUrl"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <h4 class="text-[#4A3D2F]">
                      {{ item.product.title }}
                    </h4>
                    <p class="text-[#4A3D2F]">x {{ item.qty }}</p>
                  </div>
                  <div>
                    <p class="text-gray-400">NT$ {{ item.product.price }}</p>
                    <p class="text-end text-[#4A3D2F]">NT$ {{ item.total }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-4">
              <div
                class="flex items-center justify-between pb-5 border-b-2 border-[#FFE5D1] text-[#6B5444]"
              >
                <span>付款方式</span>

                <span>{{ computedPaymentMethod }}</span>
              </div>
            </div>

            <div class="pt-4">
              <div>
                <div
                  v-if="orderSnapshot.hasCoupon"
                  class="flex justify-between items-center text-[#4A3D2F] text-lg"
                >
                  <div>小計：</div>
                  <div>NT$ {{ orderSnapshot.total }}</div>
                </div>
                <div
                  v-if="orderSnapshot.hasCoupon"
                  class="flex justify-between items-center text-[#4A8A4A] text-lg"
                >
                  <div>優惠：</div>
                  <div>-NT$ {{ orderSnapshot.discount }}</div>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-xl font-bold text-[#4A3D2F]">總計</span>
                <span class="text-2xl font-black text-[#4A3D2F]"
                  >NT$ {{ orderSnapshot.finalTotal }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ToastType } from "../../types/clientToast";
import { ref, computed, inject, nextTick, onMounted } from "vue";
import { useRoute } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "../../stores/cart";
import { useForm } from "vee-validate";
import * as yup from "yup";
import api from "../../utils/api";
import axios from "axios";

onMounted(() => {
  // 檢查 URL 是否帶有 ?payment=success 參數（綠界付款完成後會帶回這個參數）
  if (route.query.payment === "success") {
    // 從 localStorage 讀回離開前的資料
    const pending = localStorage.getItem("pendingOrder");
    if (pending) {
      const data = JSON.parse(pending);
      orderResult.value = {
        orderId: data.orderId,
        createAt: data.createAt,
        total: data.snapshot.finalTotal,
      };
      orderSnapshot.value = data.snapshot;
      localStorage.removeItem("pendingOrder"); // 用完清掉，避免下次進來又顯示舊資料
    }
    currentStep.value = 3;
    scrollToTop();
  }
});

const toast = inject<{
  showCartMsg(msg: string, type: ToastType): void;
}>("toast");

const route = useRoute();

const cartStore = useCartStore();

const currentStep = ref(1); // 1: 填寫資訊, 2: 確認訂單, 3: 訂單完成

// 儲存訂單結果
const orderResult = ref({
  orderId: "",
  createAt: 0,
  total: 0,
});

// 備份購物車資料用（用於 Step 3 顯示）
const orderSnapshot = ref({
  items: [],
  total: 0,
  finalTotal: 0,
  discount: 0,
  hasCoupon: false,
});

// 定義驗證規則
const schema = yup.object({
  name: yup.string().required("姓名為必填"),
  phone: yup
    .string()
    .required("電話為必填")
    .matches(/^09\d{8}$/, "請輸入正確的手機號碼格式 (09xxxxxxxx)"),
  email: yup.string().required("Email為必填").email("請輸入有效的Email地址"),
  paymentMethod: yup.string().required("請選擇付款方式"),
  orderNotes: yup.string(),
});

const { values, errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
});

const [name, nameAttrs] = defineField("name");
const [phone, phoneAttrs] = defineField("phone");
const [email, emailAttrs] = defineField("email");
const [paymentMethod, paymentMethodAttrs] = defineField("paymentMethod");
const [orderNotes, orderNotesAttrs] = defineField("orderNotes");

const computedPaymentMethod = computed(() => {
  switch (paymentMethod.value) {
    case "cash":
      return "現金";
    case "creditCard":
      return "信用卡";
    default:
      return "";
  }
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const submitOrder = handleSubmit((values) => {
  // Step 1 -> Step 2 : 驗證通過，進入確認訂單頁面
  currentStep.value = 2;
  nextTick(() => {
    scrollToTop();
  });
});

// Step 2 -> Step 3：提交訂單
const createOrder = async () => {
  // 備份購物車資料
  orderSnapshot.value = {
    items: JSON.parse(JSON.stringify(cartStore.cartData)),
    total: cartStore.total,
    finalTotal: cartStore.finalTotal,
    discount: cartStore.discount,
    hasCoupon: cartStore.hasCoupon,
  };

  const formData = {
    data: {
      user: {
        name: values.name,
        email: values.email,
        tel: values.phone,
        address: "僅限內用及外帶",
      },
      message: values.orderNotes || "",
    },
  };
  try {
    // 創建訂單
    const orderRes = await api.post(
      `/api/${import.meta.env.VITE_API_PATH}/order`,
      formData,
    );

    if (orderRes.data.success) {
      const orderId = orderRes.data.orderId;

      if (values.paymentMethod === "creditCard") {
        // 付款方式選信用卡時，走綠界金流
        const ecpayRes = await axios.post(
          "https://coffeeshop-payment.zeabur.app/pay",
          {
            orderId: orderId,
            total: cartStore.finalTotal,
            itemName: cartStore.cartData.map((i) => i.product.title).join("#"),
          },
        );

        // 把後端回傳的 HTML 注入到頁面，然後自動 submit
        // 這個動作會讓瀏覽器離開你的網站，跳到綠界付款頁
        const div = document.createElement("div");
        div.innerHTML = ecpayRes.data;
        document.body.appendChild(div);

        // 跳轉前把訂單資料存到 localStorage，回來後可以還原
        localStorage.setItem(
          "pendingOrder",
          JSON.stringify({
            orderId: orderId,
            createAt: Math.floor(Date.now() / 1000),
            snapshot: orderSnapshot.value,
          }),
        );

        (div.querySelector("form") as HTMLFormElement).submit();
      } else {
        // 現金付款
        const payRes = await api.post(
          `/api/${import.meta.env.VITE_API_PATH}/pay/${orderId}`,
        );

        if (payRes.data.success) {
          // 储存订单结果
          orderResult.value = {
            orderId: orderId,
            createAt: orderRes.data.create_at,
            total: orderRes.data.total,
          };

          toast?.showCartMsg("訂單建立成功並已完成付款！", "success");

          await cartStore.getCart();

          currentStep.value = 3;

          nextTick(() => {
            scrollToTop();
          });
        } else {
          // 付款失败（但订单已创建）
          toast?.showCartMsg(
            `訂單已建立，但付款失敗。訂單編號：${orderId}`,
            "error",
          );
          console.error("付款失败:", payRes.data);
        }
      }
    }
  } catch (err: any) {
    console.error("訂單提交失敗:", err);

    // 显示具体错误信息
    const errorMsg = err.response?.data?.message || "訂單提交失敗，請稍後再試";
    toast?.showCartMsg(errorMsg, "error");
  }
};

// Step 2 → Step 1：返回编辑
const goBackToEdit = () => {
  currentStep.value = 1;
  nextTick(() => {
    scrollToTop();
  });
};
</script>
