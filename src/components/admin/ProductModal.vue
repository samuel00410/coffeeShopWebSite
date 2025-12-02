<template>
  <dialog ref="modalEl" class="modal">
    <div class="modal-box max-w-5xl">
      <h3 class="font-bold text-lg mb-4">
        {{ isEdit ? "編輯產品" : "新增產品" }}
      </h3>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左側：圖片上傳 -->
        <div class="lg:col-span-1">
          <div class="form-control">
            <label class="label">
              <span class="label-text">產品圖片</span>
            </label>
            <input
              v-model="formData.imageUrl"
              type="text"
              placeholder="輸入圖片網址"
              class="input input-bordered w-full"
            />
          </div>

          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text">或上傳圖片</span>
            </label>
            <input
              ref="inputFile"
              type="file"
              class="file-input file-input-bordered w-full"
              @change="uploadFile"
            />
          </div>

          <div v-if="formData.imageUrl" class="mt-4">
            <img
              :src="formData.imageUrl"
              class="w-full rounded-lg shadow-md"
              alt="產品圖片"
            />
          </div>
        </div>

        <!-- 右側：產品資訊 -->
        <div class="lg:col-span-2">
          <div class="form-control">
            <label class="label">
              <span class="label-text">產品名稱</span>
            </label>
            <input
              v-model="formData.title"
              type="text"
              placeholder="請輸入產品名稱"
              class="input input-bordered w-full"
            />
          </div>

          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">分類</span>
              </label>
              <input
                v-model="formData.category"
                type="text"
                placeholder="例如：咖啡、茶飲"
                class="input input-bordered w-full"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">單位</span>
              </label>
              <input
                v-model="formData.unit"
                type="text"
                placeholder="例如：杯、份"
                class="input input-bordered w-full"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">原價</span>
              </label>
              <input
                v-model.number="formData.origin_price"
                type="number"
                placeholder="請輸入原價"
                class="input input-bordered w-full"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">售價</span>
              </label>
              <input
                v-model.number="formData.price"
                type="number"
                placeholder="請輸入售價"
                class="input input-bordered w-full"
              />
            </div>
          </div>

          <div class="divider"></div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">產品描述</span>
            </label>
            <textarea
              v-model="formData.description"
              class="textarea textarea-bordered h-20"
              placeholder="請輸入產品的簡短描述"
            ></textarea>
          </div>

          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text">詳細說明</span>
            </label>
            <textarea
              v-model="formData.content"
              class="textarea textarea-bordered h-24"
              placeholder="請輸入產品的詳細說明"
            ></textarea>
          </div>

          <div class="form-control mt-4">
            <label class="label cursor-pointer justify-start gap-3">
              <input
                v-model="formData.is_enabled"
                type="checkbox"
                class="toggle toggle-success"
                :true-value="1"
                :false-value="0"
              />
              <span class="label-text">啟用產品</span>
            </label>
          </div>
        </div>
      </div>

      <div class="modal-action">
        <button class="btn" @click="closeModal">取消</button>
        <button class="btn btn-primary" @click="submitProduct">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
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
import type { Product, ProductForm } from "../types/product";
import { ref, watch, computed, inject } from "vue";
import axios from "axios";

const props = defineProps<{
  product?: Product;
}>();

const emit = defineEmits<{
  (e: "refresh"): void;
}>();

const toast = inject<{
  showSuccess(title: string, message: string): void;
  showError(title: string, message: string): void;
  showWarning(title: string, message: string): void;
}>("toast");

const modalEl = ref<HTMLDialogElement | null>(null);
const inputFile = ref<HTMLInputElement | null>(null);

const formData = ref<ProductForm>({
  title: "",
  category: "",
  unit: "",
  origin_price: 0,
  price: 0,
  description: "",
  content: "",
  is_enabled: 0,
  imageUrl: "",
});

const isEdit = computed(() => {
  return props.product !== undefined;
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
    category: "",
    unit: "",
    origin_price: 0,
    price: 0,
    description: "",
    content: "",
    is_enabled: 0,
    imageUrl: "",
  };

  // 清空檔案選擇
  if (inputFile.value) {
    inputFile.value.value = "";
  }
};

const submitProduct = async () => {
  if (isEdit.value) {
    await updateProduct();
  } else {
    await createProduct();
  }
};

const createProduct = async () => {
  const token = localStorage.getItem("hexToken");
  const api = `${import.meta.env.VITE_API_URL}/api/${
    import.meta.env.VITE_API_PATH
  }/admin/product`;

  try {
    const res = await axios.post(
      api,
      { data: formData.value },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.data.success) {
      emit("refresh");
      toast?.showSuccess("新增產品成功", "產品已新增至列表");
    }
  } catch (err: any) {
    const errorMsg = err.response.data.message;
    if (Array.isArray(errorMsg)) {
      toast?.showError("新增產品失敗", errorMsg.join("、"));
    } else {
      console.error("新增產品失敗:", err);
      toast?.showError("新增產品失敗", "產品新增失敗，請稍後再試");
    }
  } finally {
    closeModal();
  }
};

const updateProduct = async () => {
  const token = localStorage.getItem("hexToken");
  const api = `${import.meta.env.VITE_API_URL}/api/${
    import.meta.env.VITE_API_PATH
  }/admin/product/${props.product?.id}`;

  try {
    const res = await axios.put(
      api,
      { data: formData.value },
      {
        headers: {
          Authorization: token,
        },
      }
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

// 上傳圖片
const uploadFile = () => {
  const uploadedFiles = inputFile.value?.files?.[0];
  if (!uploadedFiles) return;

  const uploadFormData = new FormData();
  uploadFormData.append("file-to-upload", uploadedFiles as Blob);

  const token = localStorage.getItem("hexToken");

  const api = `${import.meta.env.VITE_API_URL}/api/${
    import.meta.env.VITE_API_PATH
  }/admin/upload`;

  axios
    .post(api, uploadFormData, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.success) {
        formData.value.imageUrl = res.data.imageUrl;
        toast?.showSuccess("上傳成功", "圖片已成功上傳");
      }
    })
    .catch((err) => {
      console.error("上傳失敗:", err);
      toast?.showError("上傳失敗", "圖片上傳失敗，請稍後再試");
    });
};

watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      formData.value = {
        title: newProduct.title,
        category: newProduct.category,
        unit: newProduct.unit,
        origin_price: newProduct.origin_price,
        price: newProduct.price,
        description: newProduct.description || "",
        content: newProduct.content || "",
        is_enabled: newProduct.is_enabled,
        imageUrl: newProduct.imageUrl || "",
      };
    } else {
      resetModal();
    }
  },
  { immediate: true }
);

defineExpose({
  openModal,
});
</script>
