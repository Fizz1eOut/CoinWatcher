<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import AppDropdown from '@/components/Base/AppDropdown.vue';
  import AppDropdownItem from '@/components/Base/AppDropdownItem.vue';
  import { getExchanges } from '@/api/coins/exchanges';
  import type { ExchangeData } from '@/interface/exchanges.interface';
  import type { CoinDetail } from '@/interface/coinDetail.interface';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppImageCoin from '@/components/Base/AppImageCoin.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';

  interface CoinDetailProps {
    coin: CoinDetail;
  }
  const props = defineProps<CoinDetailProps>();

  const activeBuy = ref(false);
  const activeTrade = ref(false);
  const buyExchanges = ref<ExchangeData[]>([]);
  const tradeExchanges = ref<ExchangeData[]>([]);
  const isLoading = ref(false);

  const toggleBuy = () => {
    activeBuy.value = !activeBuy.value;
    activeTrade.value = false;
  };
  const toggleTrade = () => {
    activeTrade.value = !activeTrade.value;
    activeBuy.value = false;
  };

  const loadExchanges = async () => {
    isLoading.value = true;
    try {
      const exchanges = await getExchanges(props.coin.Name);
      const sortedExchanges = exchanges.sort((a, b) => b.GradePoints - a.GradePoints);

      buyExchanges.value = sortedExchanges
        .filter((exchange) => !exchange.Trades)
        .slice(0, 10);

      tradeExchanges.value = sortedExchanges
        .filter((exchange) => exchange.Trades)
        .slice(0, 10);
    } catch (error) {
      console.error('Error loading exchanges:', error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(loadExchanges);

  const navigateToExchange = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('No URL provided for this exchange.');
    }
  };

  watch(
    () => props.coin,
    async (newCoin, oldCoin) => {
      if (newCoin.Name !== oldCoin.Name) {
        await loadExchanges();
      }
    }
  );
</script>

<template>
  <div class="coin-exchanges">
    <div class="coin-exchanges__buy">
      <app-button 
        outline
        @click="toggleBuy" 
        class="coin-exchanges__button"
      >
        Buy
        <app-icon
          name="arrow"
          size="17px"
          style="color: var(--color-white)"
          class="icon"
          :class="{ 'active': activeBuy }"
        />
      </app-button>
      <app-dropdown :active="activeBuy" class="coin-exchanges__dropdown">
        <app-dropdown-item 
          v-for="exchange in buyExchanges" 
          :key="exchange.Id"
          @click="navigateToExchange(exchange.AffiliateURL)"
        >
          <div class="coin-exchanges__row">
            <app-image-coin :imageUrl="exchange.LogoUrl" class="coin-exchanges__img" />
            <div>{{ exchange.Name }}</div>
          </div>
        </app-dropdown-item>
      </app-dropdown>
    </div>

    <div class="coin-exchanges__trade">
      <app-button 
        outline 
        @click="toggleTrade" 
        class="coin-exchanges__button"
      >
        Trade
        <app-icon
          name="arrow"
          size="17px"
          style="color: var(--color-white)"
          class="icon"
          :class="{ 'active': activeTrade }"
        />
      </app-button>
      <app-dropdown :active="activeTrade" class="coin-exchanges__dropdown">
        <app-dropdown-item 
          v-for="exchange in tradeExchanges" 
          :key="exchange.Id"
          @click="navigateToExchange(exchange.AffiliateURL)"
        >
          <div class="coin-exchanges__row">
            <app-image-coin :imageUrl="exchange.LogoUrl" class="coin-exchanges__img" />
            <div>{{ exchange.Name }}</div>
          </div>
        </app-dropdown-item>
      </app-dropdown>
    </div>
  </div>
</template>

<style scoped>
  .coin-exchanges {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  .coin-exchanges__buy,
  .coin-exchanges__trade {
    position: relative;
    min-width: 100px;
  }
  .icon {
    transition: transform 0.3s ease-in-out, fill 0.3s ease-in-out;
  }
  .active {
    transform: rotate(0deg);
  }
  .coin-exchanges__dropdown {
    height: 200px;
    overflow: auto;
    width: 130px;
  }
  .coin-exchanges__row {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .coin-exchanges__img {
    width: 20px;
    height: 20px;
  }
</style>
