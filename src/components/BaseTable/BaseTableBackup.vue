<template>
  <table class="base-table" v-if="initialized">
    <tr>
      <th>
        <BaseFormCheckbox v-model="allSelected" :disabled="true" @click.native="toggleAllSelected"/>
      </th>
      <th v-for="(column, i) in columns" :key="i">
        <BaseText2 :text="column.label"/>
      </th>
    </tr>
    <tr :class="{selected: value[i]}" v-for="(row, i) in rows" :key="i">
      <td>
        <BaseFormCheckbox v-model="value[i]"/>
      </td>
      <td v-for="(column, i) in columns" :key="i">
        <BaseText2 :text="row[column.key]"/>
      </td>
    </tr>
  </table>
</template>

<script>
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseFormCheckbox from '@/components/BaseFormCheckbox/BaseFormCheckbox'
export default {
  components: {
    BaseText2,
    BaseFormCheckbox
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    }
  },
  created () {
    this.initValue()
  },
  data: () => ({
    initialized: false,
    allSelected: false
  }),
  watch: {
    value: {
      deep: true,
      handler (value) {
        this.allSelected = value.every(val => val === true)
      }
    }
  },
  methods: {
    async initValue () {
      const value = Array(this.rows.length).fill(false)
      this.$emit('input', value)
      await this.$nextTick()
      this.initialized = true
    },
    toggleAllSelected () {
      this.allSelected = !this.allSelected
      const value = Array(this.rows.length).fill(this.allSelected)
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  color: var(--color-gray-4);
  * { user-select: text }
}
tr:first-child > * {
  font-weight: var(--font-weight-medium);
}
tr > * {
  font-weight: var(--font-weight-regular);
  padding: var(--spacing-4);
  padding-left: 0;
  border-bottom: var(--color-gray-1) solid 1px;
  white-space: nowrap;
  text-align: left;
  transition: background-color 0.05s ease-out;
  &:last-child { padding-right: 0 }
}
.selected > * {
  background-color: var(--color-blue-5);
}
</style>
