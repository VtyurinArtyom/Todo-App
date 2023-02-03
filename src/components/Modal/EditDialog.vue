<template>
  <CustomDialog :show="editTextDialog">
    <div class="dialog">
      <div class="dialog__input">
        <label for="text">Изменить текст</label>
        <input
          type="text"
          :value="text"
          @input="$emit('changeText', $event.target.value)"
        />
      </div>
      <div class="dialog__actions">
        <CustomBtn @click="$emit('saveText')" label="Сохранить" />
        <CustomBtn @click="$emit('closeDialog')" label="Отмена" />
      </div>
    </div>
  </CustomDialog>
</template>

<script>
import CustomBtn from "../Btns/CustomBtn.vue";
import CustomDialog from "./CustomDialog.vue";
export default {
  props: ["editTextDialog", "text"],
  components: { CustomBtn, CustomDialog },
};
</script>

<style lang="scss" scoped>
label {
  margin-right: 15px;
}
.dialog {
  padding: 15px;
  &__input {
    margin-bottom: 20px;
  }
  &__actions {
    display: flex;
    justify-content: space-around;
  }
}
</style>
