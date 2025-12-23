<template>
  <dialog ref="modalEl" class="modal">
    <div class="modal-box">
      <h3 class="font-bold mb-4">
        {{ isEdit ? "編輯優惠券" : "新增優惠券" }}
      </h3>

      <div>
        <div class="form-control">
          <fieldset class="fieldset">
            <legend class="fieldset-legend text-lg text-base-content/60">
              優惠券名稱
            </legend>
            <input
              v-model="formData.title"
              placeholder="請輸入優惠券名稱"
              class="input input-bordered"
            />
          </fieldset>
        </div>
        <div class="form-control">
          <fieldset class="fieldset">
            <legend class="fieldset-legend text-lg text-base-content/60">
              優惠百分比
            </legend>
            <input
              v-model="formData.percent"
              type="number"
              placeholder="請輸入優惠百分比"
              class="input input-bordered"
            />
          </fieldset>
        </div>

        <div class="form-control">
          <legend class="fieldset-legend text-lg text-base-content/60">
            到期日
          </legend>
          <input v-model="formData.due_date" type="date" class="input" />
        </div>
        <div class="form-control">
          <fieldset class="fieldset">
            <legend class="fieldset-legend text-lg text-base-content/60">
              優惠券代碼
            </legend>
            <input
              v-model.number="formData.code"
              type="text"
              placeholder="請輸入優惠券代碼"
              class="input input-bordered"
            />
          </fieldset>
        </div>

        <div class="form-control mt-4">
          <label class="label cursor-pointer justify-start gap-3">
            <span class="label-text">是否啟用優惠券</span>
            <input
              v-model="formData.is_enabled"
              type="checkbox"
              class="toggle toggle-success"
              :true-value="1"
              :false-value="0"
            />
          </label>
        </div>
      </div>

      <div class="modal-action">
        <button class="btn" @click="closeModal">取消</button>
        <button class="btn btn-primary" @click="submitProduct">
          確認{{ isEdit ? "更新" : "新增" }}
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal">close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import type { iCoupon, iCouponForm } from "../../../types/coupon";
import { ref, watch, computed, inject } from "vue";
import api from "../../../utils/api";

const props = defineProps<{
  coupon?: iCoupon;
}>();

const emit = defineEmits<{
  (e: "refresh"): void;
}>();

const toast = inject<{
  showSuccess(title: string, message: string): void;
  showError(title: string, message: string): void;
}>("toast");

const modalEl = ref<HTMLDialogElement | null>(null);
const inputFile = ref<HTMLInputElement | null>(null);

const formData = ref<iCouponForm>({
  title: "",
  is_enabled: undefined,
  percent: undefined,
  due_date: "",
  code: "",
});

const isEdit = computed(() => {
  return props.coupon !== undefined;
});

const openModal = () => {
  modalEl.value?.showModal();
};

const closeModal = () => {
  modalEl.value?.close();
  resetModal();
};

const resetModal = () => {
  formData.value = {
    title: "",
    is_enabled: undefined,
    percent: undefined,
    due_date: undefined,
    code: "",
  };
};

const submitProduct = async () => {
  if (isEdit.value) {
    await updateCoupon();
  } else {
    await createCoupon();
  }
};

const createCoupon = async () => {
  let transDate = Math.floor(
    new Date(formData.value.due_date).getTime() / 1000
  );

  const padload = {
    data: {
      ...formData.value,
      due_date: transDate,
    },
  };

  try {
    const res = await api.post(
      `/api/${import.meta.env.VITE_API_PATH}/admin/coupon`,
      padload
    );
    if (res.data.success) {
      emit("refresh");
      toast?.showSuccess("新增優惠券成功", "優惠券已新增至列表");
    }
  } catch (err: any) {
    const errorMsg = err.response.data.message;
    if (Array.isArray(errorMsg)) {
      toast?.showError("新增優惠券失敗", errorMsg.join("、"));
    } else {
      console.error("新增優惠券失敗:", err);
      toast?.showError("新增優惠券失敗", "優惠券新增失敗，請稍後再試");
    }
  } finally {
    closeModal();
  }
};

const updateCoupon = async () => {
  let transDate = Math.floor(
    new Date(formData.value.due_date).getTime() / 1000
  );

  const padload = {
    data: {
      ...formData.value,
      due_date: transDate,
    },
  };

  try {
    const res = await api.put(
      `/api/${import.meta.env.VITE_API_PATH}/admin/coupon/${props.coupon?.id}`,
      padload
    );

    if (res.data.success) {
      resetModal();
      emit("refresh");
      toast?.showSuccess("更新產品成功", "產品已成功更新");
    }
  } catch (err: any) {
    const errorMsg = err.response.data.message;
    if (Array.isArray(errorMsg)) {
      toast?.showError("更新產品失敗", errorMsg.join("、"));
    } else {
      console.error("更新產品失敗:", err);
      toast?.showError("更新產品失敗", "產品更新失敗，請稍後再試");
    }
  } finally {
    closeModal();
  }
};

watch(
  () => props.coupon,
  (newCoupon) => {
    console.log("props.coupon changed:", newCoupon);
    if (newCoupon) {
      formData.value = {
        title: newCoupon.title ?? "",
        is_enabled: newCoupon.is_enabled,
        percent: newCoupon.percent,
        due_date: new Date((newCoupon.due_date ?? 0) * 1000)
          .toISOString()
          .slice(0, 10),
        code: newCoupon.code,
      };
    }
  }
);

defineExpose({
  openModal,
});
</script>

<style scoped>
.form-control {
  margin-bottom: 0.5rem;
}
</style>
