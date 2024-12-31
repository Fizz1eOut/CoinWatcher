<script setup lang="ts">
  import { computed } from 'vue';
  import ApexCharts from 'vue3-apexcharts';
  import type { HistoricalData } from '@/interface/marketCaps.interface';
  import { formatCompactNumber } from '@/utils/numberFormatter';

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
        tools: {
          zoom: false, // Убрать возможность масштабирования
          pan: false, // Убрать возможность перемещения
        },
        autoSelected: 'none',
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: 'var(--color-gray)', // Цвет меток на оси X
          fontSize: '12px', // Размер шрифта
          fontFamily: 'Source Code Pro", monospace', // Шрифт
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) =>
          value != null && !isNaN(value) ? `${formatCompactNumber(value)}$` : '-', // Использование formatCompactNumber
        style: {
          colors: 'var(--color-gray)',
        },
      },
    },
    grid: {
      borderColor: 'var(--color-gray)', // Цвет сетки
      strokeDashArray: 4, // Тип линии сетки (пунктир)
    },
    colors: ['var(--color-yellow)'],
    stroke: {
      curve: 'smooth', // Гладкость линии
      width: 3, // Толщина линии
    },
    markers: {
      size: 5, // Размер маркеров на графике
      colors: 'var(--color-yellow)', // Цвет маркеров
      strokeWidth: 2, // Толщина границы маркеров
    },
    title: {
      text: `Chart of historical capitalization for ${props.coinName}`,
      align: 'center',
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: 'var(--color-white)',
      },
    },
    tooltip: {
      theme: 'dark', // Темная тема всплывающей подсказки
      style: {
        fontSize: '12px', // Размер шрифта
        background: 'var(--color-blue)',
        color: 'var(--color-blue)',
      },
      x: {
        format: 'dd MMM yyyy', // Формат даты в оси X
        formatter: (val: number) => {
          return new Date(val).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });
        },
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
      marker: {
        show: true, // Показывать маркеры
        fillColors: ['var(--color-yellow)'], // Цвет маркера
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
