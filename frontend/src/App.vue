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
      let next_letter = document.getElementById("next_letter");
      if (this.typing_letter === this.text_for_typing[this.count]){
        next_letter.className = "";
        this.count++;
      } else {
        this.mistake_animation(next_letter, next_letter.innerText === ' ' ? "space" : "fading");
      };
      this.typing_letter = null;
    },
    mistake_animation(element, class_name){
      element.className = "";
      element.offsetWidth;
      element.className = class_name;
    },
    text_focus(){
      document.getElementById("typing_letter").focus()
    }
  }
};
</script>

<template>
  <main>
    <h1 class="main_name">
      blind_typing
    </h1>
    <div id="input_box" @click="text_focus">
    <span id="correct_text">{{ text_for_typing.substring(line_jump_index, count) }}</span>
    <input id="typing_letter" autofocus v-model="typing_letter" @input="text_render"
    autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false">
    <span id="next_letter">{{ text_for_typing.charAt(count) }}</span>
    <span id="text_for_typing">{{ text_for_typing.substring(count + 1) }}</span>
    </div>
  </main>
</template>

<style scoped>
.main_name{
  font-size: 4em;
}

#input_box{
  background-color: lightgray;
  color: black;
  width: 80%;
  border-radius: 0.5em;
  border: 0.12em solid;
  border-color: black;
  padding: 1em;
  font-size: 1.5em;
  text-align: left;
  /* text-shadow: grey 0.04em 0.04em 0.5em; */
  line-height: 1.5em;
}

#correct_text{
  color: lawngreen;
}

#typing_letter{
  background-color: lightgray;
  border: none;
  outline: none;
  width: 0.07em;
  font-size: 1.12em;
  caret-color: darkblue;
}


#next_letter{
  border-radius: 0.5em;
  font-size: 1.12em;
  color: black;
}

.fading{
  animation: fading 1s linear;
}

.space{
  animation: space_fading 1s linear;
}

@keyframes fading {
  0% { color: red; }
  100% { color: black; }
}

@keyframes space_fading {
  0% { background-color: red; }
  100% { background-color: lightgray; }
}


</style>
