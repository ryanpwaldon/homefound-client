<template>
  <div class="base-listing-card-buyer">
    <div class="image-container">
      <div class="image" :style="{backgroundImage: `url(${image + '-/resize/400x/'})`}"/>
    </div>
    <div class="contents">
      <div class="row r-1">
        <BaseText2 class="text" :text="price | numeral('0.[00]a')"/>
        <BaseText2 class="text" :text="`${bedrooms} | ${bathrooms} | ${carSpaces}`"/>
      </div>
      <BaseDivider class="divider"/>
      <div class="row r-2">
        <BaseText2 class="text">{{ firstPublishedAt | moment('from', 'now') }}</BaseText2>
        <BaseContextMenu>
          <template v-slot:trigger>
            <BaseButtonFlex class="options-button" :icon="require('@/assets/img/dots.svg')"/>
          </template>
          <template v-slot:content="{ close }">
            <div class="info">{{ address }}</div>
            <BaseDivider class="context-menu-divider"/>
            <div class="action" @click="addToSavedListings(close)">
              <img src="@/assets/img/bookmark-sm.svg">
              Add to saved
            </div>
          </template>
        </BaseContextMenu>
      </div>
    </div>
  </div>
</template>

<script>
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseButtonFlex from '@/components/BaseButtonFlex/BaseButtonFlex'
import BaseContextMenu from '@/components/BaseContextMenu/BaseContextMenu'
import UserService from '@/services/Api/services/UserService/UserService'
export default {
  components: {
    BaseText2,
    BaseDivider,
    BaseButtonFlex,
    BaseContextMenu
  },
  props: {
    listingId: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: 'https://ucarecdn.com/48db410d-7b1f-4ec6-8e6c-e8a188c72e15/'
    },
    price: {
      type: String,
      required: true
    },
    bedrooms: {
      type: String,
      required: true
    },
    bathrooms: {
      type: String,
      required: true
    },
    carSpaces: {
      type: String,
      required: true
    },
    firstPublishedAt: {
      type: String,
      required: true
    }
  },
  methods: {
    async addToSavedListings (close) {
      close()
      try {
        const user = await UserService.addToSavedListings(this.listingId)
        this.$store.commit('user/setUser', user)
        this.$notify({ text: 'Added to your saved listings', type: 'success' })
      } catch (error) {
        console.log(error)
        this.$notify({ text: 'Error', type: 'error' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-listing-card-buyer {
  display: flex;
  position: relative;
  flex-direction: column;
  background: var(--color-white-1);
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
  overflow: hidden;
}
.image-container {
  position: relative;
  padding-top: calc(100% / 1.2);
  width: 100%;
  height: 0;
}
.image {
  position: absolute;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  top: 0;
  left: 0;
}
.contents {
  flex-shrink: 0;
  padding: var(--spacing-2);
}
.row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.r-2 {
  color: var(--color-gray-4);
}
.divider {
  margin: var(--spacing-2) 0;
}
.options-button {
  height: 2rem;
  width: 2em;
}
.context-menu-divider {
  margin: 0;
}
.info {
  padding: var(--spacing-3);
  color: var(--color-gray-4);
  line-height: 1.5;
}
.action {
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
  &:hover {
    background-color: var(--color-gray-1);
  }
}
</style>
