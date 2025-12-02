<template>
  <Loading :active="isLoading" />
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold">產品管理</h2>
    <button class="btn btn-primary" @click="openModal(true)">
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
          d="M12 4v16m8-8H4"
        />
      </svg>
      新增產品
    </button>
  </div>

  <div class="overflow-x-auto bg-base-100 rounded-lg shadow">
    <table class="table table-zebra w-full">
      <thead>
        <tr>
          <th>分類</th>
          <th>產品名稱</th>
          <th>原價</th>
          <th>售價</th>
          <th>狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td class="font-medium">{{ product.title }}</td>
          <td>{{ currencyFormat(product.origin_price) }}</td>
          <td class="font-semibold text-primary">
            {{ currencyFormat(product.price) }}
          </td>
          <td>
            <span v-if="product.is_enabled" class="badge badge-success"
              >啟用</span
            >
            <span v-else class="badge badge-error">未啟用</span>
          </td>
          <td>
            <div class="flex gap-2">
              <button
                @click="openModal(false, product)"
                class="btn btn-sm btn-info"
              >
                編輯
              </button>
              <button
                class="btn btn-sm btn-error"
                @click="openDeleteModal(product)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <Pagination :pages="pagination" @pageChanged="updatePage" />

  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @refresh="refreshPage"
  />
  <DeleteModal ref="deleteModal" @refresh="refreshPage" />
</template>

<script setup lang="ts">
import type {
  Product,
  ProductsResponse,
  Tpagination,
} from "../../types/product";
import { ref, onMounted } from "vue";
import axios from "axios";
import ProductModal from "../../components/admin/ProductModal.vue";
import DeleteModal from "../../components/admin/DeleteModal.vue";
import Pagination from "../../components/admin/Pagination.vue";
import { currencyFormat } from "../../utils/format";

const isLoading = ref(false);
const products = ref<Product[]>([]);
const pagination = ref<Tpagination>({});
const tempProduct = ref<Product | undefined>(undefined);

const productModal = ref<InstanceType<typeof ProductModal> | null>(null);
const deleteModal = ref<InstanceType<typeof DeleteModal> | null>(null);

const updatePage = (page: number) => {
  getProducts(page);
};

const getProducts = async (page = 1) => {
  const token = localStorage.getItem("hexToken");

  const api = `${import.meta.env.VITE_API_URL}/api/${
    import.meta.env.VITE_API_PATH
  }/admin/products?page=${page}`;

  try {
    isLoading.value = true;
    const res = await axios.get<ProductsResponse>(api, {
      headers: {
        Authorization: token,
      },
    });
    if (res.data.success) {
      products.value = res.data.products;
      pagination.value = res.data.pagination;
    }
  } catch (err) {
    console.error("取得產品列表失敗:", err);
  } finally {
    isLoading.value = false;
  }
};

const openModal = (isNew: boolean, product?: Product) => {
  if (isNew) {
    tempProduct.value = undefined;
  } else if (product) {
    tempProduct.value = { ...product };
  }
  productModal.value?.openModal();
};

const openDeleteModal = (product: Product) => {
  deleteModal.value?.openDeleteModal(product);
};

const refreshPage = () => {
  getProducts();
};

onMounted(() => {
  getProducts();
});
</script>
