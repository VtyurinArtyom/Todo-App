<template>
  <CustomDialog :show="deleteDialog">
    <div class="dialog">
      <p>Вы действительно хотите удалить?</p>
      <div class="dialog__actions">
        <CustomBtn @click="$emit('deleteConfirm')" label="Да" />
        <CustomBtn @click="$emit('closeDelete')" label="Нет" />
      </div>
    </div>
  </CustomDialog>
</template>

<script>
import CustomBtn from "../Btns/CustomBtn.vue";
import CustomDialog from "./CustomDialog.vue";
export default {
  props: {
    deleteDialog: Boolean,
  },
  components: { CustomDialog, CustomBtn },
  methods: {
    closeDelete() {
      this.$emit("closeDelete");
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  vertical-align: center;
}
.dialog__actions {
  display: flex;
  justify-content: space-around;
}
</style>
