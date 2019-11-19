<template>
  <div class="create">
    <ValidationObserver class="observer" ref="observer" tag="div" v-slot="{ invalid }">
      <BaseText4 class="title" text="Address"/>
      <div class="group">
        <ValidationProvider class="provider" name="unit type" rules="requiredIf:unit number" v-slot="{ errors }">
          <BaseFormSelect placeholder="Unit type" v-model="form.unitType" :options="[ {title: 'Unit', value: 'Unit'}, {title: 'Lot', value: 'Lot'}, {title: 'Shop', value: 'Shop'} ]"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <ValidationProvider class="provider" name="unit number" rules="requiredIf:unit type" v-slot="{ errors }">
          <BaseFormInput placeholder="Unit number" v-model="form.unitNumber"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <div class="break"/>
        <ValidationProvider class="provider" name="street number" rules="required" v-slot="{ errors }">
          <BaseFormInput placeholder="Street number" v-model="form.streetNumber"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <ValidationProvider class="provider" name="street name" rules="required" v-slot="{ errors }">
          <BaseFormInput placeholder="Street name" v-model="form.streetName"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <ValidationProvider class="provider" name="street type" rules="required" v-slot="{ errors }">
          <BaseFormSelect placeholder="Street type" v-model="form.streetType" :options="[ {title: 'Street', value: 'Street'}, {title: 'Road', value: 'Road'}, {title: 'Avenue', value: 'Avenue'} ]"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <div class="break"/>
        <ValidationProvider class="provider" name="suburb" rules="required" v-slot="{ errors }">
          <BaseFormInput placeholder="Suburb" v-model="form.suburb"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <ValidationProvider class="provider" name="state" rules="required" v-slot="{ errors }">
          <BaseFormSelect placeholder="State" v-model="form.state" :options="[ {title: 'NSW', value: 'NSW'}, {title: 'QLD', value: 'QLD'}, {title: 'ACT', value: 'ACT'}, {title: 'VIC', value: 'VIC'}, {title: 'SA', value: 'SA'}, {title: 'TAS', value: 'TAS'}, {title: 'WA', value: 'WA'}, {title: 'NT', value: 'NT'}, ]"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <ValidationProvider class="provider" name="postcode" rules="required|numeric" v-slot="{ errors }">
          <BaseFormInput placeholder="Postcode" v-model="form.postcode"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
      </div>
      <BaseDivider/>
      <BaseText4 class="title" text="Features"/>
      <div class="group">
        <ValidationProvider class="provider" name="bedrooms" rules="required|numeric" v-slot="{ errors }">
          <BaseFormInput placeholder="Bedrooms" v-model="form.bedrooms"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <ValidationProvider class="provider" name="bathrooms" rules="required|numeric" v-slot="{ errors }">
          <BaseFormInput placeholder="Bathrooms" v-model="form.bathrooms"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <ValidationProvider class="provider" name="car spaces" rules="required|numeric" v-slot="{ errors }">
          <BaseFormInput placeholder="Car spaces" v-model="form.carSpaces"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <ValidationProvider class="provider" name="floor size" rules="required|numeric" v-slot="{ errors }">
          <BaseFormInput placeholder="Floor size" v-model="form.floorSize"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <ValidationProvider class="provider" name="land size" rules="required|numeric" v-slot="{ errors }">
          <BaseFormInput placeholder="Land size" v-model="form.landSize"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <ValidationProvider class="provider" name="property type" rules="required" v-slot="{ errors }">
          <BaseFormSelect placeholder="Property type" v-model="form.propertyType" :options="[ {title: 'House', value: 'house'}, {title: 'Unit', value: 'unit'} ]"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
      </div>
      <BaseDivider/>
      <BaseText4 class="title" text="Photos"/>
      <div class="group">
        <ValidationProvider class="provider" name="photos" rules="requiredArray" v-slot="{ errors }">
          <BaseFormImageUploader v-model="form.images"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
      </div>
      <BaseDivider/>
      <BaseText4 class="title" text="Sale"/>
      <div class="group">
        <ValidationProvider class="provider" name="asking price" rules="required|numeric" v-slot="{ errors }">
          <BaseFormInput placeholder="Asking price" v-model="form.price"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
      </div>
      <BaseDivider/>
      <BaseText4 class="title" text="Contact"/>
      <div class="group">
        <ValidationProvider class="provider" name="name" rules="required|alpha_spaces" v-slot="{ errors }">
          <BaseFormInput placeholder="Name" v-model="form.name"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <ValidationProvider class="provider" name="email" rules="required|email" v-slot="{ errors }">
          <BaseFormInput placeholder="Email" v-model="form.email"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <ValidationProvider class="provider" name="phone" rules="required|numeric" v-slot="{ errors }">
          <BaseFormInput placeholder="Phone" v-model="form.phone"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
      </div>
    </ValidationObserver>
    <BaseFormSubmitButton text="Submit" @click.native="submit"/>
  </div>
</template>

<script>
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseFormSelect from '@/components/BaseFormSelect/BaseFormSelect'
import BaseFormImageUploader from '@/components/BaseFormImageUploader/BaseFormImageUploader'
import ListingService from '@/services/Api/services/ListingService/ListingService'
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full'
export default {
  components: {
    BaseFormSubmitButton,
    BaseText4,
    BaseDivider,
    BaseFormError,
    BaseFormInput,
    BaseFormSelect,
    BaseFormImageUploader,
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    form: {
      unitType: '',
      unitNumber: '',
      streetType: '',
      streetNumber: '',
      streetName: '',
      suburb: '',
      state: '',
      postcode: '',
      bedrooms: '',
      bathrooms: '',
      carSpaces: '',
      floorSize: '',
      landSize: '',
      propertyType: '',
      images: [],
      price: '',
      name: '',
      email: '',
      phone: ''
    }
  }),
  methods: {
    async submit () {
      if (!(await this.$refs['observer'].validate())) return
      try { await ListingService.create(this.form) }
      catch (err) { this.error = true; console.log(err) }
    }
  }
}
</script>

<style lang="scss" scoped>
.observer {
  width: 100%;
  background: var(--color-white-1);
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
  padding: var(--spacing-5);
  margin-bottom: var(--spacing-4);
}
.title {
  margin-bottom: var(--spacing-4);
}
.group {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: calc(-1 * var(--spacing-2));
  > * {
    margin-bottom: var(--spacing-2);
    &:not(:last-child) {
      margin-right: var(--spacing-2);
    }
  }
}
.provider {
  position: relative;
}
.break {
  flex-basis: 100%;
  margin: 0;
}
</style>
