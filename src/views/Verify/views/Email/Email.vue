<template>
  <BaseLayoutHome @keypress.native.enter="submit">
    <div class="email">
      <div class="container">
        <div class="title">Verify your email</div>
        <div class="description">
          We sent a code to <span class="emphasis">{{ $store.state.user.user.email }}</span>. Please verify your email by entering the code below. Be sure to check your junk folder. <span class="underline pointer" @click="logout">Click here to login with a different email.</span>
        </div>
        <BaseCard>
          <ValidationObserver class="form" ref="form" tag="div" v-slot="{ valid }">
            <div class="label">Code</div>
            <ValidationProvider class="provider" name="verification code" rules="required" v-slot="{ errors }">
              <BaseFormInput v-model="form.code" type="text"/>
              <BaseFormError :message="errors[0]"/>
            </ValidationProvider>
            <div class="resend" @click="resend">Resend email</div>
            <BaseDivider class="divider"/>
            <BaseFormSubmitButton
              text="Next"
              :loading="loading"
              @click.native="submit"
              :design="valid ? 'black' : 'disabled'"
            />
          </ValidationObserver>
        </BaseCard>
      </div>
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
  name: 'verify-email',
  components: {
    BaseLayoutHome,
    BaseFormInput,
    BaseCard,
    BaseDivider,
    BaseFormSubmitButton,
    BaseFormError,
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      form: {
        code: ''
      },
      loading: false
    }
  },
  methods: {
    async resend () {
      try {
        await UserService.sendVerificationInstructions()
        this.$notify({ text: 'Email sent', type: 'success' })
      } catch (error) {
        console.log(error)
        this.$notify({ type: 'error' })
      }
    },
    async submit () {
      if (this.loading || !(await this.$refs['form'].validate())) return
      this.loading = true
      try {
        const { user, accessToken } = await UserService.verify(this.form.code)
        this.$store.dispatch('user/loginSuccess', { user, accessToken })
        this.$router.push('/app')
      } catch (error) {
        console.log(error)
        this.$notify({ text: 'Incorrect code', type: 'error' })
      }
      this.loading = false
    },
    logout () {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.email {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  padding: var(--spacing-10) 0;
  @include media(sm-only) {
    padding: var(--spacing-8) 0;
  }
}
.container {
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  grid-gap: var(--spacing-5);
  max-width: 40rem;
  @include media(sm-only) {
    max-width: none;
  }
}
.title {
  font-size: 2rem;
  font-weight: var(--font-weight-medium);
}
.description {
  color: var(--color-gray-4);
  line-height: 1.5;
}
.form {
  width: 100%;
  position: relative;
}
.divider {
  position: relative;
  width: calc(100% + var(--spacing-5) * 2);
  left: calc(-1 * var(--spacing-5));
}
.label {
  font-size: 1.4rem;
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-2);
}
.provider {
  display: block;
  position: relative;
  margin-bottom: var(--spacing-1);
}
.resend {
  font-size: 1.2rem;
  color: var(--color-gray-4);
  display: inline-block;
  cursor: pointer;
  text-decoration: underline;
}
.emphasis {
  color: var(--color-black-2);
}
.underline {
  text-decoration: underline;
}
.pointer {
  cursor: pointer;
}
</style>
