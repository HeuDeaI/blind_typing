<template>
  <span :class="{'text-letter': true, 'correct': isCorrect, 'current': isCurrent}">
    {{ letter }}
  </span>
</template>

<script>
export default {
  props: {
    letter: String,
    isCorrect: Boolean,
    isCurrent: Boolean
  }
};
</script>

<style scoped>
.text-letter.correct {
  color: lawngreen;
}
.text-letter.current {
  color: blue;
  text-decoration: underline;
}
</style>
