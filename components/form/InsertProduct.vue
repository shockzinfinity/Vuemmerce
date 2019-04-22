<template>
  <div class="container">
    <form>
      <div class="field">
        <label class="label">{{ titleLabel }}</label>
        <div class="control">
          <input class="input" type="text" v-model="title" placeholder="Title">
        </div>
      </div>
      <div class="field">
        <label class="label">{{ descriptionLabel }}</label>
        <div class="control">
          <textarea class="textarea" v-model="description" placeholder="Description"></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">{{ priceLabel }}</label>
        <div class="control">
          <input class="input" type="text" v-model="price" placeholder="Price">
        </div>
      </div>
      <div class="field">
        <label class="label">{{ quantityLabel }}</label>
        <div class="control">
          <input class="input" type="text" v-model="quantity" placeholder="Quantity">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button type="button" @click="saveProduct" class="button is-link">{{ saveLabel }}</button>
        </div>
      </div>
      {{ messageResponse }}
    </form>
  </div>
</template>

<script>
export default {
  name: 'insertProduct',

  data () {
    return ({
      titleLabel: 'Title',
      descriptionLabel: 'Description',
      priceLabel: 'Price',
      quantityLabel: 'Quantity',
      saveLabel: 'Save',
      title: '',
      description: '',
      quantity: null,
      price: null,
      messageResponse: ''
    })
  },

  methods: {
    saveProduct () {
      this.$axios.post('/api/save_product', {
        title: this.title,
        description: this.description,
        quantity: this.quantity,
        price: this.price
      }).then((response) => {
        if (response.statusText === 'OK') {
          this.messageResponse = response.data.message;
        }
      })
      .catch((e) => {
        console.error(e)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding: 20px;
  }
</style>
