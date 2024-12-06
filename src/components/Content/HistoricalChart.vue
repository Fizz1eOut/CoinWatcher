<script setup lang="ts">
  import { computed } from 'vue';
import ApexCharts from 'vue3-apexcharts';
import type { HistoricalData } from '@/interface/marketCaps.interface';

// Интерфейс для пропсов
interface ChartProps {
  coinName: string;
  history: HistoricalData[];
}

// Описание пропсов через дженерик
const props = defineProps<ChartProps>();

// Настройки графика
const chartOptions = computed(() => ({
  chart: {
    type: 'line',
    height: 350,
    toolbar: {
      show: false, // Скрыть панель инструментов
    },
  },
  xaxis: {
    type: 'datetime',
    labels: {
      style: {
        colors: 'var(--color-blue)', // Цвет меток на оси X
        fontSize: '12px', // Размер шрифта
        fontFamily: 'Source Code Pro", monospace', // Шрифт
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: 'var(--color-blue)', // Цвет меток на оси Y
        fontSize: '12px', // Размер шрифта
        fontFamily: 'Source Code Pro", monospace', // Шрифт
      },
    },
  },
  grid: {
    borderColor: '#e7e7e7', // Цвет сетки
    strokeDashArray: 4, // Тип линии сетки (пунктир)
  },
  colors: ['#EDB60B'], // Цвет линии графика
  stroke: {
    curve: 'smooth', // Гладкость линии
    width: 3, // Толщина линии
  },
  markers: {
    size: 5, // Размер маркеров на графике
    colors: ['#EDB60B'], // Цвет маркеров
    strokeWidth: 2, // Толщина границы маркеров
  },
  title: {
    text: `Chart of historical capitalization for ${props.coinName}`,
    align: 'center',
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'var(--color-white)',
    },
  },
  tooltip: {
    theme: 'dark', // Темная тема всплывающей подсказки
    style: {
      fontSize: '16px', // Размер шрифта
      background: 'var(--color-blue)',
      color: 'var(--color-blue)',
    },
    x: {
      format: 'dd MMM yyyy', // Формат даты в оси X
      formatter: (val: number) => {
        return new Date(val).toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
      },
    },
    y: {
      formatter: (val: number) => {
        return `${val.toFixed(2)} USD`; // Отображение значений с двумя знаками после запятой и валютой
      },
    },
    marker: {
      show: true, // Показывать маркеры
      fillColors: ['#4caf50'], // Цвет маркера
    },
  },
}));

// Генерация данных для графика
const chartSeries = computed(() => [
  {
    name: props.coinName,
    data: props.history.map((entry: HistoricalData) => ({
      x: new Date(entry.time * 1000),
      y: entry.close,
    })),
  },
]);
</script>

<template>
  <div>
    <ApexCharts
      v-if="history.length > 0"
      :options="chartOptions"
      :series="chartSeries"
      type="line"
      height="300"
    />
    <p v-else>No historical data available</p>
  </div>
</template>

<style scoped>

</style>
