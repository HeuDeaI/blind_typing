<script>
export default{
  data(){
    return {
      text_for_typing: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the    
      industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
      scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
      electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
      Aldus PageMaker including versions of Lorem Ipsum.`.replace(/\s+/g, ' '),
      typing_letter: '',
      count: 0,
    };
  },
  methods: {
    text_render(){
      this.$refs.next_letter.className = null;
      if (this.typing_letter === this.text_for_typing[this.count]){
        this.count++;
      } else {
        this.mistake_animation(this.$refs.next_letter, this.$refs.next_letter.innerText === ' '
        ? "space_fading" : "letter_fading");
      };
      this.typing_letter = null;
    },
    mistake_animation(element, class_name){
      void element.offsetWidth;
      element.className = class_name;
    },
    text_focus(){
      this.$refs.typing_letter.focus();
    }
  }
};
</script>

<template>
  <main>
    <h1 id="main_name">
      blind_typing
    </h1>
    <div id="input_box" @click="text_focus">
      <span id="correct_text">{{ text_for_typing.substring(0, count) }}</span>
      <span id="text_for_typing">
        <input id="typing_letter" ref="typing_letter" v-model="typing_letter" @input="text_render"
        autofocus autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false">
        <span id="next_letter" ref="next_letter">{{ text_for_typing.charAt(count) }}
        </span>{{ text_for_typing.substring(count + 1) }}
      </span>
    </div>
  </main>
</template>

<style scoped>
#main_name{
  font-size: 4em;
}

#input_box{
  width: 80%;
  line-height: 1.5em;
  padding: 1em;
  box-sizing: border-box;
  white-space: pre-wrap;
  text-align: start;
  font-size: 1.5em;
  text-shadow: grey 0.04em 0.04em 0.5em;
  background-color: lightgray;
  border-radius: 0.5em;
  border: 0.12em solid black;
}

#correct_text{
  color: lawngreen;
}

#typing_letter{
  background-color: transparent;
  position: absolute;
  border: none;
  outline: none;
  font-size: 1.12em;
  caret-color: darkblue;
  width: 0.1em;
}

#next_letter{
  border-radius: 0.5em;
  margin-left: 0.1em;
}

.letter_fading{
  animation: letter_fading 1s ease-in-out;
}

.space_fading{
  animation: space_fading 1s ease-in-out;
}

@keyframes letter_fading {
  from { color: red; }
}

@keyframes space_fading {
  from { background-color: red; }
}
</style>
