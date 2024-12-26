<script setup lang="ts">
  // Интерфейс для определения структуры колонок таблицы
  interface Column {
    label: string; // Текст заголовка колонки (например, "Name", "Price")
    key: string; // Уникальный ключ для идентификации данных в колонке
    slotName?: string; // (Опционально) Имя слота для рендеринга пользовательского содержимого
    sortable?: boolean; // Указывает, можно ли сортировать данные в данной колонке
  }

  // Интерфейс свойств компонента таблицы с поддержкой универсального типа T
  interface TableProps<T = Record<string, unknown>> {
    data: T[]; // Данные, которые будут отображаться в таблице, массив объектов типа T
    columns: Column[]; // Массив колонок с настройками отображения и сортировки
    sortKey?: string | null; // (Опционально) Ключ активной сортировки; null означает, что сортировка отключена
    sortOrder?: 'asc' | 'desc'; // (Опционально) Текущий порядок сортировки: по возрастанию или по убыванию
    onSort?: (key: string) => void; // (Опционально) Функция, вызываемая при изменении ключа сортировки
    onRowClick?: (row: T) => void; // (Опционально) Функция, вызываемая при клике на строку таблицы
  }

  // Указываем дженерик T с типом по умолчанию
  const props = defineProps<TableProps<Record<string, unknown>>>();

  const onRowClick = (row: Record<string, unknown>) => {
    if (props.onRowClick) {
      props.onRowClick(row);
    }
  };
</script>

<template>
  <div class="the-table">
    <!-- Заголовки таблицы -->
    <div class="the-table__header">
      <div
        v-for="column in props.columns"
        :key="column.key"
        class="the-table__column the-table__header-column"
        :class="{ 'sortable': column.sortable }"
        @click="column.sortable && props.onSort?.(column.key)"
      >
        <span>{{ column.label }}</span>
        <!-- Добавляем стрелочки для сортируемых колонок -->
        <span v-if="column.sortable" class="sort-indicator">
          <!-- Показываем стрелку для текущего ключа сортировки -->
          <span v-if="props.sortKey === column.key">
            <span v-if="props.sortOrder === 'asc'">▲</span>
            <span v-else>▼</span>
          </span>
          <!-- Показать стрелку "по умолчанию", если сортировка неактивна -->
          <span v-else>⇅</span>
        </span>
      </div>
    </div>

    <!-- Данные таблицы -->
    <div class="the-table__body">
      <div
        v-for="(row, rowIndex) in props.data"
        :key="rowIndex"
        class="the-table__item"
        @click="onRowClick(row)"
      >
        <div
          v-for="column in props.columns"
          :key="column.key"
          class="the-table__column"
        >
          <template v-if="column.slotName">
            <slot
              :name="column.slotName"
              :row="row"
              :value="row[column.key]"
            />
          </template>
          <template v-else>
            {{ row[column.key] }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .sort-indicator {
    display: inline-flex;
    margin-left: 5px;
    font-size: 12px;
    color: var(--color-yellow);
    cursor: pointer;
  }

  .the-table {
    display: grid;
    gap: 10px;
    width: 100%;
  }
  .the-table__header {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    width: 100%;
    font-weight: bold;
  }
  .the-table__item {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  }
  .the-table__item:hover {
    background-color: var(--color-underlay);
    cursor: pointer;
    border-radius: 10px;
  }
  .the-table__column {
    padding: 10px;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .the-table__column:first-child {
    text-align: start;
  }

  @media (max-width: 768px) {
    .the-table__header,
    .the-table__item {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
    .the-table__column {
      padding: 8px;
      font-size: 14px;
    }
  }
  @media (max-width: 499px) {
    .the-table__column {
      padding: 8px;
      font-size: 13px;
    }
  }
  @media (max-width: 360px) {
    .the-table__header,
    .the-table__item {
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    }
    .the-table__column {
      font-size: 13px;
    }
  }
</style>
