<template>
  <div class="contact">
    <div class="main">
      <div class="title">
        <BaseText4 class="label" text="Contact"/>
        <BaseText5 :text="name"/>
      </div>
      <BaseButton text="Show contact details" v-if="!show" @click.native="onClick"/>
    </div>
    <template v-if="show">
      <BaseDivider class="divider"/>
      <BaseText4 class="label" text="Phone"/>
      <BaseText5 :text="phone"/>
      <div class="spacer"/>
      <BaseText4 class="label" text="Email"/>
      <BaseText5 :text="email"/>
    </template>
  </div>
</template>

<script>
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseText5 from '@/components/BaseText5/BaseText5'
import BaseButton from '@/components/BaseButton/BaseButton'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import ListingPerformanceService from '@/services/Api/services/ListingPerformanceService/ListingPerformanceService'
import { mapState } from 'vuex'
export default {
  components: {
    BaseText4,
    BaseText5,
    BaseButton,
    BaseDivider
  },
  props: {
    listingId: {
      type: String,
      required: true
    },
    createdBy: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  data: () => ({
    show: false
  }),
  computed: mapState('user', {
    userId: state => state.user._id
  }),
  methods: {
    onClick () {
      this.show = true
      if (this.userId !== this.createdBy) {
        ListingPerformanceService.trackContactDetailView(this.listingId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.contact {
  width: 100%;
  background: var(--color-white-1);
  box-shadow: var(--box-shadow-1);
  border-radius: var(--border-radius-1);
  padding: var(--spacing-4);
}
.main {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.divider {
  margin: var(--spacing-4) 0;
}
.spacer {
  margin: var(--spacing-4);
}
.label {
  margin-bottom: var(--spacing-2);
}
</style>
