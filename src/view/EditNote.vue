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
      <div class="note__global_actions">
        <CustomBtn
          @click="saveEdit"
          class="note__btn"
          label="Сохранить изменения"
        />
        <CustomBtn
          @click="resetEdit"
          class="note__btn"
          label="Откатить изменения"
        />
        <router-link to="/">
          <CustomBtn class="note__btn" label="Вернуться к списку" />
        </router-link>
      </div>
      <CustomBtn
        style="margin: 15px auto"
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
      <div class="note__todos">
        <p class="note__todo" v-for="(el, index) in note.data" :key="index">
          <span :class="{ note__todo_id_complete: el.isDone }">{{
            el.id
          }}</span>
          <span
            class="note__todo_text"
            :class="{ note__todo_text_complete: el.isDone }"
            >{{ el.text }}</span
          >
          <span class="note__actions">
            <input type="checkbox" v-model="el.isDone" :id="index" />
            <label
              style="width: 87px"
              v-if="el.isDone"
              class="green"
              :for="index"
              >Сделано</label
            >
            <label v-else class="red" :for="index">Не сделано</label>
            <img
              @click="openDelete(index)"
              src="@/assets/delete.png"
              alt="delete"
            />
            <img
              @click="openEditText(index)"
              src="@/assets/edit.png"
              alt="edit"
            />
          </span>
        </p>
        <EditDialog
          :editTextDialog="editTextDialog"
          :text="editText"
          @changeText="changeText($event)"
          @closeDialog="editTextDialog = false"
          @saveText="saveText"
        />
        <DeleteDialog
          :deleteDialog="deleteDialog"
          @closeDelete="deleteDialog = false"
          @deleteConfirm="deleteConfirm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DeleteDialog from "@/components/Modal/DeleteDialog.vue";
import CustomBtn from "@/components/Btns/CustomBtn.vue";
import router from "@/router";
import EditDialog from "@/components/Modal/EditDialog.vue";
import CreateTodoDialog from "@/components/Modal/CreateTodoDialog.vue";
export default {
  components: { DeleteDialog, CustomBtn, EditDialog, CreateTodoDialog },
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
  &__todos {
    max-width: 1200px;
    margin: 10px auto;
    padding: 10px 20px;
    border: 2px deepskyblue solid;
    background: silver;
  }
  &__todo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &_id_complete {
      text-decoration: line-through;
    }
    &_text {
      max-width: 80%;
      &_complete {
        text-decoration: line-through;
      }
    }
  }
  &__actions {
    display: flex;
    justify-content: space-between;
    width: 185px;
  }
}

img {
  width: 17px;
  height: 17px;
}
</style>
