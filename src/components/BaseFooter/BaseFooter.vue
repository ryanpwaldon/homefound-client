<template>
  <div class="base-footer">
    <div class="content">
      <div class="col col-1">
        <router-link class="logo-container" to="/">
          <img class="logo" src="@/assets/img/logo-1.svg">
          <div class="logo-title">Homefound</div>
        </router-link>
        <div class="logo-subcopy">Discover properties before the crowd.</div>
        <div class="logo-subcopy">© {{ (new Date()).getFullYear() }} Homefound.</div>
      </div>
      <div class="col col-2">
        <div class="heading">Info</div>
        <div class="link">Buyers</div>
        <div class="link">Agents</div>
        <div class="link">Pricing</div>
        <div class="link">FAQs</div>
      </div>
      <div class="col col-3">
        <div class="heading">Links</div>
        <div class="link">Login</div>
        <div class="link">Sign up</div>
      </div>
      <div class="col col-4">
        <div class="heading">Legal</div>
        <div class="link">Terms</div>
        <div class="link">Privacy</div>
      </div>
      <div class="col col-5">
        <div class="heading">Help</div>
        <div class="link">Email us</div>
        <div class="link">Send us a message</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.base-footer {
  width: 100%;
  padding: 0 var(--spacing-5);
  background: var(--color-white-1);
  border-top: var(--color-gray-1) solid 1px;
  display: flex;
  justify-content: center;
}
.content {
  width: 100%;
  max-width: 90rem;
  padding: 10rem 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.heading {
  font-size: 1.4rem;
  font-weight: var(--font-weight-medium);
}
.link {
  font-size: 1.4rem;
}
.col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > *:not(:last-child) {
    margin-bottom: var(--spacing-4);
  }
}
.col-1 {
  > *:not(:last-child) {
    margin-bottom: var(--spacing-2);
  }
  .logo-container {
    display: flex;
    align-items: center;
  }
  .logo {
    height: 25px;
    margin-right: var(--spacing-2);
  }
  .logo-title {
    font-weight: var(--font-weight-medium);
    font-size: 1.4rem;
  }
  .logo-subcopy {
    font-size: 1.2rem;
    color: var(--color-gray-6);
  }
}
</style>
