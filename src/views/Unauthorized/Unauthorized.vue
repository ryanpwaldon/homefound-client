<template>
  <div class="unauthorized">
    <LayoutCenter>
      <BaseCard>
        <BaseText5 text="Unauthorized"/>
      </BaseCard>
    </LayoutCenter>
  </div>
</template>

<script>
import LayoutCenter from '@/layouts/LayoutCenter/LayoutCenter'
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseText5 from '@/components/BaseText5/BaseText5'
export default {
  name: 'unauthorized',
  components: {
    LayoutCenter,
    BaseCard,
    BaseText5
  }
}
</script>

<style lang="scss" scoped>
.unauthorized {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
