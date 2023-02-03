<template>
  <CustomDialog :show="createTodoDialog">
    <p>Название todo</p>
    <form @submit.prevent="$emit('addTodo')">
      <input
        class="todo__input"
        type="text"
        :value="todo"
        @input="$emit('changeTodo', $event.target.value)"
        placeholder="Введите название todo"
      />
      <div class="dialog__actions">
        <CustomBtn type="submit" label="Создать" />
        <CustomBtn @click="$emit('closeCreateTodoDialog')" label="Отмена" />
      </div>
    </form>
  </CustomDialog>
</template>

<script>
import CustomBtn from "../Btns/CustomBtn.vue";
import CustomDialog from "./CustomDialog.vue";
export default {
  props: ["todo", "createTodoDialog"],
  components: { CustomDialog, CustomBtn },
};
</script>

<style lang="scss" scoped>
.dialog {
  &__actions {
    display: flex;
    justify-content: space-between;
    margin: 20px auto;
  }
}
</style>
