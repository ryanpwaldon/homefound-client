<template>
  <BaseModal @close="$emit('close')">
    <BaseText1 class="title" text="Update your email"/>
    <ValidationObserver class="observer" ref="observer" tag="div" v-slot="{ invalid }">
      <ValidationProvider class="provider" name="email" rules="required|email" v-slot="{ errors }">
        <BaseFormInput
          placeholder="New email"
          v-model="form.email"
        />
        <BaseFormError :message="errors[0]"/>
      </ValidationProvider>
    </ValidationObserver>
    <div class="buttons">
      <BaseButton text="Cancel" @click.native="$emit('close')"/>
      <BaseButton text="Save" design="black" @click.native="submit"/>
    </div>
  </BaseModal>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full'
import BaseButton from '@/components/BaseButton/BaseButton'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseModal from '@/components/BaseModal/BaseModal'
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    BaseFormInput,
    BaseFormError,
    BaseButton,
    BaseText1,
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
      if (this.loading || !(await this.$refs['v-observer'].validate())) return
      this.loading = true
      try {
        await new Promise(resolve => () => setTimeout(resolve, 2000))
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
.title {
  margin-bottom: var(--spacing-5);
}
.observer {
  margin-bottom: var(--spacing-5);
}
.buttons {
  display: flex;
  justify-content: flex-end;
  > *:not(:last-child) {
    margin-right: var(--spacing-2);
  }
}
</style>
