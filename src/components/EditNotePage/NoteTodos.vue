<template>
  <div class="note__todos">
    <p class="note__todo" v-for="(el, index) in noteData" :key="index">
      <span :class="{ note__todo_id_complete: el.isDone }">{{ el.id }}</span>
      <span
        class="note__todo_text"
        :class="{ note__todo_text_complete: el.isDone }"
        >{{ el.text }}</span
      >
      <span class="note__actions">
        <input type="checkbox" v-model="el.isDone" :id="index" />
        <label
          v-if="el.isDone"
          class="green note__actions_complete"
          :for="index"
          >Сделано</label
        >
        <label v-else class="red" :for="index">Не сделано</label>
        <img
          @click="$emit('openDelete', index)"
          src="@/assets/delete.png"
          alt="delete"
        />
        <img
          @click="$emit('openEditText', index)"
          src="@/assets/edit.png"
          alt="edit"
        />
      </span>
    </p>
    <EditDialog
      :editTextDialog="editTextDialog"
      :text="editText"
      @changeText="$emit('changeText', $event)"
      @closeDialog="$emit(closeDialog)"
      @saveText="$emit('saveText')"
    />
    <DeleteDialog
      :deleteDialog="deleteDialog"
      @closeDelete="$emit('closeDelete')"
      @deleteConfirm="$emit('deleteConfirm')"
    />
  </div>
</template>

<script>
import DeleteDialog from "../Modal/DeleteDialog.vue";
import EditDialog from "../Modal/EditDialog.vue";

export default {
  components: { DeleteDialog, EditDialog },
  props: {
    noteData: Array,
    editText: String,
    editTextDialog: Boolean,
    deleteDialog: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.note {
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
    &_complete {
      width: 87px;
    }
  }
}
img {
  width: 17px;
  height: 17px;
}
@media screen and (min-width: 1200) {
  .note__todos {
    margin: 10px;
  }
}
</style>
