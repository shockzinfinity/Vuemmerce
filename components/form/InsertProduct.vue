<template>
  <form>
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" type="text" v-model="title" placeholder="Title">
      </div>
    </div>
    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea class="textarea" v-model="description" placeholder="Description"></textarea>
      </div>
    </div>
    <div class="field">
      <label class="label">Price</label>
      <div class="control">
        <input class="input" type="text" v-model="price" placeholder="Price">
      </div>
    </div>
    <div class="field">
      <label class="label">Quantity</label>
      <div class="control">
        <input class="input" type="text" v-model="quantity" placeholder="Quantity">
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button type="button" @click="saveProduct" class="button is-link">Salva</button>
      </div>
    </div>
    {{ messageResponse }}
  </form>
</template>

<script>
export default {
  name: 'insertProduct',
  data () {
    return ({
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


