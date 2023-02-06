<template>
  <div>
    <CustomBtn
      @click="$emit('saveEdit')"
      class="note__btn"
      label="Сохранить изменения"
    />
    <CustomBtn
      @click="$emit('resetEdit')"
      class="note__btn"
      label="Откатить изменения"
    />
    <router-link to="/">
      <CustomBtn class="note__btn" label="Вернуться к списку" />
    </router-link>
  </div>
</template>

<script>
import CustomBtn from "../Btns/CustomBtn.vue";
export default {
  components: { CustomBtn },
};
</script>
