<script setup lang="ts">
  // Интерфейсы для данных таблицы
  interface Column {
    label: string; // Заголовок колонки
    key: string; // Ключ для доступа к данным (например, "name", "price")
    slotName?: string; // Опционально: имя слота для кастомного рендера
  }

  // Таблица принимает данные универсального типа T
  interface TableProps<T = Record<string, unknown>> {
    data: T[];
    columns: Column[];
  }

  // Указываем дженерик T с типом по умолчанию
  defineProps<TableProps<Record<string, unknown>>>();
</script>

<template>
  <div class="the-table">
    <!-- Заголовки таблицы -->
    <div class="the-table__header">
      <div
        v-for="column in columns"
        :key="column.key"
        class="the-table__column"
      >
        {{ column.label }}
      </div>
    </div>
    
    <!-- Данные таблицы -->
    <div class="the-table__body">
      <div
        v-for="(row, rowIndex) in data"
        :key="rowIndex"
        class="the-table__item"
      >
        <div
          v-for="column in columns"
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
  .the-table {
    display: grid;
    gap: 10px;
    width: 100%;
  }
  .the-table__header {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    width: 100%;
    gap: 10px;
    font-weight: bold;
  }
  .the-table__item {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  .the-table__item:hover {
    background-color: var(--color-underlay);
    cursor: pointer;
    border-radius: 10px;
  }
  .the-table__column {
    padding: 12px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .the-table__column:first-child {
    text-align: start;
  }
</style>


