<script setup lang="ts">
  import { defineProps, ref, watch, computed, onMounted, onUnmounted } from 'vue';
  import ApexCharts from 'apexcharts';
  import type { MarketCapEntry } from '@/interface/marketCaps.interface';

  // Пропсы
  const props = defineProps({
    historicalData: {
      type: Array as () => MarketCapEntry[],
      required: true,
    },
    selectedTimeRange: {
      type: String as () => '1d' | '7d' | '1m',
      required: true,
    },
    showMarkers: {
      type: Boolean,
      default: false, // По умолчанию маркеры отключены
    },
  });

  // Функция для форматирования чисел (миллиарды, миллионы, тысячи)
  const formatCompactNumber = (value: number): string => {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(0) + 'B'; // Миллиарды, без десятичных
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(0) + 'M'; // Миллионы, без десятичных
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(0) + 'K'; // Тысячи, без десятичных
    }
    return value.toFixed(0); // Обычное число, без десятичных
  };

  // Генерация цветов
  const generateColors = (count: number) => {
    const colors = ['#EDB60B']; // Первый цвет всегда желтый
    for (let i = 1; i < count; i++) {
      colors.push(`#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`);
    }
    return colors;
  };


  // Фильтрация данных
  const filteredData = computed(() => {
    const timeRangeMap = {
      '1d': 1 * 24 * 60 * 60,
      '7d': 7 * 24 * 60 * 60,
      '1m': 30 * 24 * 60 * 60,
    };

    const currentTime = Math.floor(Date.now() / 1000);
    const rangeStartTime = currentTime - timeRangeMap[props.selectedTimeRange];

    return props.historicalData.map((entry) => {
      const filteredHistory = entry.history.filter((point) => point.time >= rangeStartTime);
      const fallbackHistory = filteredHistory.length > 0 ? filteredHistory : entry.history.slice(-10);

      return {
        ...entry,
        history: fallbackHistory,
      };
    });
  });

  // Настройки графика
  const generateChartOptions = (data: MarketCapEntry[]) => {
    const colors = generateColors(data.length);

    const series = data.map((entry) => ({
      name: entry.symbol,
      data: entry.history.map((point) => ({
        x: new Date(point.time * 1000),
        y: point.market_cap ?? point.close,
      })),
    }));

    return {
      chart: {
        type: 'line',
        height: 300,
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      series,
      colors,
      markers: {
        size: props.showMarkers ? 6 : 0,
        colors,
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: props.showMarkers ? 8 : 0,
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          // Условие для изменения формата
          format: props.selectedTimeRange === '1d' ? 'HH:mm' : 'dd MMM', // Показывать только часы и минуты для 1 дня
          style: {
            colors: 'var(--color-gray)',
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
          let tooltipHtml = '<div class="apexcharts-tooltip-custom">';
          tooltipHtml += `<div><strong>${new Date(
            w.globals.seriesX[seriesIndex][dataPointIndex]
          ).toLocaleDateString()}</strong></div>`;
          points.forEach((point) => {
            const seriesColor =
              w.config.colors[series.findIndex((s) => s[dataPointIndex] === point.value)] || '#fff';
            tooltipHtml += `<div>
            <span style="color: ${seriesColor};">●</span>
            ${point.name}: ${point.value.toFixed(2)}$
          </div>`;
          });
          tooltipHtml += '</div>';
          return tooltipHtml;
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
      },
    };
  };


  // Ссылка на график
  const chartInstance = ref<ApexCharts | null>(null);

  // Рендеринг графика
  const renderChart = (data: MarketCapEntry[]) => {
    const chartElement = document.querySelector('#market-overview-chart');
    if (chartElement && data.length) {
      const options = generateChartOptions(data);
      chartInstance.value = new ApexCharts(chartElement, options);
      chartInstance.value.render();
    }
  };

  // Слежение за данными
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

  // Монтаж и размонтаж графика
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
