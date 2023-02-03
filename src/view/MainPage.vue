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
      <div class="notes__items">
        <div class="notes__item" v-for="(el, index) in notes" :key="index">
          <h3>{{ el.title }}</h3>
          <DeleteDialog
            :deleteDialog="deleteDialog"
            @closeDelete="deleteDialog = false"
            @deleteConfirm="deleteConfirm"
          />
          <div class="notes__item_actions">
            <p style="cursor: pointer" @click="openDelete(index)">Удалить</p>
            <router-link style="text-decoration: none; color: black" to="/edit">
              <p @click="saveIndex(index)">Отредактировать</p>
            </router-link>
          </div>
          <p class="notes__todo" v-for="(elem, ind) in el.data" :key="ind">
            <span :class="{ notes__todo_text_complete: elem.isDone }">{{
              elem.id
            }}</span>
            <span
              class="notes__todo_text"
              :class="{ notes__todo_text_complete: elem.isDone }"
              >{{ elem.text }}</span
            >
            <span class="red" v-if="!elem.isDone">Не сделано</span>
            <span class="green" style="width: 87px" v-else>Сделано</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomBtn from "@/components/Btns/CustomBtn.vue";
import CreateNoteDialog from "@/components/Modal/CreateNoteDialog.vue";
import DeleteDialog from "@/components/Modal/DeleteDialog.vue";
export default {
  components: { CustomBtn, CreateNoteDialog, DeleteDialog },
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
      this.notes = this.notes.splice(this.editedId, 1);
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
  &__items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  &__item {
    border: 1px white solid;
    margin: 20px 10px;
    max-width: 460px;
    padding: 15px;
    min-width: 43%;
    &_actions {
      display: flex;
      justify-content: space-around;
    }
  }
  &__todo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &_text {
      text-overflow: ellipsis;
      max-width: 200px;
      overflow: hidden;
      white-space: nowrap;
      margin: 0 10px;
      &_complete {
        text-decoration: line-through;
      }
    }
  }
}
</style>
