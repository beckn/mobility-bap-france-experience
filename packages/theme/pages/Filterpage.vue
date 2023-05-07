<template>
  <div>
    Filtre
    <div>
        <hr class="sf-divider" />
    </div>
    Catégorie
    <div>
        <button>Taxi</button>
        <button>Métro</button>
        <button>Location de vélos</button>
        <button>Bus de la ville</button>
        <button>Parking</button>
        <button>Vélo</button>
        <button>Water Metro</button>
        <button>Place de parking</button>
        <button>Charge EV</button>
        <button>Péage</button>
    </div>
    Autre
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
