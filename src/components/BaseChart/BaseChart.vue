<template>
  <div class="base-chart">
    <div class="header">
      <BaseText6 class="label" v-for="(dataset, i) in datasets" :key="i">
        <div class="color" :style="{ backgroundColor: dataset.pointBorderColor }"/>
        <div class="text">{{ dataset.label }}</div>
      </BaseText6>
    </div>
    <canvas ref="chart" class="chart"/>
  </div>
</template>

<script>
import BaseText6 from '@/components/BaseText6/BaseText6'
import Chart from 'chart.js'
export default {
  components: {
    BaseText6
  },
  props: {
    datasets: {
      type: Array,
      required: true
    }
  },
  mounted () {
    this.initChart()
  },
  data: () => ({
    displayFormats: {
      day: 'MMM DD'
    }
  }),
  methods: {
    initChart () {
      this.chart = new Chart(this.$refs['chart'].getContext('2d'), {
        type: 'line',
        data: { datasets: this.datasets },
        options: {
          animation: { duration: 0 },
          scales: {
            yAxes: [{ ticks: { display: true, padding: 20, maxTicksLimit: 10, min: 0, beginAtZero: true, precision: 0, suggestedMax: 10 }, gridLines: { drawTicks: false, display: true, drawBorder: false, zeroLineColor: 'rgba(0, 0, 0, 0.1)' } }],
            xAxes: [{ ticks: { display: true, padding: 20 }, gridLines: { drawTicks: false, display: false, drawBorder: false, zeroLineColor: 'rgba(0, 0, 0, 0.1)' }, type: 'time', time: { unit: 'day', displayFormats: this.displayFormats, tooltipFormat: 'MMM D' } }]
          },
          layout: { padding: { top: 0, right: 0, bottom: 0, left: 0 } },
          legend: { display: false, align: 'end' }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  margin-bottom: var(--spacing-5);
  > *:not(:last-child) {
    margin-right: var(--spacing-4);
  }
}
.label {
  display: grid;
  padding: var(--spacing-2);
  grid-gap: var(--spacing-2);
  grid-auto-flow: column;
  background: var(--color-gray-1);
  border-radius: var(--border-radius-1);
  align-items: center;
}
.color {
  height: 1em;
  width: 1em;
  border-radius: 100px;
}
</style>
