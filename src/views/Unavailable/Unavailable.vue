<template>
  <BaseLayoutHome>
    <div class="unavailable">
      <div class="container">
        <div class="title">We haven't launched in your area</div>
        <div class="description">
          We'll let you know when we're available in your area. <span class="underline pointer" @click="logout">Click here to login with a different email.</span>
        </div>
      </div>
    </div>
  </BaseLayoutHome>
</template>

<script>
import BaseLayoutHome from '@/components/BaseLayoutHome/BaseLayoutHome'
export default {
  name: 'unavailable',
  components: {
    BaseLayoutHome
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.unavailable {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-10) 0;
  @include media(sm-only) {
    padding: var(--spacing-8) 0;
  }
}
.container {
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  grid-gap: var(--spacing-5);
  max-width: 40rem;
  @include media(sm-only) {
    max-width: none;
  }
}
.title {
  font-size: 2rem;
  font-weight: var(--font-weight-medium);
}
.description {
  color: var(--color-gray-4);
  line-height: 1.5;
}
.underline {
  text-decoration: underline;
}
.pointer {
  cursor: pointer;
}
</style>
