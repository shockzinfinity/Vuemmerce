<template>
  <div>
    <VmHeader></VmHeader>
    <main>
      <nuxt/>
      <VmModal></VmModal>
    </main>
    <VmFooter></VmFooter>
  </div>
</template>

<script>
import VmHeader from '@/components/Header';
import VmFooter from '@/components/Footer';
import VmModal from '@/components/Modal';

export default {
  components: {
    VmHeader,
    VmFooter,
    VmModal
  }
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
