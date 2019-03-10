<template>
  <div :class="'box has-text-left ' + (stock ? 'has-text-danger' : choosed === name ? 'selected' : '')" @click="clickMe">
    <div class="columns is-mobile">
      <div class="column is-10">
        {{ name }}
      </div>
      <div class="column is-2" v-if="stock">
        <i class="fas fa-minus-circle"></i>
      </div>
      <div class="column is-2" v-else-if="choosed === name">
        <i class="fas fa-check-circle"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'stock', 'choosed'],
  model: {
    prop: 'choosed',
    event: 'change'
  },
  methods: {
    clickMe: function () {
      if (this.stock) return ''
      if (this.choosed === this.name) return ''
      this.$emit('change', this.name)
    }
  }
}
</script>

<style scoped>
.box {
  padding: 10px;
}
.selected {
  background-color: #23BCBA;
  color: white;
}
</style>
