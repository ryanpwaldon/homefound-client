<template>
  <BaseLayoutHome @keypress.native.enter="submit">
    <div class="instructions">
      <BaseCard class="card">
        <ValidationObserver class="observer" ref="observer" tag="div" v-slot="{ valid }">
          <div class="title">Reset password</div>
          <div class="description">Type the email address linked to your account and we’ll send you password reset instructions. Be sure to check your spam folder.</div>
          <BaseDivider class="divider"/>
          <div class="label">Email</div>
          <ValidationProvider class="provider" name="email" rules="required|email" v-slot="{ errors }">
            <BaseFormInput v-model="form.email"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
          <BaseDivider class="divider"/>
          <BaseFormSubmitButton text="Send instructions" :loading="loading" @click.native="submit" :design="valid ? 'black' : 'disabled'"/>
        </ValidationObserver>
      </BaseCard>
    </div>
  </BaseLayoutHome>
</template>

<script>
import BaseLayoutHome from '@/components/BaseLayoutHome/BaseLayoutHome'
import UserService from '@/services/Api/services/UserService/UserService'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full'
export default {
  name: 'instructions',
  components: {
    BaseLayoutHome,
    BaseFormInput,
    BaseDivider,
    BaseCard,
    BaseFormSubmitButton,
    BaseFormError,
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      form: {
        email: ''
      },
      loading: false
    }
  },
  methods: {
    async submit () {
      if (this.loading || !(await this.$refs['observer'].validate())) return
      this.loading = true
      try {
        await UserService.sendPasswordResetInstructions(this.form.email)
        this.$notify({ text: 'Email sent', type: 'success' })
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.instructions {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  padding: var(--spacing-10) 0;
}
.title {
  font-size: 1.6rem;
  margin-bottom: var(--spacing-2);
}
.description {
  font-size: 1.4rem;
}
.card {
  width: 100%;
  max-width: 40rem;
}
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
