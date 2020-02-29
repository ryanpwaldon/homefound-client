<template>
  <BaseLayoutHome @keypress.native.enter="submit">
    <div class="reset">
      <BaseCard class="card">
        <ValidationObserver class="observer" ref="observer" tag="div" v-slot="{ valid }">
          <div class="title">Reset password</div>
          <div class="description">Please enter your new password.</div>
          <BaseDivider class="divider"/>
          <div class="label">New password</div>
          <ValidationProvider class="provider" name="password" rules="required|min:8" v-slot="{ errors }">
            <BaseFormInput v-model="form.password" placeholder="At least 8 characters" autocomplete="new-password" type="password"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
          <div class="label">Re-enter password</div>
          <ValidationProvider class="provider" name="re-enter password" rules="required|match:password" v-slot="{ errors }">
            <BaseFormInput v-model="form.reEnterPassword" placeholder="Just one more time" autocomplete="new-password" type="password"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
          <BaseDivider class="divider"/>
          <BaseFormSubmitButton text="Reset password" :loading="loading" @click.native="submit" :design="valid ? 'black' : 'disabled'"/>
        </ValidationObserver>
      </BaseCard>
    </div>
  </BaseLayoutHome>
</template>

<script>
import BaseLayoutHome from '@/components/BaseLayoutHome/BaseLayoutHome'
import UserService from '@/services/Api/services/UserService/UserService'
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full'
export default {
  name: 'reset',
  components: {
    BaseLayoutHome,
    BaseCard,
    BaseFormInput,
    BaseDivider,
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
        this.$notify({ text: 'Password reset', type: 'success' })
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
.reset {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  padding: var(--spacing-10) 0;
}
.card {
  width: 100%;
  max-width: 40rem;
}
.observer {
  width: 100%;
  position: relative;
}
.title {
  font-size: 1.6rem;
  margin-bottom: var(--spacing-2);
}
.description {
  font-size: 1.4rem;
  color: var(--color-gray-4);
}
.label {
  font-size: 1.4rem;
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-2);
}
.provider {
  display: block;
  position: relative;
  margin-bottom: var(--spacing-5);
}
.divider {
  position: relative;
  width: calc(100% + var(--spacing-5) * 2);
  left: calc(-1 * var(--spacing-5));
}
</style>
