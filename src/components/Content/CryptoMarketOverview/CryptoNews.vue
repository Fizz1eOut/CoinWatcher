<script setup lang="ts">
  import { computed } from 'vue';
  import type { NewsItem } from '@/interface/news.interface';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppLink from '@/components/Base/AppLink.vue';

  // Принимаем массив новостей в пропсах
  const props = defineProps<{
    news: NewsItem[];
  }>();

  const formattedDates = computed(() => {
    return props.news.map((item) =>
      new Date(item.published_on * 1000).toLocaleString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  });

  // Форматирование URL изображений
  const fullImageUrls = computed(() => {
    return props.news.map((item) => {
      // Если URL уже содержит протокол (http:// или https://), используем его напрямую
      if (item.imageurl.startsWith('http://') || item.imageurl.startsWith('https://')) {
        return item.imageurl;
      }
      // Добавляем базовый URL, если путь относительный
      return 'https://cryptocompare.com' + item.imageurl;
    });
  });


</script>

<template>
  <div v-if="news.length > 0" class="crypto-news">
    <div class="crypto-news__header">
      <app-title>Latest Crypto News</app-title>
      <router-link to="/news">
        <app-link>View all</app-link>
      </router-link>
    </div>
    <div class="crypto-news__item">
      <div
        v-for="(item, index) in news"  
        :key="item.id"
        class="crypto-news__card"
      >
        <app-underlay>
          <app-container size="sm">
            <div class="news-card">
              <div class="news-card__image">
                <img :src="fullImageUrls[index]" class="news-card__image" />
              </div>

              <div class="news-card__content">
                <div class="news-card__tags">
                  Tags: {{ item.tags || "N/A" }}
                </div>

                <app-subtitle class="news-card__subtitle">{{ item.title }}</app-subtitle>

                <div class="news-card__row">
                  <p class="news-card__text">
                    {{ item.body }}
                  </p>
                  <a
                    :href="item.url"
                    target="_blank"
                    class="news-card__link"
                  >
                    Read more
                  </a>
                </div>

                <div class="news-card__meta">
                  <div class="news-card__source">Source: {{ item.source }}</div>
                  <div class="news-card__date">
                    Date of news: {{ formattedDates[index] }}
                  </div>
                </div>
              </div>
            </div>
          </app-container>
        </app-underlay>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .crypto-news {
    margin-top: 40px;
  }
  .crypto-news__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    max-width: 1170px;
  }
  .crypto-news__header .link {
    min-width: 76px;
  }
  .crypto-news__card {
    margin-top: 30px;
  }
  .crypto-news__card> *:not(:last-child) {
    margin-bottom: 40px;
  }
  .news-card {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
  }
  .news-card__image {
    border-radius: 10px;
  }
  .news-card__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 300px;
    width: 100%;
  }
  .news-card__text {
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    font-size: 16px;
    font-weight: 400;
  }
  .news-card__link {
    font-family: "Source Code Pro", monospace;
    font-size: 16px;
    font-weight: 500;
    line-height: 100%;
    color: var(--color-blue);
    transition: background 0.3s ease-in-out;
    cursor: pointer;
  }
  .news-card__link:hover {
    background: var(--color-gradient-hover);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .news-card__meta {
    font-size: 18px;
    font-weight: 400;
  }
  .news-card__tags {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 400;
    color: var(--color-gray);
  }
  @media (max-width: 768px) {
    .news-card__image {
      max-width: 200px;
      height: 300px;
      object-fit: fill;
    }
    .news-card__text {
      -webkit-line-clamp: 4;
      font-size: 14px;
    }
    .news-card__meta {
      font-size: 16px;
    }
  }
  @media (max-width: 599px) {
    .news-card {
      flex-direction: column;
    }
    .news-card__image {
      max-width: 100%;
      max-height: 300px;
      width: 100%;
    }
    .news-card__content {
      min-height: 260px;
    }
  } 
  @media (max-width: 499px) {
    .news-card__subtitle {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
    }
    .news-card__tags {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
     }
  }
</style>
