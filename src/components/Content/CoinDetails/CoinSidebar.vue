<script setup lang="ts">
  import { ref } from 'vue';
  import type { CoinDetail } from '@/interface/coinSearch.interface';
  import AppImageCoin from '@/components/Base/AppImageCoin.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppPriceCalculator from '@/components/Base/AppPriceCalculator.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';

  interface trendingCoins {
    coin: CoinDetail | null;
  }
  defineProps<trendingCoins>();
  const isCalculatorVisible = ref(false);

  const toggleCalculator = () => {
    isCalculatorVisible.value = !isCalculatorVisible.value;
  };
</script>

<template>
  <div v-if="coin" class="coin-sidebar">
    <div class="coin-sidebar__row">
      <app-button @click="toggleCalculator" class="coin-sidebar__button-calc">
        <div class="coin-sidebar__name">Calc</div>
        <transition name="slide-fade">
          <app-icon
            v-if="!isCalculatorVisible"
            name="calculator"
            size="18px"
            style="color: var(--color-white)"
          />
          <app-icon
            v-else
            name="cross"
            size="18px"
            style="color: var(--color-white)"
          />
        </transition>
      </app-button>
    </div>
    <app-underlay>
      <app-container size="md">
        <div class="coin-sidebar__content">
          <transition name="slide-fade">
            <app-price-calculator 
              v-if="isCalculatorVisible" 
              :coin-name="coin.Name"
              class="coin-sidebar__calculator"
            />
          </transition>
          <app-image-coin :imageUrl="coin.ImageUrl" class="coin-sidebar__img" />
          <app-subtitle>{{ coin.Name }}</app-subtitle>
          <app-button gradient class="coin-sidebar__button-portfolio">Add to Portfolio</app-button>
        </div>
      </app-container>
    </app-underlay>
  </div>
</template>

<style scoped>
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
  }
  .coin-sidebar {
    text-align: center;
    position: relative;
  }
  .coin-sidebar__img {
    width: 200px;
    height: 200px;
  }
  .coin-sidebar__button-portfolio {
    margin-top: 20px;
  }
  .coin-sidebar__row {
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 5px;
    border-radius: 10px;
    background-color: #25283E;
    border: 1px solid #3a3d52;
  }
  .coin-sidebar__name {
    font-size: 16px;
    font-weight: 400;
  }
  .coin-sidebar__button-calc {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 61px;
  }
  .coin-sidebar__calculator {
    position: absolute;
    top: 30px;
    left: 0;
    min-width: 200px;
    width: 100%;
    background-color: var(--color-underlay);
  }
  @media (max-width: 768px) {
    .coin-sidebar__img {
      width: 150px;
      height: 150px;
    }
  }
  @media (max-width: 499px) {
    .coin-sidebar__img {
      width: 200px;
      height: 200px;
    }
  }
</style>
