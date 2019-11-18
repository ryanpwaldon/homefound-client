<template>
  <div class="listings">
    <BaseText1 text="Listings"/>
    <BaseDivider/>
    <div class="items">
      <router-link class="button" to="/sellers/listings/listing">
        <img src="@/assets/img/plus.svg">
        <BaseText2 text="New listing"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
export default {
  components: {
    BaseText1,
    BaseText2,
    BaseDivider
  }
}
</script>

<style lang="scss" scoped>
.items {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: var(--spacing-5);
}
.button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 200px;
  background: var(--color-white-1);
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
  img {
    margin-bottom: var(--spacing-2);
    width: 10px;
  }
}
</style>
