<template>
  <CustomDialog :show="createDialog">
    <p>Название заметки</p>
    <input
      type="text"
      placeholder="Название"
      :value="noteTitle"
      @input="$emit('changeNoteTitle', $event.target.value)"
    />
    <p style="margin-bottom: 0px">Название todo</p>
    <form @submit.prevent="$emit('addTodo')">
      <input
        class="todo__input"
        type="text"
        :value="todo"
        @input="$emit('changeTodo', $event.target.value)"
        placeholder="Введите название todo"
      />
      <CustomBtn type="submit" label="Создать" />
    </form>
    <p class="todo__item" v-for="(el, index) in todoList" :key="index">
      <span>{{ index + 1 }}</span>
      <span style="margin: 0 15px">{{ el.text }}</span>
      <span class="todo__item__actions">
        <span class="red" style="margin: 0 10px">Не сделано</span>
      </span>
    </p>
    <div class="todo__actions">
      <CustomBtn @click="$emit('createNote')" label="Сохранить" />
      <CustomBtn @click="$emit('closeCreateDialog')" label="Отменить" />
    </div>
  </CustomDialog>
</template>

<script>
import CustomBtn from "../Btns/CustomBtn.vue";
import CustomDialog from "./CustomDialog.vue";
export default {
  components: { CustomDialog, CustomBtn },
  props: ["noteTitle", "todo", "todoList", "createDialog"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.icon {
  width: 20px;
  height: 20px;
}
.todo {
  &__input {
    margin: 15px;
  }
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__actions {
      display: flex;
      align-items: center;
    }
  }
  &__actions {
    display: flex;
    justify-content: space-around;
  }
}

.dialog__inactive {
  display: none;
}
.create__dialog__inactive {
  display: none !important;
}
</style>
