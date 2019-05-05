<template>
  <div>
    <VmHero></VmHero>
    <VmProductsList></VmProductsList>
  </div>
</template>

<script>
import VmProductsList from '@/components/ProductsListContainer';
import VmHero from '@/components/Hero';

export default {
  name: 'index',
  components: {
    VmProductsList,
    VmHero
  }
};
</script>
