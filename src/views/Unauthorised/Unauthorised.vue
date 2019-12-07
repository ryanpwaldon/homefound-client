<template>
  <div class="unauthorised">
    <LayoutCenter>
      <BaseCard>
        <BaseText5 text="Unauthorised"/>
      </BaseCard>
    </LayoutCenter>
  </div>
</template>

<script>
import LayoutCenter from '@/layouts/LayoutCenter/LayoutCenter'
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseText5 from '@/components/BaseText5/BaseText5'
export default {
  name: 'unauthorised',
  components: {
    LayoutCenter,
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
