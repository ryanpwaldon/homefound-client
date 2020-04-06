<template>
  <div class="base-form-address-autocomplete" @click.stop>
    <BaseFormInput
      v-model="query"
      ref="input"
      :placeholder="placeholder"
      @keydown.down.native="focusIndex !== addresses.length - 1 && focusIndex++"
      @keydown.up.native="focusIndex !== 0 && focusIndex--"
      @keydown.enter.native="onSelect"
      @focus.native="canDisplayDropdown = true"
      @blur.native="canDisplayDropdown = false"
      :disabled="valid || disabled"
    />
    <BaseTransitionContextMenu transform-origin="center top">
      <div class="addresses-container" v-if="canDisplayDropdown && addresses.length">
        <div
          class="address"
          :class="i === focusIndex && 'focused'"
          v-for="(address, i) in addresses"
          @mouseenter="focusIndex = i"
          @click="onSelect"
          :key="i">
          {{ formatAddress(address) }}
        </div>
      </div>
    </BaseTransitionContextMenu>
    <BaseButtonFlex
      class="edit"
      @click.native="onEdit"
      v-if="valid && !disabled">
      Edit
    </BaseButtonFlex>
  </div>
</template>

<script>
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseButtonFlex from '@/components/BaseButtonFlex/BaseButtonFlex'
import BaseTransitionContextMenu from '@/components/BaseTransitionContextMenu/BaseTransitionContextMenu'
import AddressAutocompleteService from '@/services/AddressAutocompleteService/AddressAutocompleteService'
import debounce from 'lodash/debounce'
export default {
  components: {
    BaseButtonFlex,
    BaseFormInput,
    BaseTransitionContextMenu
  },
  props: {
    value: {
      type: Object,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    }
  },
  created () {
    if (this.valid) this.query = this.formatAddress(this.value)
  },
  data: () => ({
    query: '',
    addresses: [],
    focusIndex: 0,
    canDisplayDropdown: false
  }),
  computed: {
    valid () {
      return !!(
        this.value.suburb &&
        this.value.state &&
        this.value.postcode &&
        true
      )
    }
  },
  watch: {
    query: debounce(async function (query) {
      if (!query) return
      this.addresses = await AddressAutocompleteService.findAddresses(query)
      this.focusIndex = 0
    }, 100)
  },
  methods: {
    onSelect () {
      const address = this.addresses[this.focusIndex]
      this.query = this.formatAddress(address)
      this.$emit('input', address)
    },
    async onEdit () {
      this.query = ''
      this.addresses = []
      this.$emit('input', { suburb: '', state: '', postcode: '' })
      await this.$nextTick()
      this.$refs['input'].$el.focus()
    },
    formatAddress ({ suburb, state, postcode }) {
      return `${suburb}, ${postcode} ${state}`
    }
  }
}
</script>

<style lang="scss" scoped>
.base-form-address-autocomplete {
  position: relative;
}
.addresses-container {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin: var(--spacing-1) 0;
  background: var(--color-white-1);
  border: solid 1px var(--color-gray-3);
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-3);
  z-index: 1001;
  max-height: 38rem;
  overflow: auto;
}
.address {
  margin: var(--spacing-1) 0;
  padding: var(--spacing-2) var(--spacing-3);
  transition: var(--transition-settings-1) background-color;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    height: 1em;
    width: 11px;
    margin-right: var(--spacing-2);
  }
  &.focused {
    background-color: var(--color-gray-1);
  }
}
.edit {
  position: absolute;
  top: 50%;
  right: var(--spacing-2);
  transform: translateY(-50%);
  height: 2rem;
  font-size: 1.2rem;
  color: var(--color-black-2);
}
</style>
