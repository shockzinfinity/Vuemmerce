<template>
  <div class="columns is-centered is-multiline">
    <div class="card column is-one-quarter" v-for="product in productList" :key="product._id">
      <VmProducts :product="product"></VmProducts>
    </div>
    <div class="section" v-if="productList.length === 0">
      <p>{{ noProductLabel }}</p>
    </div>
  </div>
</template>

<script>
import VmProducts from '../Products';
import { getByTitle } from '@/assets/filters';

export default {
  name: 'productsList',

  components: { VmProducts },

  data () {
    return {
      id: '',
      noProductLabel: 'No product found',
      productsFiltered: [],
      productList: []
    }
  },

  mounted () {
    this.getProductsFromAPI();
  },

  methods: {
    getProductByTitle () {
      let
        listOfProducts = this.$store.state.products,
        titleSearched = this.$store.state.userInfo.productTitleSearched;

      return this.productsFiltered = getByTitle(listOfProducts, titleSearched);
    },
    getProductsFromAPI () {
      this.$axios.get('/api/', {

      }).then((response) => {
        response.data.forEach(element => {
          this.productList.push(element);
        });
      })
      .catch((e) => {
        console.error(e);
      });
    }
  }

};
</script>

<style lang="scss" scoped>
  .card {
    margin: 10px;
  }
</style>
