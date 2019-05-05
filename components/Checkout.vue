<template>
	<div>
		<div>
      <div class="box" v-for="product in products" :key="product.id">
        <button class="is-pulled-right button is-info is-inverted" @click="removeFromCart(product.id)">{{ removeLabel }}</button>
        <p>{{ product.title }}  {{ product.quantity > 0 ?  ` - Quantity: ${product.quantity}` : ''}}</p>
        <p>{{ product.price }} &euro;</p>
      </div>
      <div v-if="products.length === 0">
        <p>{{ cartEmptyLabel }}</p>
      </div>
    </div>
	</div>
</template>

<script>
export default {
	name: 'checkout',

	data () {
		return {
			removeLabel: 'Remove from cart',
			cartEmptyLabel: 'Your cart is empty'
		}
	},

	computed: {
    products () {
      return this.$store.getters.productsAdded;
    },
    buyLabel () {
      let
        totalProducts = this.products.length,
        productsAdded = this.$store.getters.productsAdded,
        pricesArray = [],
        productLabel = '',
        finalPrice = '',
        quantity = 1;

      productsAdded.forEach(product => {

        if (product.quantity >= 1) {
          quantity = product.quantity;
        }

        pricesArray.push((product.price * quantity)); // get the price of every product added and multiply quantity
      });

      finalPrice = pricesArray.reduce((a, b) => a + b, 0); // sum the prices

      if (totalProducts > 1) { // set plural or singular
        productLabel = 'products';
      } else {
        productLabel = 'product';
      }
      return `Buy ${totalProducts} ${productLabel} at ${finalPrice}€`;
		},
		isUserLoggedIn () {
			return this.$store.getters.isUserLoggedIn;
		}
	},

	methods: {
		removeFromCart (id) {
			let data = {
					id: id,
					status: false
			}
			this.$store.commit('removeFromCart', id);
			this.$store.commit('setAddedBtn', data);
		},
		onNextBtn () {
			if (this.isUserLoggedIn) {
				this.isCheckoutSection = true;
			} else {
				this.$store.commit('showCheckoutModal', false);
				this.$store.commit('showLoginModal', true);
			}
		},
		onPrevBtn () {
			this.isCheckoutSection = false;
		}
	}
}
</script>

