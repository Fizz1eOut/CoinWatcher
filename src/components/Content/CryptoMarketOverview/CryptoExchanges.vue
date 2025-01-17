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
    { label: '24h Volume', key: 'volume', sortable: true },
    { label: 'Rating', key: 'gradePoints', sortable: true },
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
  
  const sortKey = ref<string | null>(null);
  const sortOrder = ref<'asc' | 'desc'>('asc');

  // Функция для извлечения сортируемого значения из объекта монеты на основе заданного ключа.
  const extractSortableValue = (exchange: ExchangeData, key: string): string | number | null => {
    switch (key) {
      case 'gradePoints': // Если ключ - 'gradePoints', извлекаем изменение за 24 часа
        return parseFloat(exchange.GradePoints || '0');
      case 'volume': // Если ключ - 'volume', извлекаем объем торгов за 24 часа
        return parseFloat(exchange.DISPLAYTOTALVOLUME24H?.BTC?.replace(/[^0-9.-]/g, '') || '0');
      default: // Для других ключей возвращаем null
        return null;
    }
  };

  // Компьютед для сортировки данных
  const sortedData = computed(() => {
    // Если ключ сортировки не задан, возвращаем оригинальные данные
    if (!sortKey.value) return props.exchanges;

    // Создаем копию данных, чтобы не мутировать оригинальный массив
    const data = [...props.exchanges];

    data.sort((a, b) => {
      // Проверяем, что sortKey не равен null перед использованием
      if (!sortKey.value) return 0; 

      // Извлекаем значение для объекта A
      const valueA = extractSortableValue(a, sortKey.value);
      // Извлекаем значение для объекта B
      const valueB = extractSortableValue(b, sortKey.value);

      // Если значения не определены, оставляем их в исходном порядке
      if (valueA === null || valueB === null) return 0;

      // Сравниваем числа
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortOrder.value === 'asc' ? valueA - valueB : valueB - valueA;
      }

      // Сравниваем строки
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortOrder.value === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      // Если типы данных не совместимы, возвращаем 0
      return 0;
    });
    // Возвращаем отсортированный массив
    return data;
  });

  // Функция для переключения порядка сортировки
  const toggleSort = (key: string) => {
    if (sortKey.value === key) {
      // Если ключ уже выбран, переключаем порядок сортировки
      if (sortOrder.value === 'asc') {
        sortOrder.value = 'desc';
      } else {
        // Если уже был 'desc', сбрасываем сортировку
        sortKey.value = null;
        sortOrder.value = 'asc';
      }
    } else {
      // Если выбран новый ключ, устанавливаем его и порядок по возрастанию
      sortKey.value = key;
      sortOrder.value = 'asc';
    }
  };

  // Подготовка данных для таблицы
  const tableData = computed(() =>
    sortedData.value.map(exchange => ({
      logo: exchange.LogoUrl,
      name: exchange.Name,
      country: exchange.Country,
      volume: exchange.DISPLAYTOTALVOLUME24H?.BTC,
      gradePoints: `${exchange.GradePoints}%`,
      trades: exchange.Trades,
      website: exchange.AffiliateURL
    }))
  );

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
        :sort-key="sortKey"
        :sort-order="sortOrder"
        :onRowClick="handleExchangeRowClick"
        @sort="toggleSort"
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

