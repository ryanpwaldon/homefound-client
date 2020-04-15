<template>
  <div class="performance">
    <BaseLoader class="loader" text="Loading content" v-if="loading"/>
    <template v-else>
      <BaseCard v-if="!success">
        <BaseText5 text="No data available"/>
      </BaseCard>
      <BaseCard v-else>
        <BaseText4 class="title" text="Engagement"/>
        <BaseDivider/>
        <div class="totals">
          <div class="metric">
            <BaseText6 class="label" text="Impressions"/>
            <div class="value">{{ sum(impressions) }}</div>
          </div>
          <div class="metric">
            <BaseText6 class="label" text="Clicks"/>
            <div class="value">{{ sum(views) }}</div>
          </div>
          <div class="metric">
            <BaseText6 class="label" text="CTR"/>
            <div class="value">{{ ctr | numeral('0.[0]%') }}</div>
          </div>
          <div class="metric">
            <BaseText6 class="label" text="Contact Detail Clicks"/>
            <div class="value">{{ sum(contactDetailViews) }}</div>
          </div>
        </div>
        <BaseDivider/>
        <BaseChart
          :datasets="[
            {
              label: 'Impressions',
              data: Object.entries(impressions).map(([date, count]) => ({ x: date, y: count })),
              backgroundColor: Chart.helpers.color('#d7d7d7').alpha(0).rgbString(),
              borderColor: '#d7d7d7',
              pointBackgroundColor: '#ffffff',
              pointBorderColor: '#d7d7d7',
              pointRadius: 4,
              borderWidth: 2,
              lineTension: 0.2
            },
            {
              label: 'Clicks',
              data: Object.entries(views).map(([date, count]) => ({ x: date, y: count })),
              backgroundColor: Chart.helpers.color('#4dadf7').alpha(0).rgbString(),
              borderColor: '#4dadf7',
              pointBackgroundColor: '#ffffff',
              pointBorderColor: '#4dadf7',
              pointRadius: 4,
              borderWidth: 2,
              lineTension: 0.2
            }
          ]"
        />
      </BaseCard>
    </template>
  </div>
</template>

<script>
import BaseLoader from '@/components/BaseLoader/BaseLoader'
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseChart from '@/components/BaseChart/BaseChart'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseText5 from '@/components/BaseText5/BaseText5'
import BaseText6 from '@/components/BaseText6/BaseText6'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import ListingPerformanceService from '@/services/Api/services/ListingPerformanceService/ListingPerformanceService'
import Chart from 'chart.js'
import moment from 'moment'
export default {
  name: 'performance',
  components: {
    BaseLoader,
    BaseCard,
    BaseChart,
    BaseText4,
    BaseText5,
    BaseText6,
    BaseDivider
  },
  props: {
    listing: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.fetchData()
  },
  data: () => ({
    data: null,
    impressions: null,
    views: null,
    contactDetailViews: null,
    success: false,
    loading: true,
    moment,
    Chart
  }),
  computed: {
    ctr () {
      return (this.sum(this.views) / this.sum(this.impressions)) || 0
    }
  },
  methods: {
    async fetchData () {
      try {
        const { impressions, views, contactDetailViews } = await this.fetchTimeseries({
          properties: ['impressions', 'views', 'contactDetailViews'],
          range: 7,
          period: 'day'
        })
        this.impressions = impressions
        this.views = views
        this.contactDetailViews = contactDetailViews
        this.success = true
      } catch (err) {
        console.log(err)
        this.success = false
      }
      this.loading = false
    },
    fetchTimeseries ({ properties, range, period }) {
      return ListingPerformanceService.findTimeseriesByListingId({ listingId: this.listing._id, properties, range, period })
    },
    sum (timeseries) {
      return Object.values(timeseries).reduce((sum, value) => sum + value, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.performance {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.totals {
  display: flex;
  > *:not(:last-child) {
    padding-right: var(--spacing-5);
    margin-right: var(--spacing-5);
    border-right: 1px solid var(--color-gray-1);
  }
}
.metric {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.label {
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-2);
}
.value {
  font-size: 3.6rem;
}
.loader {
  width: 100%;
  height: 100%;
}
</style>
