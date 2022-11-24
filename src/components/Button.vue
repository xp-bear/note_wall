<template>
  <button :class="[size, nom]" class="default-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
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
  text-align: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 0 3px #ccc;
}
// size
.max {
  min-width: 100px;
  height: 48px;
  border-radius: 24px;
  padding: 0 20px;
  line-height: 48px;
}
.base {
  min-width: 82px;
  height: 36px;
  border-radius: 24px;
  padding: 0 20px;
  line-height: 36px;
}
.small {
  min-width: 72px;
  height: 32px;
  border-radius: 24px;
  padding: 0 20px;
  line-height: 32px;
}
// nom
.primary {
  background: @gray-1;
  color: @gray-10;
}
.secondary {
  background: @gray-10;
  color: @gray-1;
  border: 1px solid @gray-1;
}
.cprimary {
  background: @primary-color;
  color: @gray-10;
  font-weight: 600;
}
.csecondary {
  background: @gray-10;
  color: @gray-1;
}
.notallowed {
  opacity: 0.6;
  cursor: not-allowed;
  font-family: "xp";
}
</style>
