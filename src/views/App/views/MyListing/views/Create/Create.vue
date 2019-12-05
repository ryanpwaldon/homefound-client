<template>
  <div class="create" @keypress.enter="submit">
    <ValidationObserver class="v-observer" ref="v-observer" tag="div" v-slot="{ invalid }">
      <div class="card">
        <BaseText4 class="title" text="Address"/>
        <div class="group">
          <ValidationProvider class="v-provider" name="unit type" rules="requiredIf:unit number" v-slot="{ errors }">
            <BaseFormSelect placeholder="Unit type" v-model="form.unitType" :options="options.unitTypes"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
          <ValidationProvider class="v-provider" name="unit number" rules="requiredIf:unit type" v-slot="{ errors }">
            <BaseFormInput placeholder="Unit number" v-model="form.unitNumber"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
          <div class="break"/>
          <ValidationProvider class="v-provider" name="street number" rules="required" v-slot="{ errors }">
            <BaseFormInput placeholder="Street number" v-model="form.streetNumber"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
          <ValidationProvider class="v-provider" name="street name" rules="required" v-slot="{ errors }">
            <BaseFormInput placeholder="Street name" v-model="form.streetName"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
          <ValidationProvider class="v-provider" name="street type" rules="required" v-slot="{ errors }">
            <BaseFormSelect placeholder="Street type" v-model="form.streetType" :options="options.streetTypes"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
          <div class="break"/>
          <ValidationProvider class="v-provider" name="suburb" rules="required" v-slot="{ errors }">
            <BaseFormInput placeholder="Suburb" v-model="form.suburb"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
          <ValidationProvider class="v-provider" name="state" rules="required" v-slot="{ errors }">
            <BaseFormSelect placeholder="State" v-model="form.state" :options="options.states"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
          <ValidationProvider class="v-provider" name="postcode" rules="required|numeric" v-slot="{ errors }">
            <BaseFormInput placeholder="Postcode" v-model="form.postcode"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
        </div>
      </div>
      <div class="card">
        <BaseText4 class="title" text="Coordinates"/>
        <ValidationProvider class="v-provider" name="coordinates" rules="required" v-slot="{ errors }" tag="div">
          <BaseFormCoordinates class="coordinates" :address="address" v-model="form.lngLat"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
      </div>
      <div class="card">
        <BaseText4 class="title" text="Features"/>
        <div class="group">
          <ValidationProvider class="v-provider" name="bedrooms" rules="required|numeric" v-slot="{ errors }">
            <BaseFormInput placeholder="Bedrooms" v-model="form.bedrooms"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
          <ValidationProvider class="v-provider" name="bathrooms" rules="required|numeric" v-slot="{ errors }">
            <BaseFormInput placeholder="Bathrooms" v-model="form.bathrooms"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
          <ValidationProvider class="v-provider" name="car spaces" rules="required|numeric" v-slot="{ errors }">
            <BaseFormInput placeholder="Car spaces" v-model="form.carSpaces"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
          <ValidationProvider class="v-provider" name="floor size" rules="required|numeric" v-slot="{ errors }">
            <BaseFormInput placeholder="Floor size" v-model="form.floorSize"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
          <ValidationProvider class="v-provider" name="land size" rules="required|numeric" v-slot="{ errors }">
            <BaseFormInput placeholder="Land size" v-model="form.landSize"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
          <ValidationProvider class="v-provider" name="property type" rules="required" v-slot="{ errors }">
            <BaseFormSelect placeholder="Property type" v-model="form.propertyType" :options="options.propertyTypes"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
        </div>
        <BaseDivider/>
        <BaseText4 class="title" text="Photos"/>
        <div class="group">
          <ValidationProvider class="v-provider" name="photos" rules="requiredArray" v-slot="{ errors }">
            <BaseFormImageUploader v-model="form.images"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
        </div>
        <BaseDivider/>
        <BaseText4 class="title" text="Sale"/>
        <div class="group">
          <ValidationProvider class="v-provider" name="asking price" rules="required|numeric" v-slot="{ errors }">
            <BaseFormInput placeholder="Asking price" v-model="form.price"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
        </div>
        <BaseDivider/>
        <BaseText4 class="title" text="Contact"/>
        <div class="group">
          <ValidationProvider class="v-provider" name="name" rules="required|alpha_spaces" v-slot="{ errors }">
            <BaseFormInput placeholder="Name" v-model="form.name"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
          <ValidationProvider class="v-provider" name="email" rules="required|email" v-slot="{ errors }">
            <BaseFormInput placeholder="Email" v-model="form.email"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
          <ValidationProvider class="v-provider" name="phone" rules="required|numeric" v-slot="{ errors }">
            <BaseFormInput placeholder="Phone" v-model="form.phone"/>
            <BaseFormError :message="errors[0]"/>
          </ValidationProvider>
        </div>
      </div>
    </ValidationObserver>
    <BaseFormSubmitButton class="submit-button" text="Post listing" @click.native="submit" :loading="loading"/>
  </div>
</template>

<script>
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseFormSelect from '@/components/BaseFormSelect/BaseFormSelect'
import BaseFormCoordinates from '@/components/BaseFormCoordinates/BaseFormCoordinates'
import BaseFormImageUploader from '@/components/BaseFormImageUploader/BaseFormImageUploader'
import ListingService from '@/services/Api/services/ListingService/ListingService'
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full'
import * as options from './form-datatypes'
export default {
  name: 'create',
  components: {
    BaseFormSubmitButton,
    BaseText4,
    BaseDivider,
    BaseFormError,
    BaseFormInput,
    BaseFormSelect,
    BaseFormImageUploader,
    BaseFormCoordinates,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    listing: {
      type: Object,
      required: false
    }
  },
  created () {
    this.initForm()
    this.isEdit = !!this.listing
  },
  data: () => ({
    options,
    form: {},
    isEdit: false,
    loading: false
  }),
  computed: {
    address () {
      if (!this.form.streetNumber || !this.form.streetName || !this.form.streetType || !this.form.suburb || !this.form.state || !this.form.postcode) return null
      const unitSegment = this.form.unitType + ' ' + this.form.unitNumber
      const streetSegment = this.form.streetNumber + ' ' + this.form.streetName + ' ' + this.form.streetType
      const address = `${unitSegment} ${streetSegment}, ${this.form.suburb} ${this.form.state} ${this.form.postcode}`
      return address.trim()
    }
  },
  watch: {
    address (val) {
      this.form.address = val
    }
  },
  methods: {
    initForm () {
      this.form = {
        address: (this.listing && this.listing.address) || '',
        unitType: (this.listing && this.listing.unitType) || '',
        unitNumber: (this.listing && this.listing.unitNumber) || '',
        streetType: (this.listing && this.listing.streetType) || '',
        streetNumber: (this.listing && this.listing.streetNumber) || '',
        streetName: (this.listing && this.listing.streetName) || '',
        suburb: (this.listing && this.listing.suburb) || '',
        state: (this.listing && this.listing.state) || '',
        postcode: (this.listing && this.listing.postcode) || '',
        lngLat: (this.listing && this.listing.lngLat) || [],
        bedrooms: (this.listing && this.listing.bedrooms) || '',
        bathrooms: (this.listing && this.listing.bathrooms) || '',
        carSpaces: (this.listing && this.listing.carSpaces) || '',
        floorSize: (this.listing && this.listing.floorSize) || '',
        landSize: (this.listing && this.listing.landSize) || '',
        propertyType: (this.listing && this.listing.propertyType) || '',
        images: (this.listing && this.listing.images) || [],
        price: (this.listing && this.listing.price) || '',
        name: (this.listing && this.listing.name) || '',
        email: (this.listing && this.listing.email) || '',
        phone: (this.listing && this.listing.phone) || ''
      }
    },
    async submit () {
      if (this.loading || !(await this.$refs['v-observer'].validate())) return
      this.loading = true
      try {
        if (this.isEdit) await ListingService.update(this.listing._id, this.form)
        else await ListingService.create(this.form)
        this.$notify({ text: 'Listing successfully updated.', type: 'success' })
      } catch (err) {
        this.error = true; console.log(err)
        this.$notify({ text: 'Could not save data.', type: 'error' })
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.create {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.v-observer {
  width: 100%;
}
.card {
  background: var(--color-white-1);
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
  padding: var(--spacing-5);
  margin-bottom: var(--spacing-4);
}
.coordinates {
  height: 300px;
}
.group {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: calc(-1 * var(--spacing-2));
}
.group > * {
  margin-bottom: var(--spacing-2);
  &:not(:last-child) { margin-right: var(--spacing-2) }
}
.title {
  margin-bottom: var(--spacing-4);
}
.v-provider {
  position: relative;
}
.break {
  flex-basis: 100%;
  margin: 0;
}
.submit-button {
  max-width: 300px;
}
</style>
