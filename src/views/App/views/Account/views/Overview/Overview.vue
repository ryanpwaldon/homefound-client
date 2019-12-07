<template>
  <div class="overview">
    <BaseCard class="card">
      <div class="row">
        <div class="user">
          <div class="dp"><BaseText1 :text="initials"/></div>
          <div class="info">
            <BaseText5 class="name" :text="name"/>
            <BaseText6 class="joined">Joined Homeshade {{ joined | moment('from', 'now') }}</BaseText6>
          </div>
        </div>
        <BaseButton text="Logout" design="black" @click.native="logout"/>
      </div>
      <BaseDivider/>
      <div class="row">
        <div class="info">
          <BaseText4 class="label" text="Email address"/>
          <BaseText5 class="value" :text="email"/>
        </div>
        <BaseButton text="Update"/>
      </div>
      <BaseDivider/>
      <div class="row">
        <div class="info">
          <BaseText4 class="label" text="Password"/>
          <BaseText5 class="value" text="•••••••••••••••••••••••"/>
        </div>
        <BaseButton text="Update"/>
      </div>
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText5 from '@/components/BaseText5/BaseText5'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseText6 from '@/components/BaseText6/BaseText6'
import BaseButton from '@/components/BaseButton/BaseButton'
import { mapState } from 'vuex'
export default {
  name: 'overview',
  components: {
    BaseCard,
    BaseDivider,
    BaseText1,
    BaseText5,
    BaseText4,
    BaseText6,
    BaseButton
  },
  computed: mapState({
    name: state => state.user.name,
    email: state => state.user.email,
    joined: state => state.user.createdAt,
    initials: state => state.user.name.slice(0, 2)
  }),
  methods: {
    logout () {
      this.$router.push('/')
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.user {
  display: flex;
  align-items: center;
}
.dp {
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
.name {
  margin-bottom: var(--spacing-1);
}
.joined {
  color: var(--color-gray-4);
}
.label {
  margin-bottom: var(--spacing-2);
  color: var(--color-gray-4);
}
</style>
