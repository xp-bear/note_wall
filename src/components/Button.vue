<template>
  <button :class="[size, nom]" class="default-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "",
  props: {
    size: {
      default: "base",
    },
    nom: {
      default: "primary",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.default-button {
}
// size
.max {
  min-width: 100px;
  height: 48px;
  border-radius: 24px;
  padding: 0 20px;
}
.base {
  min-width: 82px;
  height: 36px;
  border-radius: 24px;
  padding: 0 20px;
}
.small {
  min-width: 72px;
  height: 32px;
  border-radius: 24px;
  padding: 0 20px;
}
// nom

</style>
