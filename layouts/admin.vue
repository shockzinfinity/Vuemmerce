<template>
  <div>
    <VmHeader></VmHeader>
    <main>
      <nuxt/>
    </main>
  </div>
</template>

<script>
  import VmHeader from '@/components/Header';

  export default {
    name: 'admin',

    components: {
      VmHeader
    }
  }
</script>
