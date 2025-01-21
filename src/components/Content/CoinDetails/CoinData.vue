<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import  { getCryptoData } from '@/api/coins/cryptoData';
  import type { CryptoDetails } from '@/api/coins/cryptoData';
  import type { CoinDetail } from '@/interface/coinDetail.interface';
  import { formatVolume } from '@/utils/numberFormatter';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';

  interface CoinDetailProps {
    coin: CoinDetail;
  }
  const props = defineProps<CoinDetailProps>();

  const cryptoData = ref<CryptoDetails[] | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  

  const fetchCoinDetails = async () => {
    isLoading.value = true; // Установить в true перед загрузкой
    error.value = null;
    try {
      const data = await getCryptoData(props.coin.Name);
      cryptoData.value = data.Data;
    } catch (err) {
      error.value = 'Error loading data';
      console.error(err);
    } finally {
      isLoading.value = false; // Гарантированно сбросить состояние после загрузки
    }
  };

  onMounted(async () => {
    await fetchCoinDetails();
  });

  watch(
    () => props.coin,
    async (newCoin, oldCoin) => {
      if (newCoin.Name !== oldCoin.Name) {
        await fetchCoinDetails();
      }
    }
  );
</script>

<template>
  <app-loading-spinner 
    v-if="isLoading" 
    class="loader" 
    size="30px"
    borderWidth="5px"
    height="200px" 
  />
  <div v-else class="coin-data">
    <div v-for="(coin, index) in cryptoData" :key="index" class="coin-data__content">
      <div class="coin-data__group">
        <div v-if="coin.CoinInfo.AssetLaunchDate" class="coin-data__item">
          <div class="coin-data__text">Launch Date:</div>
          <div>{{ coin.CoinInfo.AssetLaunchDate }}</div>
        </div>
        <div v-if="coin.CoinInfo.Algorithm !== 'N/A'" class="coin-data__item">
          <div class="coin-data__text">Algorithm:</div>
          <div>{{ coin.CoinInfo.Algorithm }}</div>
        </div>
        <div v-if="coin.CoinInfo.ProofType !== 'N/A'" class="coin-data__item">
          <div class="coin-data__text">Consensus Type:</div>
          <div>{{ coin.CoinInfo.ProofType }}</div>
        </div>
        <div v-if="coin.CoinInfo.Rating?.Weiss?.Rating" class="coin-data__item">
          <div class="coin-data__text">Rating:</div>
          <div>{{ coin.CoinInfo.Rating?.Weiss?.Rating }}</div>
        </div>
      </div>

      <div class="coin-data__group">
        <div v-if="coin.ConversionInfo?.TotalVolume24H" class="coin-data__item">
          <div class="coin-data__text">24h Trading Volume:</div>
          <div>{{ formatVolume(coin.ConversionInfo?.TotalVolume24H ?? null) }} ADA</div>
        </div>
        <div v-if="coin.CoinInfo.MaxSupply" class="coin-data__item">
          <div class="coin-data__text">Max Supply:</div>
          <div>{{ formatVolume(coin.CoinInfo.MaxSupply) }}</div>
        </div>
        <div v-if="coin.ConversionInfo?.Supply" class="coin-data__item">
          <div class="coin-data__text">Total Supply:</div>
          <div>{{ formatVolume(coin.ConversionInfo?.Supply ?? null) }} ADA</div>
        </div>
      </div>
    </div>
  </div>
</template> 

<style scoped>
  .coin-data {
  }
  .coin-data__content {
  }
  .coin-data__group {
    margin-top: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    max-width: 450px;
  }
  .coin-data__item {
    font-size: 18px;
    font-weight: 400;
    color: var(--color-white);
  }
  .coin-data__text  {
    font-size: 14px;
    font-weight: 400;
    color: var(--color-gray);
  }
  @media (max-width: 768px) {
    .coin-data__group {
      gap: 10px;
      flex-wrap: wrap;
    }
    .coin-data__item {
      font-size: 16px;
    }
  }
  @media (max-width: 499px) {
    .coin-data__group {
      justify-content: center;
      gap: 20px;
    }
  }
</style>
