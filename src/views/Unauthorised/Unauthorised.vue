<template>
  <div class="unauthorised">
    <BaseLayoutCenter>
      <BaseCard>
        <BaseText5 text="Unauthorised"/>
      </BaseCard>
    </BaseLayoutCenter>
  </div>
</template>

<script>
import BaseLayoutCenter from '@/components/BaseLayoutCenter/BaseLayoutCenter'
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseText5 from '@/components/BaseText5/BaseText5'
export default {
  name: 'unauthorised',
  components: {
    BaseLayoutCenter,
    BaseCard,
    BaseText5
  }
}
</script>

<style lang="scss" scoped>
.unauthorised {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
