<template>
  <LayoutFocus @keypress.native.enter="submit" v-if="authCheckIsComplete">
    <BaseNavItemText class="logout" text="Logout" @click.native="logout"/>
    <ValidationObserver class="observer" ref="observer" tag="div" v-slot="{ invalid }">
      <BaseText1 class="title" text="Verify your account"/>
      <BaseDivider/>
      <BaseText2 class="description">
        We sent a code to <span style="color: var(--color-black-2)">{{ $store.state.user.user.email }}</span>. Please verify your account by entering the code below. Be sure to check your junk folder.
      </BaseText2>
      <BaseText4 class="label" text="Verification code"/>
      <ValidationProvider class="provider" name="verification code" rules="required" v-slot="{ errors }">
        <BaseFormInput
          v-model="form.code"
          placeholder="Enter the code sent to your email"
          type="text"
        />
        <BaseFormError :message="errors[0]"/>
      </ValidationProvider>
      <BaseText6 class="resend" text="Resend email" @click.native="resend"/>
      <BaseDivider/>
      <BaseFormSubmitButton
        text="Next"
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
import BaseText6 from '@/components/BaseText6/BaseText6'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import BaseNavItemText from '@/components/BaseNavItemText/BaseNavItemText'
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full'
export default {
  name: 'verify',
  components: {
    LayoutFocus,
    BaseFormInput,
    BaseDivider,
    BaseText1,
    BaseText2,
    BaseText4,
    BaseText6,
    BaseFormSubmitButton,
    BaseNavItemText,
    BaseFormError,
    ValidationObserver,
    ValidationProvider
  },
  mounted () {
    if (!this.$store.state.user.user) this.$router.push('/unauthorised')
    if (this.$store.getters['user/authenticated']) this.$router.push('/app')
    this.authCheckIsComplete = true
  },
  data () {
    return {
      form: {
        code: ''
      },
      loading: false,
      authCheckIsComplete: false
    }
  },
  methods: {
    async resend () {
      try {
        await UserService.sendVerificationInstructions()
        this.$notify({ text: 'A new verification email has been sent', type: 'success' })
      } catch (error) {
        console.log(error)
        this.$notify({ text: 'Error sending email', type: 'error' })
      }
    },
    async submit () {
      if (this.loading || !(await this.$refs['observer'].validate())) return
      this.loading = true
      try {
        const user = await UserService.verify(this.form.code)
        this.$store.commit('user/setUser', user)
        this.$router.push('/app/listings')
      } catch (error) {
        console.log(error)
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
.logout {
  position: absolute;
  margin: var(--spacing-5);
  right: 0;
  top: 0;
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
  margin-bottom: var(--spacing-2);
}
.provider {
  display: block;
  position: relative;
  margin-bottom: var(--spacing-1);
}
.resend {
  text-decoration: underline;
  color: var(--color-gray-4);
  display: inline-block;
  cursor: pointer;
}
</style>
