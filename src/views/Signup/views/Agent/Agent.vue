<template>
  <div class="container">
    <Nav/>
    <BaseCard>
      <ValidationObserver class="observer" ref="observer" tag="div" v-slot="{ valid }">
        <div class="label">Name</div>
        <ValidationProvider class="input" name="name" rules="required|alpha_spaces" v-slot="{ errors }">
          <BaseFormInput
            v-model="form.name"
            autocomplete="name"
          />
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <div class="label">Email</div>
        <ValidationProvider class="input" name="email" rules="required|email" v-slot="{ errors }">
          <BaseFormInput
            v-model="form.email"
            autocomplete="email"
          />
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <div class="label">Password</div>
        <ValidationProvider class="input" name="password" rules="required|min:8" v-slot="{ errors }">
          <BaseFormInput
            v-model="form.password"
            autocomplete="new-password"
            type="password"
          />
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <div class="label">Phone</div>
        <ValidationProvider class="input" name="phone" rules="required|numeric" v-slot="{ errors }">
          <BaseFormInput
            v-model="form.phone"
            autocomplete="phone"
          />
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <div class="label">Agent licence number</div>
        <ValidationProvider class="input" name="agent licence number" rules="required|numeric" v-slot="{ errors }">
          <BaseFormInput
            v-model="form.agentLicenceNumber"
          />
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <div class="label">Where is your agency located?</div>
        <ValidationProvider class="input" name="location" rules="required|location" v-slot="{ errors }">
          <BaseFormAddressAutocomplete
            placeholder="Type a suburb..."
            :value="location"
            @input="Object.assign(form, { sellerSuburb: $event.suburb, sellerState: $event.state, sellerPostcode: $event.postcode })"
          />
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <BaseDivider class="divider"/>
        <BaseFormSubmitButton
          class="submit"
          text="Create account"
          :loading="loading"
          @click.native="submit"
          :design="valid ? 'black' : 'disabled'"
        />
      </ValidationObserver>
    </BaseCard>
    <div class="disclaimer">
      By creating an account, you acknowledge that you have read and understood, and agree to Homefound's <router-link to="/terms">Terms & Conditions</router-link> and <router-link to="/privacy">Privacy Policy</router-link>.
    </div>
  </div>
</template>

<script>
import Nav from '../../components/Nav/Nav'
import BaseCard from '@/components/BaseCard/BaseCard'
import UserService from '@/services/Api/services/UserService/UserService'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseFormAddressAutocomplete from '@/components/BaseFormAddressAutocomplete/BaseFormAddressAutocomplete'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full'
export default {
  name: 'signup',
  components: {
    Nav,
    BaseCard,
    BaseFormInput,
    BaseDivider,
    BaseFormSubmitButton,
    BaseFormAddressAutocomplete,
    BaseFormError,
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        sellerSuburb: '',
        sellerState: '',
        sellerPostcode: '',
        agentLicenceNumber: '',
        password: ''
      },
      loading: false
    }
  },
  computed: {
    location () {
      return {
        suburb: this.form.sellerSuburb,
        state: this.form.sellerState,
        postcode: this.form.sellerPostcode
      }
    }
  },
  methods: {
    async submit () {
      if (this.loading || !(await this.$refs['observer'].validate())) return
      this.loading = true
      try {
        const { user, accessToken } = await UserService.createSeller(this.form)
        this.$notify({ type: 'success' })
        this.$store.dispatch('user/loginSuccess', { user, accessToken })
        this.$router.push('/verify/email')
      } catch (error) {
        console.log(error)
        this.$notify({ type: 'error' })
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 40rem;
  display: grid;
  grid-auto-flow: row;
  grid-gap: var(--spacing-5);
  @include media(sm-only) {
    max-width: none;
  }
}
.title {
  font-size: 1.6rem;
  color: var(--color-black-2);
}
.label {
  font-size: 1.4rem;
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-2);
}
.input {
  position: relative;
  margin-bottom: var(--spacing-5);
  display: block;
}
.divider {
  position: relative;
  width: calc(100% + var(--spacing-5) * 2);
  left: calc(-1 * var(--spacing-5));
}
.disclaimer {
  line-height: 1.5;
  font-size: 1.2rem;
  color: var(--color-gray-6);
  text-align: center;
  max-width: 50rem;
  margin: auto;
  a {
    text-decoration: underline;
  }
}
</style>
