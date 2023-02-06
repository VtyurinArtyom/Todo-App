<template>
  <CustomDialog :show="createDialog">
    <p>Название заметки</p>
    <input
      type="text"
      placeholder="Название"
      :value="noteTitle"
      @input="$emit('changeNoteTitle', $event.target.value)"
    />
    <p class="todo_title">Название todo</p>
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
      <span class="todo__item_text">{{ el.text }}</span>
      <span class="todo__item__actions">
        <span class="red todo__item__actions_incomplete">Не сделано</span>
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
  props: {
    noteTitle: String,
    todo: String,
    todoList: Array,
    createDialog: Boolean,
  },
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
  &_title {
    margin-bottom: 0;
  }
  &__input {
    margin: 15px;
  }
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &_text {
      margin: 0 15px;
    }
    &__actions {
      display: flex;
      align-items: center;
      &_incomplete {
        margin: 0 10px;
      }
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
