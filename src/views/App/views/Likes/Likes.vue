<template>
  <LayoutCenter>
    <div class="likes">
      <BaseText1 text="Likes"/>
    </div>
  </LayoutCenter>
</template>

<script>
import LayoutCenter from '@/layouts/LayoutCenter/LayoutCenter'
import BaseText1 from '@/components/BaseText1/BaseText1'
export default {
  name: 'likes',
  components: {
    LayoutCenter,
    BaseText1
  }
}
</script>

<style lang="scss" scoped>
</style>
