<template>
  <div class="notes__items">
    <div class="notes__item" v-for="(el, index) in notes" :key="index">
      <h3>{{ el.title }}</h3>
      <div class="notes__item_actions">
        <p
          class="notes__item_actions_complete"
          @click="$emit('openDelete', index)"
        >
          Удалить
        </p>
        <router-link class="link" to="/edit">
          <p @click="$emit('saveIndex', index)">Отредактировать</p>
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
        <span class="green notes__todo_complete" v-else>Сделано</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notes: Array,
  },
};
</script>

<style lang="scss" scoped>
.notes {
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
      &_complete {
        cursor: pointer;
      }
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
    &_complete {
      width: 87px;
    }
  }
}

.link {
  text-decoration: none;
  color: black;
}
</style>
