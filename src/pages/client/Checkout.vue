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
          class="bg-linear-to-r from-[#FFE5D1] to-[#FFD4B0] text-[#4A3D2F] px-6 py-3 rounded-full font-bold shadow-md border-2 border-white"
        >
          1. 建立訂單
        </div>
        <div class="text-[#D4B5A0]">→</div>
        <div
          class="bg-white text-[#8B7A68] px-6 py-3 rounded-full border-2 border-[#FFE5D1]"
        >
          2. 確認及付款
        </div>
        <div class="text-[#D4B5A0]">→</div>
        <div
          class="bg-white text-[#8B7A68] px-6 py-3 rounded-full border-2 border-[#FFE5D1]"
        >
          3. 訂單完成
        </div>
      </div>

      <!-- 內容 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- 左半部 -->
        <div class="lg:col-span-7">
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
        <!-- 右半部 -->
        <div class="lg:col-span-5">
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "../../stores/cart";
import { useForm } from "vee-validate";
import * as yup from "yup";

const cartStore = useCartStore();

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

const submitOrder = handleSubmit((values) => {
  // 提交訂單邏輯
  console.log("驗證通過！訂單資料:", values);
});
</script>
