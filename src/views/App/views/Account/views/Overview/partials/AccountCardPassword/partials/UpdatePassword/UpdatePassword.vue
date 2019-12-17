<template>
  <BaseModal @close="$emit('close')">
    <BaseText1 class="title" text="Update your password"/>
    <ValidationObserver class="observer" ref="observer" tag="div" v-slot="{ invalid }">
      <BaseText4 class="label" text="New password"/>
      <ValidationProvider class="provider" name="new password" rules="required" v-slot="{ errors }">
        <BaseFormInput
          v-model="form.password"
          placeholder="At least 8 characters"
          autocomplete="new-password"
          type="password"
        />
        <BaseFormError :message="errors[0]"/>
      </ValidationProvider>
      <BaseText4 class="label" text="Re-enter password"/>
      <ValidationProvider class="provider" name="re-enter password" rules="required|match:new password" v-slot="{ errors }">
        <BaseFormInput
          v-model="form.reEnterPassword"
          placeholder="Just one more time"
          autocomplete="new-password"
          type="password"
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
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseModal from '@/components/BaseModal/BaseModal'
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    BaseFormInput,
    BaseFormError,
    BaseButton,
    BaseText1,
    BaseText4,
    BaseModal
  },
  data: () => ({
    loading: false,
    form: {
      password: '',
      reEnterPassword: ''
    }
  }),
  methods: {
    async submit () {
      if (this.loading || !(await this.$refs['observer'].validate())) return
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        this.$notify({ text: 'Successfully updated password', type: 'success' })
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
.provider:not(:last-child) {
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
