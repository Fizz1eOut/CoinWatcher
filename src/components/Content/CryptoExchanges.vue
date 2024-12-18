<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
  import type { ExchangeData } from '@/interface/exchanges.interface';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppTable from '@/components/Base/AppTable.vue';
  import AppImageCoin from '@/components/Base/AppImageCoin.vue';
  import AppLink from '@/components/Base/AppLink.vue';

  // Пропсы для передачи данных о биржах
  interface CryptoExchangesProps {
    exchanges: ExchangeData[];
  }

  const props = defineProps<CryptoExchangesProps>();

  // Реактивная ширина экрана
  const screenWidth = ref(window.innerWidth);
  const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', updateScreenWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenWidth);
  });

  // Конфигурация колонок таблицы
  const columns = [
    { label: 'Name', key: 'name', slotName: 'name' },
    { label: 'Country', key: 'country' },
    { label: '24h Volume', key: 'volume' },
    { label: 'Rating', key: 'gradePoints' },
    { label: 'Trading Enabled', key: 'trades', slotName: 'trades' },
  ];

  // Определение видимых колонок на основе ширины экрана
  const visibleColumns = computed(() => {
    if (screenWidth.value <= 599) {
      // Показываем только определенные колонки для маленьких экранов
      return columns.filter(col => ['name', 'volume', 'gradePoints'].includes(col.key));
    } else if (screenWidth.value <= 802) {
      // Для экранов шириной от 600px до 802px показываем выбранные колонки
      return columns.filter(col => ['name', 'country', 'volume', 'gradePoints'].includes(col.key));
    }
    // Для экранов шире 802px показываем все колонки
    return columns;
  });


  // Подготовка данных для таблицы
  const tableData = props.exchanges.map(exchange => ({
    logo: exchange.LogoUrl,
    name: exchange.Name,
    country: exchange.Country,
    volume: exchange.DISPLAYTOTALVOLUME24H?.BTC,
    gradePoints: `${exchange.GradePoints}%`,
    trades: exchange.Trades,
    website: exchange.AffiliateURL
  }));

  watch(() => screenWidth.value, () => {
  });

  // Обработчик клика для строк бирж
  const handleExchangeRowClick = (row: Record<string, unknown>) => {
    const url = String(row.website);
    if (url) {
      window.open(url, '_blank');
    }
  };
</script>

<template>
  <div v-if="exchanges.length > 0" class="exchanges">
    <div class="exchanges__header">
      <app-title>Top 10 Exchanges</app-title>
      <router-link to="/exchangers">
        <app-link>View all</app-link>
      </router-link>
    </div>
    <div class="exchanges__body">
      <app-table 
        :data="tableData" 
        :columns="visibleColumns" 
        :onRowClick="handleExchangeRowClick"
      >
        <template #name="{ row }">
          <div class="exchanges__row">
            <app-image-coin :imageUrl="String(row.logo)" />
            <div class="exchanges__name">{{ row.name }}</div>
          </div>
        </template>

        <template #trades="{ row }">
          <div>
            {{ row.trades ? 'Yes' : 'No' }}
          </div>
        </template>
      </app-table>
    </div>
  </div>
</template>

<style scoped>
  .exchanges {
    margin-top: 40px
  }
  .exchanges__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    max-width: 1170px;
  }
  .exchanges__header .link {
    min-width: 76px;
  }
  .exchanges__body {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
 .exchanges__row {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    max-width: 80px;
    width: 100%;
  }
  .exchanges__name {
    width: 100%;
  }
  @media (max-width: 480px) {
    .exchanges__body {
      margin-top: 20px;
    }
  }
</style>

