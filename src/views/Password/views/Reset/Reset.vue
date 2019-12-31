<template>
  <LayoutFocus @keypress.native.enter="submit">
    <ValidationObserver class="observer" ref="observer" tag="div" v-slot="{ invalid }">
      <BaseText1 class="title" text="Reset password"/>
      <BaseDivider/>
      <BaseText2 class="description">
        Please enter your new password.
      </BaseText2>
      <BaseText4 class="label" text="New password"/>
      <ValidationProvider class="provider" name="password" rules="required" v-slot="{ errors }">
        <BaseFormInput
          v-model="form.password"
          placeholder="At least 8 characters"
          autocomplete="new-password"
          type="password"
        />
        <BaseFormError :message="errors[0]"/>
      </ValidationProvider>
      <BaseText4 class="label" text="Re-enter password"/>
      <ValidationProvider class="provider" name="re-enter password" rules="required|match:password" v-slot="{ errors }">
        <BaseFormInput
          v-model="form.reEnterPassword"
          placeholder="Just one more time"
          autocomplete="new-password"
          type="password"
        />
        <BaseFormError :message="errors[0]"/>
      </ValidationProvider>
      <BaseDivider/>
      <BaseFormSubmitButton
        text="Reset password"
        :loading="loading"
        @click.native="submit"
      />
    </ValidationObserver>
  </LayoutFocus>
</template>

<script>
import LayoutFocus from '@/layouts/LayoutFocus/LayoutFocus'
import UserService from '@/services/Api/services/UserService/UserService'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full'
export default {
  name: 'reset',
  components: {
    LayoutFocus,
    BaseFormInput,
    BaseDivider,
    BaseText1,
    BaseText2,
    BaseText4,
    BaseFormSubmitButton,
    BaseFormError,
    ValidationObserver,
    ValidationProvider
  },
  props: {
    token: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      form: {
        password: '',
        reEnterPassword: ''
      },
      loading: false
    }
  },
  methods: {
    async submit () {
      if (this.loading || !(await this.$refs['observer'].validate())) return
      this.loading = true
      try {
        await UserService.passwordReset(this.token, this.form.password)
        this.$notify({ text: 'Successfully reset password', type: 'success' })
        this.$router.push('/login')
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.observer {
  width: 100%;
  position: relative;
}
.description {
  margin-bottom: var(--spacing-5);
  color: var(--color-gray-4);
  line-height: 1.5;
}
.label {
  margin-bottom: var(--spacing-2);
}
.provider {
  display: block;
  position: relative;
  margin-bottom: var(--spacing-5);
}
</style>
