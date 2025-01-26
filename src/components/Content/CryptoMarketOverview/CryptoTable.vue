<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import type { TopCoin } from '@/interface/topCoins.interface';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppTable from '@/components/Base/AppTable.vue';
  import AppImageCoins from '@/components/Base/AppImageCoin.vue';
  import AppLink from '@/components/Base/AppLink.vue';
  import AppCoinData from '@/components/Base/AppCoinData.vue';
  import { useRouter } from 'vue-router';

  // Интерфейс для пропсов
  interface CryptoTableProps {
    topCoins: TopCoin[];
    showLink: boolean;
  }

  const props = defineProps<CryptoTableProps>();

  // Реактивная ширина экрана
  const screenWidth = ref(window.innerWidth);
  // Отслеживание ширины экрана
  const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', updateScreenWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenWidth);
  });

  const columns = [
    { label: 'Name', key: 'name', slotName: 'name' },
    { label: 'Price', key: 'price', slotName: 'price', sortable: true },
    { label: '24h Change', key: 'change', sortable: true },
    { label: 'Market Cap', key: 'marketCap', slotName: 'marketCap', sortable: true },
    { label: '24h Volume', key: 'volume', slotName: 'volume', sortable: true },
  ];

  const visibleColumns = computed(() => {
    if (screenWidth.value <= 480) {
      // Меньше 480px: показываем только Name и Price
      return columns.filter(col => ['name', 'price', 'change'].includes(col.key));
    } else if (screenWidth.value <= 600) {
      // Меньше 600px: скрываем Market Cap и Volume
      return columns.filter(col => !['volume'].includes(col.key));
    }
    // По умолчанию: показываем все колонки
    return columns;
  });

  const sortKey = ref<string | null>(null);
  const sortOrder = ref<'asc' | 'desc'>('asc');

  // Функция для извлечения сортируемого значения из объекта монеты на основе заданного ключа.
  const extractSortableValue = (coin: TopCoin, key: string): string | number | null => {
    switch (key) {
      case 'price': // Если ключ - 'price', извлекаем цену
        return parseFloat(coin.DISPLAY?.USD?.PRICE?.replace(/[^0-9.-]/g, '') || '0');
      case 'change': // Если ключ - 'change', извлекаем изменение за 24 часа
        return parseFloat(coin.DISPLAY?.USD?.CHANGEPCT24HOUR || '0');
      case 'marketCap': // Если ключ - 'marketCap', извлекаем капитализацию
        return parseFloat(coin.DISPLAY?.USD?.MKTCAP?.replace(/[^0-9.-]/g, '') || '0');
      case 'volume': // Если ключ - 'volume', извлекаем объем торгов за 24 часа
        return parseFloat(coin.DISPLAY?.USD?.TOTALVOLUME24H?.replace(/[^0-9.-]/g, '') || '0');
      default: // Для других ключей возвращаем null
        return null;
    }
  };

  // Компьютед для сортировки данных
  const sortedData = computed(() => {
    // Если ключ сортировки не задан, возвращаем оригинальные данные
    if (!sortKey.value) return props.topCoins;

    // Создаем копию данных, чтобы не мутировать оригинальный массив
    const data = [...props.topCoins];

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

  const tableData = computed(() =>
    sortedData.value.map(coin => ({
      name: coin.CoinInfo.Name,
      imageUrl: coin.CoinInfo.ImageUrl,
      price: coin.DISPLAY?.USD?.PRICE,
      change: `${coin.DISPLAY?.USD?.CHANGEPCT24HOUR}%`,
      marketCap: coin.DISPLAY?.USD?.MKTCAP,
      volume: coin.DISPLAY?.USD?.TOTALVOLUME24H,
    })),
  );

  const router = useRouter();
  const handleRowClick = (row: Record<string, unknown>) => {
    // Проверяем, есть ли поле `name`, характерное для монет
    if (row.name) {
      router.push({ name: 'CoinDetailView', params: { name: String(row.name) } });
    }
  };
</script>

<template>
  <div v-if="props.topCoins.length > 0" class="crypto-table">
    <div class="crypto-table__header">
      <app-title>
        <slot name="header">Top 10 Cryptocurrencies</slot>
      </app-title>
      <router-link v-if="showLink" to="/coins">
        <app-link>View all</app-link>
      </router-link>
    </div>
    <div class="crypto-table__body">
      <app-table
        :data="tableData"
        :columns="visibleColumns"
        @sort="toggleSort"
        :sort-key="sortKey"
        :sort-order="sortOrder"
        :onRowClick="handleRowClick"
      >
        <template #name="{ row }">
          <div class="row">
            <app-image-coins :imageUrl="String(row.imageUrl)" />
            <div class="name">{{ row.name }}</div>
          </div>
        </template>
        <template #price="{ row }">
          <app-coin-data :coinName="String(row.name)" dataType="price" />
        </template>
        <template #marketCap="{ row }">
          <app-coin-data :coinName="String(row.name)" dataType="marketCap" />
        </template>
        <template #volume="{ row }">
          <app-coin-data :coinName="String(row.name)" dataType="volume24h" />
        </template>
      </app-table>
    </div>
  </div>
</template>

<style scoped>
  .crypto-table {
    margin-top: 40px
  }
  .crypto-table__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    max-width: 1170px;
  }
  .crypto-table__header .link {
    min-width: 76px;
  }
  .crypto-table__body {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .row {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    max-width: 80px;
    width: 100%;
  }
  .name {
    width: 100%;
  }
  @media (max-width: 480px) {
    .crypto-table__body {
      margin-top: 20px;
    }
  }
</style>
