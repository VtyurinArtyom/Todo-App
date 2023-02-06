<template>
  <div class="dialog__mask" v-if="show">
    <div class="dialog_container">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.dialog__mask {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
  top: 0;
  left: 0;
}
.dialog_container {
  background: white;
  border-radius: 20px;
  padding: 20px;
  max-height: 80vh;
  max-width: 80vh;
  margin-top: 20px;
  scrollbar-width: 0px;
  overflow-y: scroll;
}
.dialog_container::-webkit-scrollbar {
  width: 0px;
}
</style>
