<template>
  <div class="section">
    <div class="card is-clearfix columns">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ params.title }}</p>
          </div>
          <div>
            <!-- <button class="button is-small" :title="removeFromFavouriteLabel" v-show="params.isFavourite" @click="removeFromFavourite(params.id)">
              <span class="icon is-small">
                <i class="fa fa-heart"></i>
              </span>
            </button>
            <button class="button is-small" :title="addToFavouriteLabel" v-show="!params.isFavourite" @click="saveToFavorite(params.id)">
              <span class="icon is-small">
                <i class="fa fa-heart-o"></i>
              </span>
            </button> -->
          </div>
        </div>
        <div class="content is-clearfix">
          <p>{{ params.description }}</p>
          <div class="is-pulled-left">
            <!-- <i v-if="params.ratings === 1" class="fa fa-star"></i>
            <i v-if="params.ratings === 2" class="fa fa-star"></i>
            <i v-if="params.ratings === 2" class="fa fa-star"></i>
            <i v-if="params.ratings === 3" class="fa fa-star"></i>
            <i v-if="params.ratings === 3" class="fa fa-star"></i>
            <i v-if="params.ratings === 3" class="fa fa-star"></i>
            <i v-if="params.ratings === 4" class="fa fa-star"></i>
            <i v-if="params.ratings === 4" class="fa fa-star"></i>
            <i v-if="params.ratings === 4" class="fa fa-star"></i>
            <i v-if="params.ratings === 4" class="fa fa-star"></i>
            <i v-if="params.ratings === 5" class="fa fa-star"></i>
            <i v-if="params.ratings === 5" class="fa fa-star"></i>
            <i v-if="params.ratings === 5" class="fa fa-star"></i>
            <i v-if="params.ratings === 5" class="fa fa-star"></i>
            <i v-if="params.ratings === 5" class="fa fa-star"></i>
            <p>{{ params.reviews > 0 ? `${params.reviews} Reviews` : 'No reviews' }}</p> -->
          </div>
          <p class="is-pulled-right">
            <span class="title is-4"><strong>&euro; {{ params.price }}</strong></span>
          </p>
        </div>
        <div class="card-footer btn-actions">
          <!-- <div class="card-footer-item field is-grouped">
            <div class="buttons">
              <button class="button is-primary" v-if="!params.isAddedToCart" @click="addToCart(params.id)">{{ addToCartLabel }}</button>
              <button class="button is-text" v-if="params.isAddedToCart" @click="removeFromCart(params.id, false)">{{ removeFromCartLabel }}</button>
            </div>
            <div class="select is-rounded is-small">
              <select @change="onSelectQuantity(params.id)" v-model="selected">
                <option v-for="quantity in quantityArray" :value="quantity">{{ quantity }}</option>
              </select>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'params_detail-id',

  validate ({ query }) {
    console.log(query)
    return /^\d+$/.test(query.id)
  },

  data () {
    return {
      addToCartLabel: 'Add to cart',
      removeFromCartLabel: 'Remove from cart',
      addToFavouriteLabel: 'Add to favourite',
      removeFromFavouriteLabel: 'Remove from favourite'
    }
  },

  mounted () {
    console.log(this.$route.query)
  },

  computed: {
    /* isAddedBtn () {
      return this.params.isAddedBtn;
    } */
  },

  methods: {
    /* addToCart (id) {
      let data = {
        id: id,
        status: true
      }
      this.$store.commit('addToCart', id);
      this.$store.commit('setAddedBtn', data);
    },
    removeFromCart (id) {
      let data = {
        id: id,
        status: false
      }
      this.$store.commit('removeFromCart', id);
      this.$store.commit('setAddedBtn', data);
    }, */
    /* onSelectQuantity (id) {
      let data = {
        id: id,
        quantity: this.selected
      }
      this.$store.commit('quantity', data);
    },
    saveToFavorite (id) {
      let isUserLogged = this.$store.state.userInfo.isLoggedIn;

      if (isUserLogged) {
        this.$store.commit('addToFavourite', id);
      } else {
        this.$store.commit('showLoginModal', true);
      }
    },
    removeFromFavourite (id) {
      this.$store.commit('removeFromFavourite', id);
    } */
  }
}
</script>

<style lang="scss" scoped>
  .card-content {
    padding: 15px 10px 15px 0;

    &__text {
      margin: 15px 0;
    }
    &__reviews {
      display: inline-block;
      width: 100%;
      margin-bottom: 10px;
    }
  }
</style>

