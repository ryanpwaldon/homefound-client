<template>
  <BaseModal @close="$emit('close')">
    <BaseText1 class="title" text="Update your payment method"/>
    <BaseDivider/>
    <BaseText4 class="label" text="Card details"/>
    <div class="card" ref="card"/>
    <BaseDivider/>
    <div class="buttons">
      <BaseButton text="Cancel" @click.native="$emit('close')"/>
      <BaseButton text="Save" design="black" @click.native="submit"/>
    </div>
  </BaseModal>
</template>

<script>
import BaseButton from '@/components/BaseButton/BaseButton'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseModal from '@/components/BaseModal/BaseModal'
export default {
  components: {
    BaseDivider,
    BaseButton,
    BaseText1,
    BaseText4,
    BaseModal
  },
  mounted () {
    const elements = window.Stripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY).elements()
    const style = {
      base: {
        fontSmoothing: 'antialiased',
        fontSize: getComputedStyle(document.body).getPropertyValue('1.4rem'),
        color: getComputedStyle(document.body).getPropertyValue('--color-black-2'),
        fontFamily: getComputedStyle(document.body).getPropertyValue('--font-1'),
        '::placeholder': { color: getComputedStyle(document.body).getPropertyValue('--color-gray-4') }
      },
      invalid: {
        color: getComputedStyle(document.body).getPropertyValue('--color-red-1'),
        iconColor: getComputedStyle(document.body).getPropertyValue('--color-red-1')
      }
    }
    elements.create('card', { style }).mount(this.$refs['card'])
  },
  data: () => ({
    loading: false,
    form: {
      numnber: '',
      expiry: '',
      csv: ''
    }
  }),
  methods: {
    async submit () {
      if (this.loading || !(await this.$refs['observer'].validate())) return
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        this.$notify({ text: 'Successfully updated payment method', type: 'success' })
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  margin-bottom: var(--spacing-2);
}
.card {
  padding: var(--spacing-2);
  border-radius: var(--border-radius-1);
  border: solid 1px var(--color-gray-3);
}
.buttons {
  display: flex;
  justify-content: flex-end;
  > *:not(:last-child) {
    margin-right: var(--spacing-2);
  }
}
</style>
