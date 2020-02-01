<template>
  <div class="performance" v-if="data">
    <BaseCard>
      <BaseText4 class="title" text="Impressions Vs Clicks"/>
      <BaseChart
        :data="{
          labels: Object.keys(data.impressions).map(label => moment(label).format('MMM DD')),
          datasets: [
            {
              label: 'Impressions',
              data: Object.values(data.impressions),
              backgroundColor: Chart.helpers.color('#35a2eb').alpha(0.5).rgbString(),
              borderColor: '#35a2eb',
              borderWidth: 1,
              lineTension: 0
            },
            {
              label: 'Clicks',
              data: Object.values(data.views),
              backgroundColor: Chart.helpers.color('#ff6383').alpha(0.5).rgbString(),
              borderColor: '#ff6383',
              borderWidth: 1,
              lineTension: 0
            }
          ]
        }"
      />
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseChart from '@/components/BaseChart/BaseChart'
import BaseText4 from '@/components/BaseText4/BaseText4'
import ListingService from '@/services/Api/services/ListingService/ListingService'
import Chart from 'chart.js'
import moment from 'moment'
export default {
  name: 'performance',
  components: {
    BaseCard,
    BaseChart,
    BaseText4
  },
  props: {
    listing: {
      type: Object,
      required: true
    }
  },
  async mounted () {
    const [ impressions, views ] = await Promise.all([
      ListingService.findTimeseries(this.listing._id, 'Listing Impression', 'week', 'day'),
      ListingService.findTimeseries(this.listing._id, 'Listing Viewed', 'week', 'day')
    ])
    this.data = { impressions, views }
  },
  data: () => ({
    data: null,
    moment,
    Chart
  })
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: var(--spacing-5);
}
</style>
