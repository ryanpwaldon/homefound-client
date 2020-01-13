<template>
  <div class="create">
    <ValidationObserver class="form" ref="form" tag="div" v-slot="{ invalid }">
      <BaseCard class="card">
        <BaseText4 class="title" text="Address"/>
        <BaseDivider/>
        <div class="grid">
          <ValidationProvider class="field md" name="unit type" rules="requiredIf:unit number" v-slot="{ errors }">
            <BaseText2 class="field-label" text="Unit type"/>
            <div class="field-content">
              <BaseFormSelect placeholder="Select" v-model="form.unitType" :options="options.unitTypes"/>
              <BaseFormError :message="errors[0]"/>
            </div>
          </ValidationProvider>
          <ValidationProvider class="field sm" name="unit number" rules="requiredIf:unit type" v-slot="{ errors }">
            <BaseText2 class="field-label" text="Unit number"/>
            <div class="field-content">
              <BaseFormInput v-model="form.unitNumber"/>
              <BaseFormError :message="errors[0]"/>
            </div>
          </ValidationProvider>
          <div class="break"/>
          <ValidationProvider class="field sm" name="street number" rules="required" v-slot="{ errors }">
            <BaseText2 class="field-label" text="Street number"/>
            <div class="field-content">
              <BaseFormInput v-model="form.streetNumber"/>
              <BaseFormError :message="errors[0]"/>
            </div>
          </ValidationProvider>
          <ValidationProvider class="field lg" name="street name" rules="required" v-slot="{ errors }">
            <BaseText2 class="field-label" text="Street name"/>
            <div class="field-content">
              <BaseFormInput v-model="form.streetName"/>
              <BaseFormError :message="errors[0]"/>
            </div>
          </ValidationProvider>
          <ValidationProvider class="field md" name="street type" rules="required" v-slot="{ errors }">
            <BaseText2 class="field-label" text="Street type"/>
            <div class="field-content">
              <BaseFormSelect placeholder="Select" v-model="form.streetType" :options="options.streetTypes"/>
              <BaseFormError :message="errors[0]"/>
            </div>
          </ValidationProvider>
          <div class="break"/>
          <ValidationProvider class="field lg" name="suburb" rules="required" v-slot="{ errors }">
            <BaseText2 class="field-label" text="Suburb"/>
            <div class="field-content">
              <BaseFormInput v-model="form.suburb"/>
              <BaseFormError :message="errors[0]"/>
            </div>
          </ValidationProvider>
          <ValidationProvider class="field md" name="state" rules="required" v-slot="{ errors }">
            <BaseText2 class="field-label" text="State"/>
            <div class="field-content">
              <BaseFormSelect placeholder="Select" v-model="form.state" :options="options.states"/>
              <BaseFormError :message="errors[0]"/>
            </div>
          </ValidationProvider>
          <ValidationProvider class="field sm" name="postcode" rules="required|numeric" v-slot="{ errors }">
            <BaseText2 class="field-label" text="Postcode"/>
            <div class="field-content">
              <BaseFormInput v-model="form.postcode"/>
              <BaseFormError :message="errors[0]"/>
            </div>
          </ValidationProvider>
        </div>
      </BaseCard>
      <BaseCard class="card">
        <BaseText4 class="title" text="Coordinates"/>
        <BaseDivider/>
        <ValidationProvider class="field map" name="coordinates" rules="required" v-slot="{ errors }">
          <BaseFormCoordinates :address="address" v-model="form.lngLat"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
      </BaseCard>
      <BaseCard class="card">
        <BaseText4 class="title" text="Features"/>
        <BaseDivider/>
        <div class="grid">
          <ValidationProvider class="field md" name="property type" rules="required" v-slot="{ errors }">
            <BaseText2 class="field-label" text="Property type"/>
            <div class="field-content">
              <BaseFormSelect placeholder="Select" v-model="form.propertyType" :options="options.propertyTypes"/>
              <BaseFormError :message="errors[0]"/>
            </div>
          </ValidationProvider>
          <div class="break"/>
          <ValidationProvider class="field md" name="bedrooms" rules="required|numeric" v-slot="{ errors }">
            <BaseText2 class="field-label" text="Bedrooms"/>
            <div class="field-content">
              <BaseFormInput v-model="form.bedrooms"/>
              <BaseFormError :message="errors[0]"/>
            </div>
          </ValidationProvider>
          <ValidationProvider class="field md" name="bathrooms" rules="required|numeric" v-slot="{ errors }">
            <BaseText2 class="field-label" text="Bathrooms"/>
            <div class="field-content">
              <BaseFormInput v-model="form.bathrooms"/>
              <BaseFormError :message="errors[0]"/>
            </div>
          </ValidationProvider>
          <ValidationProvider class="field md" name="car spaces" rules="required|numeric" v-slot="{ errors }">
            <BaseText2 class="field-label" text="Car spaces"/>
            <div class="field-content">
              <BaseFormInput v-model="form.carSpaces"/>
              <BaseFormError :message="errors[0]"/>
            </div>
          </ValidationProvider>
          <div class="break"/>
          <ValidationProvider class="field md" name="land size" rules="required|numeric" v-slot="{ errors }">
            <BaseText2 class="field-label" text="Land size"/>
            <div class="field-content">
              <BaseFormInput v-model="form.landSize"/>
              <BaseFormError :message="errors[0]"/>
            </div>
          </ValidationProvider>
          <ValidationProvider class="field md" name="floor size" rules="required|numeric" v-slot="{ errors }">
            <BaseText2 class="field-label" text="Floor size"/>
            <div class="field-content">
              <BaseFormInput v-model="form.floorSize"/>
              <BaseFormError :message="errors[0]"/>
            </div>
          </ValidationProvider>
        </div>
      </BaseCard>
      <BaseCard class="card">
        <BaseText4 class="title" text="Photos"/>
        <BaseDivider/>
        <ValidationProvider class="field image-uploader" name="photos" rules="requiredArray" v-slot="{ errors }">
          <BaseFormImageUploader v-model="form.images"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
      </BaseCard>
      <BaseCard class="card">
        <BaseText4 class="title" text="Sale"/>
        <BaseDivider/>
        <div class="grid">
          <ValidationProvider class="field lg" name="asking price" rules="required|numeric" v-slot="{ errors }">
            <BaseText2 class="field-label" text="Asking price"/>
            <div class="field-content">
              <BaseFormInput v-model="form.price"/>
              <BaseFormError :message="errors[0]"/>
            </div>
          </ValidationProvider>
        </div>
      </BaseCard>
      <BaseCard class="card">
        <BaseText4 class="title" text="Contact"/>
        <BaseDivider/>
        <div class="grid">
          <ValidationProvider class="field lg" name="name" rules="required|alpha_spaces" v-slot="{ errors }">
            <BaseText2 class="field-label" text="Name"/>
            <div class="field-content">
              <BaseFormInput v-model="form.name" autocomplete="name"/>
              <BaseFormError :message="errors[0]"/>
            </div>
          </ValidationProvider>
          <div class="break"/>
          <ValidationProvider class="field lg" name="email" rules="required|email" v-slot="{ errors }">
            <BaseText2 class="field-label" text="Email"/>
            <div class="field-content">
              <BaseFormInput v-model="form.email" autocomplete="email"/>
              <BaseFormError :message="errors[0]"/>
            </div>
          </ValidationProvider>
          <div class="break"/>
          <ValidationProvider class="field lg" name="phone" rules="required|numeric" v-slot="{ errors }">
            <BaseText2 class="field-label" text="Phone"/>
            <div class="field-content">
              <BaseFormInput v-model="form.phone" autocomplete="phone"/>
              <BaseFormError :message="errors[0]"/>
            </div>
          </ValidationProvider>
        </div>
      </BaseCard>
    </ValidationObserver>
    <BaseCard class="card">
      <div class="button-container">
        <BaseFormSubmitButton class="button" text="Save as unpublished" design="gray" @click.native="submit(false)" :loading="loading"/>
        <BaseText6 class="subcopy">Listing will be <span style="color: var(--color-black-2)">hidden</span> from property seekers in search results</BaseText6>
      </div>
      <BaseDivider/>
      <div class="button-container">
        <BaseFormSubmitButton class="button" text="Save and publish" @click.native="submit(true)" :loading="loading"/>
        <BaseText6 class="subcopy">Listing will be <span style="color: var(--color-black-2)">visible</span> to to property seekers in search results</BaseText6>
      </div>
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseText6 from '@/components/BaseText6/BaseText6'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseFormSelect from '@/components/BaseFormSelect/BaseFormSelect'
import BaseFormCoordinates from '@/components/BaseFormCoordinates/BaseFormCoordinates'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import BaseFormImageUploader from '@/components/BaseFormImageUploader/BaseFormImageUploader'
import ListingService from '@/services/Api/services/ListingService/ListingService'
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full'
import * as options from './form-datatypes'
export default {
  name: 'create',
  components: {
    BaseCard,
    BaseText2,
    BaseText4,
    BaseText6,
    BaseDivider,
    BaseFormError,
    BaseFormInput,
    BaseFormSelect,
    BaseFormSubmitButton,
    BaseFormImageUploader,
    BaseFormCoordinates,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    listing: {
      type: Object,
      required: true
    }
  },
  created () {
    this.initForm()
  },
  data: () => ({
    options,
    form: {},
    loading: false
  }),
  computed: {
    address () {
      if (!this.form.streetNumber || !this.form.streetName || !this.form.streetType || !this.form.suburb || !this.form.state || !this.form.postcode) return null
      const unitSegment = this.form.unitType && this.form.unitNumber ? `${this.form.unitType} ${this.form.unitNumber}` : ''
      const address = `${unitSegment} ${unitSegment ? '/' : ''} ${this.form.streetNumber} ${this.form.streetName} ${this.form.streetType}, ${this.form.suburb} ${this.form.state} ${this.form.postcode}`
      return address.trim()
    }
  },
  methods: {
    initForm () {
      this.form = {
        unitType: this.listing.unitType || '',
        unitNumber: this.listing.unitNumber || '',
        streetType: this.listing.streetType || '',
        streetNumber: this.listing.streetNumber || '',
        streetName: this.listing.streetName || '',
        suburb: this.listing.suburb || '',
        state: this.listing.state || '',
        postcode: this.listing.postcode || '',
        lngLat: this.listing.lngLat || [],
        bedrooms: this.listing.bedrooms || '',
        bathrooms: this.listing.bathrooms || '',
        carSpaces: this.listing.carSpaces || '',
        floorSize: this.listing.floorSize || '',
        landSize: this.listing.landSize || '',
        propertyType: this.listing.propertyType || '',
        images: this.listing.images || [],
        price: this.listing.price || '',
        name: this.listing.name || '',
        email: this.listing.email || '',
        phone: this.listing.phone || '',
        published: this.listing.published || false
      }
    },
    async submit (shouldPublish) {
      if (this.loading || !(await this.$refs['form'].validate())) return
      this.loading = true
      try {
        this.form.published = shouldPublish
        const listing = await ListingService.update(this.listing._id, this.form)
        this.$emit('listing-updated', listing)
        this.$notify({ text: 'Success', type: 'success' })
      } catch (err) {
        console.log(err)
        this.$notify({ text: 'Error', type: 'error' })
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
  min-width: 600px;
}
.card {
  width: 100%;
  margin-bottom: var(--spacing-5);
}
.grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: var(--spacing-4);
}
.field {
  position: relative;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  &.sm { grid-column: span 1 }
  &.md { grid-column: span 2 }
  &.lg { grid-column: span 3 }
}
.field-content {
  position: relative;
}
.field-label {
  margin-bottom: var(--spacing-2);
  color: var(--color-gray-4);
}
.break {
  grid-column: span 6;
  height: var(--spacing-4);
}
.map {
  height: 300px;
  width: 100%;
}
.image-uploader {
  display: inline-flex;
}
.button-container {
  width: 100%;
  display: flex;
  align-items: center;
  .button {
    width: auto;
    margin-right: var(--spacing-4);
  }
}
.subcopy {
  color: var(--color-gray-4);
}
</style>
