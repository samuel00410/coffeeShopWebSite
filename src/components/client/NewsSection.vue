<template>
  <section class="news-section bg-hero-bottom">
    <div class="news-wrap">
      <header class="news-header">
        <h2>最新消息</h2>
      </header>
    </div>
  </section>
</template>

<script setup lang="ts">
interface NewsItem {
  id: number;
  category: string;
  author: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    category: "工作坊",
    author: "拉花",
    date: "2026.02.08",
    title: "拉花藝術工作坊",
    excerpt:
      "學習如何製作美麗的咖啡拉花，從基礎到進階技巧，讓每杯咖啡都成為藝術品。",
    image: "/src/assets/images/featuredMenu/featuredMenu-1.webp",
  },
  {
    id: 2,
    category: "新品",
    author: "甜點",
    date: "2026.02.05",
    title: "新品上市：季節限定甜點",
    excerpt: "春季限定的櫻花杏仁塔搭配抹茶拿鐵，粉嫩色系與清新風味完美結合。",
    image: "/src/assets/images/featuredMenu/featuredMenu-2.webp",
  },
  {
    id: 3,
    category: "咖啡",
    author: "手沖",
    date: "2026.02.01",
    title: "手沖咖啡的秘密",
    excerpt:
      "探索完美手沖咖啡的秘訣，從水溫、研磨度到沖煮技巧，每個細節都影響風味。",
    image: "/src/assets/images/featuredMenu/featuredMenu-3.webp",
  },
];
</script>

<style scoped lang="scss">
.news-section {
  padding: 80px 24px;

  .news-wrap {
    max-width: 1152px;
    margin: 0 auto;
  }
}
</style>
