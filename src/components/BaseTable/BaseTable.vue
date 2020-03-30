<template>
  <div class="base-table">
    <div class="container">
      <table>
        <tr>
          <th>
            <BaseFormCheckbox :value="selectAllStatus" @input="toggleSelectAll()"/>
          </th>
          <th v-for="(column, i) in columns" :key="i">
            <BaseText2 :text="column.label"/>
          </th>
        </tr>
        <tr :class="{selected: selectedIds.includes(id)}" v-for="(id, i) in ids" :key="i">
          <td>
            <BaseFormCheckbox :value="selectedIds.includes(id)" @input="toggleSelectOne(id)"/>
          </td>
          <td v-for="(column, i) in columns" :key="i">
            <BaseText2 :text="column.transform ? column.transform(rowsById[id][column.key]) : rowsById[id][column.key]"/>
          </td>
        </tr>
      </table>
    </div>
    <div class="notice" v-if="!items.length">
      <BaseText2 text="No items found"/>
    </div>
  </div>
</template>

<script>
import BaseFormCheckbox from '@/components/BaseFormCheckbox/BaseFormCheckbox'
import BaseText2 from '@/components/BaseText2/BaseText2'
import sortBy from 'lodash/sortBy'
import shortId from 'shortid'
export default {
  components: {
    BaseFormCheckbox,
    BaseText2
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    sort: {
      type: String,
      required: true
    }
  },
  data: () => ({
    ids: [],
    rowsById: {},
    selectedIds: []
  }),
  computed: {
    rows () {
      return this.ids.map(id => this.rowsById[id])
    },
    selectAllStatus () {
      return this.selectedIds.length === this.ids.length
    },
    selectedItems () {
      return this.selectedIds.map(id => this.rowsById[id])
    }
  },
  watch: {
    items: {
      immediate: true,
      handler (items) {
        for (const item of items) this.rowsById[shortId.generate()] = item
        this.updateSort(this.sort)
      }
    }
  },
  methods: {
    updateSort (key) {
      this.ids = sortBy(Object.entries(this.rowsById), `[1][${key}]`).map(([id]) => id)
    },
    toggleSelectOne (id) {
      this.selectedIds.includes(id) ? this.selectedIds.splice(this.selectedIds.indexOf(id), 1) : this.selectedIds.push(id)
      this.$emit('selected', this.selectedItems)
    },
    toggleSelectAll () {
      this.selectedIds = this.selectedIds.length === this.ids.length ? [] : this.ids.slice()
      this.$emit('selected', this.selectedItems)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-table {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.container {
  overflow-x: auto;
  position: relative;
  width: calc(100% + var(--spacing-5) * 2);
  left: calc(-1 * var(--spacing-5));
  display: flex;
  &::after,
  &::before {
    content: '';
    width: var(--spacing-5);
    flex-shrink: 0;
  }
}
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
.notice {
  height: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: var(--color-gray-1) solid 1px;
  color: var(--color-gray-4);
}
</style>
