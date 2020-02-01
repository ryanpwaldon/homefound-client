<template>
  <BaseCard>
    <div class="container">
      <div class="content">
        <div class="icon"><BaseText1 :text="initials"/></div>
        <div class="details">
          <BaseText5 class="name" :text="name"/>
          <BaseText6 class="joined">Joined Homefound {{ joined | moment('from', 'now') }}</BaseText6>
        </div>
      </div>
      <BaseButton text="Logout" design="black" @click.native="logout"/>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText5 from '@/components/BaseText5/BaseText5'
import BaseText6 from '@/components/BaseText6/BaseText6'
import BaseButton from '@/components/BaseButton/BaseButton'
import { mapState } from 'vuex'
export default {
  components: {
    BaseCard,
    BaseText1,
    BaseText5,
    BaseText6,
    BaseButton
  },
  computed: mapState('user', {
    name: state => state.user.name,
    joined: state => state.user.createdAt,
    initials: state => state.user.name.slice(0, 2)
  }),
  methods: {
    logout () {
      this.$router.push('/')
      this.$store.dispatch('user/logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content {
  display: flex;
  align-items: center;
}
.icon {
  width: 50px;
  height: 50px;
  background-color: var(--color-blue-2);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  line-height: 1;
  text-transform: uppercase;
  margin-right: var(--spacing-4);
}
.details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.name {
  margin-bottom: var(--spacing-1);
}
.joined {
  color: var(--color-gray-4);
}
</style>
