<template>
  <div class="notifications">
    <BaseContentCard class="card" title="Email notifications">
      <div class="option" v-for="(notification, i) in allNotifications" :key="i">
        <div class="title">{{ notification.title }}</div>
        <div class="description">{{ notification.description }}</div>
        <BaseFormToggle
          :value="notifications.includes(notification.id)"
          :async-func="state => updateOneNotification(notification.id, state)"
        />
      </div>
    </BaseContentCard>
  </div>
</template>

<script>
import BaseContentCard from '@/components/BaseContentCard/BaseContentCard'
import BaseFormToggle from '@/components/BaseFormToggle/BaseFormToggle'
import UserService from '@/services/Api/services/UserService/UserService'
import { PERFORMANCE_REPORT_DAILY, MARKET_REPORT_DAILY } from '@/constants/notifications/notifications'
import { mapGetters } from 'vuex'
export default {
  name: 'notifications',
  components: {
    BaseContentCard,
    BaseFormToggle
  },
  created () {
    this.allNotifications = [
      {
        title: 'Daily summary',
        description: 'Receive a summary of newly listed properties at the end of each day.',
        role: this.$getRole('BUYER'),
        id: MARKET_REPORT_DAILY
      },
      {
        title: 'Daily summary',
        description: `Receive a summary of how your listings performed (the day prior) at the beginning of each day.`,
        role: this.$getRole('SELLER'),
        id: PERFORMANCE_REPORT_DAILY
      }
    ].filter(notification => this.roles.includes(notification.role))
  },
  computed: mapGetters('user', [
    'notifications',
    'roles'
  ]),
  methods: {
    async updateOneNotification (notificationId, state) {
      const { user, accessToken } = await UserService.updateOneNotification(notificationId, state)
      this.$store.dispatch('user/loginSuccess', { user, accessToken })
    }
  }
}
</script>

<style lang="scss" scoped>
.notifications {
  display: grid;
  grid-auto-flow: row;
  grid-gap: var(--spacing-5);
}
.option {
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: max-content 1fr;
  align-items: center;
  justify-content: space-between;
  grid-row-gap: var(--spacing-2);
  grid-column-gap: var(--spacing-5);
}
.name {
  grid-row: 1;
  grid-column: 1;
  font-size: 1.4rem;
}
.description {
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-gray-4);
  grid-row: 2;
  grid-column: 1;
}
.toggle {
  grid-row: 1;
  grid-column: 2;
}
</style>
