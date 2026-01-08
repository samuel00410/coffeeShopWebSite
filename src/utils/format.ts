export const currencyFormat = (num: number) => {
  const n = parseInt(num, 10);
  return `$${n.toLocaleString()}`;
};

// 格式化時間戳
export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // 轉換成毫秒
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

// 格式化產品列表顯示
export const formatProductList = (products: any) => {
  // products 是物件，需要轉換成陣列
  const productArray = Object.values(products);

  // 依序顯示產品名稱和產品數量
  if (productArray.length > 0) {
    return productArray
      .map(
        (item: any) =>
          `${item.product.title}   數量 : ${item.qty} ${item.product.unit} `
      )
      .join("\n");
  }
  return "無商品";
};
