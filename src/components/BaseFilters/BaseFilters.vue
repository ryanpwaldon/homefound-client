<template>
  <div class="base-filters">
    <BaseText4 class="title" text="Filters"/>
    <div class="items">
      <BaseFormSelect
        placeholder="Bedrooms"
        v-model="form.bedrooms"
        :options="[
          {title: '0', value: '0'},
          {title: '1', value: '1'},
          {title: '2', value: '2'},
          {title: '3', value: '3'},
          {title: '4', value: '4'},
          {title: '5+', value: '5+'}
        ]"
      />
      <BaseFormSelect
        placeholder="Bathrooms"
        v-model="form.bathrooms"
        :options="[
          {title: '0', value: '0'},
          {title: '1', value: '1'},
          {title: '2', value: '2'},
          {title: '3', value: '3'},
          {title: '4', value: '4'},
          {title: '5+', value: '5+'}
        ]"
      />
      <BaseFormSelect
        placeholder="Unit type"
        v-model="form.unitType"
        :options="[
          {title: 'Unit', value: 'Unit'},
          {title: 'Lot', value: 'Lot'},
          {title: 'Shop', value: 'Shop'}
        ]"
      />
    </div>
  </div>
</template>

<script>
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseFormSelect from '@/components/BaseFormSelect/BaseFormSelect'
export default {
  components: {
    BaseText4,
    BaseFormSelect
  },
  mounted () {
    this.$emit('input', this.form)
  },
  data: () => ({
    form: {
      bedrooms: undefined
      // bathrooms: null,
      // carSpaces: null,
      // unitType: null
    }
  }),
  watch: {
    form: {
      deep: true,
      handler () {
        console.log('hello')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-filters {
  width: 100%;
  padding: var(--spacing-5);
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
  background: var(--color-white-1);
}
.title {
  margin-bottom: var(--spacing-4);
}
.items {
  display: flex;
  > * {
    margin-right: var(--spacing-2);
  }
}
</style>
