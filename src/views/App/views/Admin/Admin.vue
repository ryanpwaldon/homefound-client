<template>
  <BaseLayoutCenter max-width="1000px">
    <BaseLoader class="loader" v-if="contentLoading" text="Loading content"/>
    <div class="admin" v-else>
      <BaseText1 text="Admin"/>
      <BaseDivider/>
      <BaseCard>
      <div class="header">
        <BaseText4 text="Agent Registrations"/>
        <ValidationObserver class="form" ref="form" tag="form" v-slot="{ valid }">
          <ValidationProvider rules="required">
            <BaseFormSelect class="input" v-model="registrationStatus" :options="registrationStatusOptions" placeholder="Update registration status"/>
          </ValidationProvider>
          <BaseButton class="button" text="Update" :loading="formSubmissionLoading" @click.native="submit" :design="valid ? 'black' : 'disabled'"/>
        </ValidationObserver>
      </div>
        <BaseDivider class="divider"/>
        <BaseTable
          @selected="selectedAgents = $event"
          sort="createdAt"
          :items="agents"
          :columns="[
            { label: 'Name', key: 'name' },
            { label: 'Email', key: 'email' },
            { label: 'Phone', key: 'phone' },
            { label: 'Agent License Number', key: 'agentLicenceNumber' },
            { label: 'Suburb', key: 'suburb' },
            { label: 'State', key: 'state' },
            { label: 'Postcode', key: 'postcode' },
            { label: 'Signed up ', key: 'createdAt', transform: val => $moment(val).format('DD MMM YYYY') },
          ]"
        />
      </BaseCard>
    </div>
  </BaseLayoutCenter>
</template>

<script>
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseLayoutCenter from '@/components/BaseLayoutCenter/BaseLayoutCenter'
import BaseTable from '@/components/BaseTable/BaseTable'
import BaseButton from '@/components/BaseButton/BaseButton'
import BaseFormSelect from '@/components/BaseFormSelect/BaseFormSelect'
import BaseLoader from '@/components/BaseLoader/BaseLoader'
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full'
import { APPROVED, REFUSED, LOCATION_UNAVAILABLE } from '@/constants/seller-registration-status/seller-registration-status'
import UserService from '@/services/Api/services/UserService/UserService'
export default {
  name: 'admin',
  components: {
    BaseText1,
    BaseText4,
    BaseLayoutCenter,
    BaseCard,
    BaseDivider,
    BaseTable,
    BaseButton,
    BaseFormSelect,
    ValidationProvider,
    ValidationObserver,
    BaseLoader
  },
  async created () {
    this.registrationStatusOptions = [
      { title: 'Approved', value: APPROVED },
      { title: 'Refused', value: REFUSED },
      { title: 'Location unavailable', value: LOCATION_UNAVAILABLE }
    ]
    await this.updateAgents()
  },
  data: () => ({
    agents: [],
    selectedAgents: [],
    registrationStatus: null,
    formSubmissionLoading: false,
    contentLoading: true
  }),
  methods: {
    async updateAgents () {
      this.contentLoading = true
      this.agents = await UserService.findPendingSellerRegistrations()
      this.contentLoading = false
    },
    async submit () {
      if (this.formSubmissionLoading) return
      this.formSubmissionLoading = true
      try {
        await Promise.all(this.selectedAgents.map(user => {
          const userId = user.id
          const status = this.registrationStatus
          return UserService.updateSellerRegistrationStatus({ userId, status })
        }))
        await this.updateAgents()
      } catch (error) {
        console.log(error)
        this.$notify({ type: 'error' })
        await this.updateAgents()
      }
      this.formSubmissionLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  width: 100%;
  height: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.divider {
  margin-bottom: 0;
}
.form {
  display: flex;
}
.input {
  margin-right: var(--spacing-2);
}
.button {
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
