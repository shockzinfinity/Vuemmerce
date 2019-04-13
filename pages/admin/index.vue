<template>
  <div>
    <InsertProductForm></InsertProductForm>
  </div>
</template>

<script>
  import InsertProductForm from '@/components/form/InsertProduct';
  export default {
    name: 'dashboard',
    layout: 'admin',
    components: {
      InsertProductForm
    }
  }
</script>

<style lang="scss" scoped>

</style>

