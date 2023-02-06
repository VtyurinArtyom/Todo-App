<template>
  <div>
    <h1>TODO list</h1>
    <div class="note">
      <h2 class="note__title">
        {{ note.title }}
        <img @click="openEditTitleDialog" src="@/assets/edit.png" alt="edit" />
      </h2>
      <EditDialog
        :editTextDialog="editTitleDialog"
        :text="editText"
        @changeText="changeTitle($event)"
        @closeDialog="editTitleDialog = false"
        @saveText="saveTitle"
      />
      <EditNoteAcions
        class="note__global_actions"
        @saveEdit="saveEdit"
        @resetEdit="resetEdit"
      />
      <CustomBtn
        class="addBtn"
        @click="createTodoDialog = true"
        label="Добавить todo"
      />
      <CreateTodoDialog
        :createTodoDialog="createTodoDialog"
        :todo="newTodo"
        @changeTodo="changeTodo($event)"
        @addTodo="addTodo"
        @closeCreateTodoDialog="createTodoDialog = false"
      />
      <NoteTodos
        :note-data="note.data"
        :edit-text="editText"
        :edit-text-dialog="editTextDialog"
        :delete-dialog="deleteDialog"
        @openEditText="openEditText"
        @openDelete="openDelete"
        @changeText="changeText($event)"
        @saveText="saveText"
        @closeDialog="editTextDialog = false"
        @closeDelete="deleteDialog = false"
        @deleteConfirm="deleteConfirm"
      />
    </div>
  </div>
</template>

<script>
import CustomBtn from "@/components/Btns/CustomBtn.vue";
import router from "@/router";
import EditDialog from "@/components/Modal/EditDialog.vue";
import CreateTodoDialog from "@/components/Modal/CreateTodoDialog.vue";
import EditNoteAcions from "@/components/EditNotePage/EditNoteAcions.vue";
import NoteTodos from "@/components/EditNotePage/NoteTodos.vue";
export default {
  components: {
    CustomBtn,
    EditDialog,
    CreateTodoDialog,
    EditNoteAcions,
    NoteTodos,
  },
  name: "EditNote",
  data() {
    return {
      note: {},
      deleteDialog: false,
      editedIndex: -1,
      editedItem: {},
      editTextDialog: false,
      editText: "",
      editTitleDialog: false,
      createTodoDialog: false,
      newTodo: "",
    };
  },
  methods: {
    changeTitle(text) {
      this.editText = text;
    },
    openEditTitleDialog() {
      this.editText = this.note.title;
      this.editTitleDialog = true;
    },
    saveTitle() {
      if (this.editText) {
        this.note.title = this.editText;
        this.editTitleDialog = false;
      }
    },
    addTodo() {
      if (this.newTodo) {
        const el = {
          id: this.note.data.length + 1,
          text: this.newTodo,
          isDone: false,
        };
        this.note.data.push(el);
        this.createTodoDialog = false;
      }
    },
    changeTodo(text) {
      this.newTodo = text;
    },
    openDelete(index) {
      this.editedIndex = index;
      this.deleteDialog = true;
    },
    deleteConfirm() {
      this.note.data.splice(this.editedIndex, 1);
      this.deleteDialog = false;
    },
    openEditText(index) {
      this.editedIndex = index;
      this.editText = this.note.data[index].text;
      this.editTextDialog = true;
    },
    changeText(text) {
      this.editText = text;
    },
    saveText() {
      if (this.editText) {
        this.note.data[this.editedIndex].text = this.editText;
        this.editTextDialog = false;
      }
    },
    resetEdit() {
      const el = JSON.parse(localStorage.getItem("noteList"));
      const index = localStorage.getItem("editedIndex");
      this.note = el[index];
    },
    saveEdit() {
      const ind = localStorage.getItem("editedIndex");
      const el = JSON.parse(localStorage.getItem("noteList"));
      el.splice(ind, 1);
      el.push(this.note);
      localStorage.setItem("noteList", JSON.stringify(el));
      router.push("/");
    },
  },
  mounted() {
    this.resetEdit();
  },
};
</script>

<style lang="scss" scoped>
.note {
  &__global_actions {
    display: flex;
    justify-content: space-between;
    margin: 10px auto;
    max-width: 1200px;
  }
  &__btn {
    margin: 0 10px;
  }
}
.addBtn {
  margin: 15px auto;
}
img {
  width: 17px;
  height: 17px;
}
</style>
