<template>
  <div>
    Filter
    <div>
        <hr class="sf-divider" />
    </div>
    Category
    <div>
        <button>Taxi</button>
        <button>Metro</button>
        <button>Bike Rentals</button>
        <button>City Buses</button>
        <button>Parking</button>
        <button>Bicycle</button>
        <button>Water Metro</button>
        <button>Parking Space</button>
        <button>EV Charging</button>
        <button>Toll Fee</button>
    </div>
    Other
  </div>
</template>

<script>
export default {
  name: 'Filterpage',
  props: {
    enable: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
