<template>
  <header class="gw-header">
    <h1 class="logo-text">GOGOYOON 그룹웨어2</h1>
  </header>
</template>

<script>
export default {
  name: 'GwHeader',
}
</script>

<style scoped>
.gw-header {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: #bfa7a7;
  color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-radius: 10px 10px 0 0;
  height: 78px;
}

.logo-text {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}
</style>