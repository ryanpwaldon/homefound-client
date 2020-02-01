<template>
  <canvas class="base-chart"/>
</template>

<script>
import Chart from 'chart.js'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      this.chart = new Chart(this.$el.getContext('2d'), {
        type: 'line',
        data: this.data,
        options: {
          animation: { duration: 0 },
          scales: {
            yAxes: [{ ticks: { display: true, padding: 20, maxTicksLimit: 10 }, gridLines: { drawTicks: false, display: true, drawBorder: false, zeroLineColor: 'rgba(0, 0, 0, 0.1)' } }],
            xAxes: [{ ticks: { display: true, padding: 20 }, gridLines: { drawTicks: false, display: false, drawBorder: false, zeroLineColor: 'rgba(0, 0, 0, 0.1)' } }]
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
.base-chart {
  /* background: var(--color-white-1);
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1); */
}
</style>
