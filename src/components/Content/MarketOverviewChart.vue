<script setup lang="ts">
import { defineProps, watch, ref, computed, onMounted, onUnmounted } from 'vue';
import type { MarketCapEntry } from '@/interface/marketCaps.interface';
import ApexCharts from 'apexcharts';

const props = defineProps({
  historicalData: {
    type: Array as () => MarketCapEntry[],
    required: true,
  },
  selectedCoin: {
    type: String as () => string | null,
    default: null, // Символ выбранной криптовалюты
  },
});

const chartInstance = ref<ApexCharts | null>(null);

// Фильтруем данные по выбранной криптовалюте
const filteredData = computed(() => {
  return props.selectedCoin
    ? props.historicalData.filter((entry) => entry.symbol === props.selectedCoin)
    : props.historicalData;
});

const colorPalette = [
  '#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0',
  '#546E7A', '#26A69A', '#D10CE8', '#F9A3A4', '#F48024',
];

// Конфигурация графика
const generateChartOptions = (data: MarketCapEntry[]) => {
  const series = data.map((entry) => {
    const initialValue = entry.history[0]?.market_cap ?? entry.history[0]?.close ?? 1; // Начальное значение (рыночная капитализация или цена)
    return {
      name: entry.symbol,
      data: entry.history.map((point) => ({
        x: new Date(point.time * 1000), // Преобразуем timestamp в дату
        y: initialValue ? ((point.market_cap ?? point.close) / initialValue - 1) * 100 : 0, // Процентное изменение
      })),
    };
  });

  return {
    chart: {
      type: 'line',
      height: 400,
      toolbar: { show: true },
      zoom: { enabled: true },
    },
    title: {
    text: `Display of cryptocurrency price percentage change`,
    align: 'center',
    style: {
      fontSize: '20px',
      fontWeight: 'semibold',
      color: 'var(--color-white)',
      fontFamily: "Orbitron"
    },
  },
    series,
    colors: colorPalette.slice(0, series.length), // Уникальные цвета
    xaxis: {
      type: 'datetime',
      labels: { format: 'dd MMM' },
      title: { text: 'Date' },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => (isNaN(value) ? '0.00%' : `${value.toFixed(2)}%`),
      },
      title: {
        text: 'Change (%)',
      },
    },
    tooltip: {
      theme: 'dark',
      shared: true,
      intersect: false,
      custom: function (opts: {
        series: number[][]; // Массив массивов с числовыми значениями серий
        seriesIndex: number; // Индекс текущей серии
        dataPointIndex: number; // Индекс текущей точки данных
        w: {
          config: {
            series: { name: string }[]; // Массив объектов с именами серий
            colors: string[]; // Цвета серий
          };
          globals: {
            seriesX: number[][]; // Даты в формате timestamp
          };
        };
      }): string {
        const { series, seriesIndex, dataPointIndex, w } = opts;

        // Получаем все значения для текущего dataPointIndex
        const points = series.map((data: number[], index: number) => {
          return {
            name: w.config.series[index].name,
            value: data[dataPointIndex] ?? 0, // Если значения нет, используем 0
          };
        });

        // Сортируем точки по убыванию значений
        points.sort((a, b) => b.value - a.value);

        // Формируем HTML для всплывающей подсказки
        let tooltipHtml = `<div class="apexcharts-tooltip-custom">`;
        tooltipHtml += `<div><strong>${new Date(
          w.globals.seriesX[seriesIndex][dataPointIndex]
        ).toLocaleDateString()}</strong></div>`;
        points.forEach((point) => {
          const seriesColor =
            w.config.colors[series.findIndex((s) => s[dataPointIndex] === point.value)] || '#fff';
          tooltipHtml += `<div>
            <span style="color: ${seriesColor};">●</span>
            ${point.name}: ${point.value.toFixed(2)}%
          </div>`;
        });
        tooltipHtml += `</div>`;
        return tooltipHtml;
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
  };
};

// Метод для рендеринга графика
const renderChart = (data: MarketCapEntry[]) => {
  const chartElement = document.querySelector('#market-overview-chart');
  if (chartElement && data.length) {
    const options = generateChartOptions(data);
    chartInstance.value = new ApexCharts(chartElement, options);
    chartInstance.value.render();
  }
};

// Следим за обновлением данных
watch(
  filteredData,
  (newData) => {
    if (chartInstance.value) {
      chartInstance.value.updateOptions(generateChartOptions(newData));
    } else {
      renderChart(newData);
    }
  },
  { deep: true }
);

onMounted(() => {
  renderChart(filteredData.value);
});

onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy();
    chartInstance.value = null;
  }
});
</script>

<template>
  <div id="market-overview-chart" class="market-overview__chart"></div>
</template>

<style>
.market-overview__chart {
  max-width: 100%;
  margin: 0 auto;
}
.market-overview__chart .apexcharts-tooltip-custom {
  background: rgba(10, 12, 29, 0.8);
  color: #fff;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  font-family: "Source Code Pro", monospace;
}
.apexcharts-tooltip-custom div {
  margin-bottom: 5px;
}
</style>
