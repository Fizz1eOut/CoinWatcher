// Функция для форматирования цены
export const formatPrice = (value: number | null): string => {
  if (value === null) {
    return 'N/A';
  }
  if (value >= 0.01) {
    return value.toFixed(4);
  } else if (value > 0) {
    return value.toFixed(8);
  }
  return '0.00';
};

// Функция для сокращения чисел
export const formatCompactNumber = (value: number): string => {
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(2) + 'B'; // Миллиарды
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(2) + 'M'; // Миллионы
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(2) + 'K'; // Тысячи
  }
  return value.toFixed(2); // Обычное число
};

// Функция для форматирования объема
export const formatVolume = (value: number | null): string => {
  if (value === null) {
    return 'N/A';
  }
  return formatCompactNumber(value); // Используем сокращенное форматирование
};
