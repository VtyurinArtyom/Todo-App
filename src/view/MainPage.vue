<template>
  <div>
    <h1>TODO заметки</h1>
    <CustomBtn @click="createDialog = true" label="Создать заметку" />
    <CreateNoteDialog
      :createDialog="createDialog"
      @closeCreateDialog="createDialog = false"
      @createNote="createNote"
      @addTodo="addTodo(id++)"
      :noteTitle="noteTitle"
      @changeNoteTitle="changeNoteTitle($event)"
      :todo="todo"
      @changeTodo="changeTodo($event)"
      :todoList="todoList"
    />
    <div class="notes">
      <h2>Всего заметок: {{ notes.length }}</h2>
      <DeleteDialog
        :deleteDialog="deleteDialog"
        @closeDelete="deleteDialog = false"
        @deleteConfirm="deleteConfirm"
      />
      <NotesItem
        :notes="notes"
        @openDelete="openDelete"
        @saveIndex="saveIndex"
      />
    </div>
  </div>
</template>

<script>
import CustomBtn from "@/components/Btns/CustomBtn.vue";
import CreateNoteDialog from "@/components/Modal/CreateNoteDialog.vue";
import DeleteDialog from "@/components/Modal/DeleteDialog.vue";
import NotesItem from "@/components/MainPage/NotesItem.vue";
export default {
  components: { CustomBtn, CreateNoteDialog, DeleteDialog, NotesItem },
  name: "MainPage",
  data() {
    return {
      noteTitle: "",
      todo: "",
      todoList: [],
      id: 0,
      isDone: false,
      editedItem: {},
      createDialog: false,
      notes: [],
      editedId: -1,
      deleteDialog: false,
    };
  },
  mounted() {
    if (JSON.parse(localStorage.getItem("noteList")) !== null) {
      this.notes = JSON.parse(localStorage.getItem("noteList"));
    }
  },
  methods: {
    changeNoteTitle(text) {
      this.noteTitle = text;
    },
    changeTodo(text) {
      this.todo = text;
    },
    addTodo() {
      if (this.todo) {
        this.todoList.push({
          text: this.todo,
          id: this.id,
          isDone: this.isDone,
        });
        this.todo = "";
      }
    },
    createNote() {
      if (
        localStorage.getItem("noteList") == null &&
        this.noteTitle &&
        this.todoList.length
      ) {
        localStorage.setItem(
          "noteList",
          JSON.stringify([{ title: this.noteTitle, data: this.todoList }])
        );
        this.id = 0;
        this.todo = "";
        this.noteTitle = "";
        this.todoList = [];
        this.notes = JSON.parse(localStorage.getItem("noteList"));
        this.createDialog = false;
      } else if (
        localStorage.getItem("noteList") &&
        this.noteTitle &&
        this.todoList.length
      ) {
        const el = JSON.parse(localStorage.getItem("noteList"));
        el.push({ title: this.noteTitle, data: this.todoList });
        localStorage.setItem("noteList", JSON.stringify(el));
        this.id = 0;
        this.todo = "";
        this.noteTitle = "";
        this.todoList = [];
        this.notes = JSON.parse(localStorage.getItem("noteList"));
        this.createDialog = false;
      }
    },
    saveIndex(index) {
      localStorage.setItem("editedIndex", index);
    },
    openDelete(index) {
      this.editedId = index;
      this.deleteDialog = true;
    },
    deleteConfirm() {
      this.notes.splice(this.editedId, 1);
      localStorage.setItem("noteList", JSON.stringify(this.notes));
      this.deleteDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.todo__input {
  margin-right: 20px;
}
.list {
  max-width: 1200px;
  border: 2px solid green;
  margin: 20px auto;
  border-radius: 5px;
  background-color: bisque;

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 20px;
    &__actions {
      display: flex;
      align-items: center;
    }
  }
  &__id {
    color: black;
  }
  &__text {
    margin: 0px 13px;
  }
  .icon {
    width: 20px;
    height: 20px;
    margin: 0 5 px;
  }
}
h3 {
  margin-top: 0px;
}
.notes {
  max-width: 1200px;
  border: 2px green solid;
  margin: 20px auto;
  background: bisque;
}
</style>
