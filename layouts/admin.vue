<template>
  <div>
    <VmHeader></VmHeader>
    <main>
      <nuxt/>
    </main>
  </div>
</template>

<script>
  import VmHeader from '@/components/header/Header';
  export default {
    name: 'admin',
    components: {
      VmHeader
    }
  }
</script>
