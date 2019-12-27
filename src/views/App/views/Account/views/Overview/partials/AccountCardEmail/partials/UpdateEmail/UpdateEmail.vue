<template>
  <BaseModal @close="$emit('close')">
    <BaseText1 class="title" text="Update your email"/>
    <BaseDivider/>
    <ValidationObserver class="observer" ref="observer" tag="div" v-slot="{ invalid }">
      <BaseText4 class="label" text="New email"/>
      <ValidationProvider class="provider" name="email" rules="required|email" v-slot="{ errors }">
        <BaseFormInput
          placeholder="tom@hanks.com"
          v-model="form.email"
        />
        <BaseFormError :message="errors[0]"/>
      </ValidationProvider>
    </ValidationObserver>
    <BaseDivider/>
    <div class="buttons">
      <BaseButton text="Cancel" @click.native="$emit('close')"/>
      <BaseButton text="Save" design="black" @click.native="submit" :loading="loading"/>
    </div>
  </BaseModal>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full'
import BaseButton from '@/components/BaseButton/BaseButton'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseModal from '@/components/BaseModal/BaseModal'
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    BaseFormInput,
    BaseFormError,
    BaseDivider,
    BaseButton,
    BaseText1,
    BaseText4,
    BaseModal
  },
  data: () => ({
    loading: false,
    form: {
      email: ''
    }
  }),
  methods: {
    async submit () {
      if (this.loading || !(await this.$refs['observer'].validate())) return
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        this.$emit('close')
        this.$notify({ text: 'Successfully updated email', type: 'success' })
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
.observer {
  margin-bottom: var(--spacing-5);
}
.provider {
  position: relative;
  display: block;
}
.buttons {
  display: flex;
  justify-content: flex-end;
  > *:not(:last-child) {
    margin-right: var(--spacing-2);
  }
}
</style>
