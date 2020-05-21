<script>
export default {
  mounted () {
    document.documentElement.classList.add('full-window-layout')
  },
  beforeDestroy () {
    document.documentElement.classList.remove('full-window-layout')
  },
  render: () => null
}
</script>

<style lang="scss">
html.full-window-layout {
  &,
  body,
  #app {
    height: 100%;
    overflow: hidden;
  }
}
</style>
