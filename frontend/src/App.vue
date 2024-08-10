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
      old_length: 0,
      line_jump_index: 0,
      count: 0,
    };
  },
  methods: {
    text_render(){
      if (this.typing_letter === this.text_for_typing[this.count]){
        this.count++;
      } else {
        this.mistake_animation("next_letter", "fading");
      };
      // if (this.new_line_detection("text_for_typing")){
      //     this.line_jump_index = this.count;
      // };
      this.typing_letter = null;
      console.log(document.getElementById("text_for_typing").textContent.split(' ')[0])
      console.log(document.getElementById("text_for_typing").offsetHeight)
      console.log()
    },
    mistake_animation(id, class_name){
      let element = document.getElementById(id);
      element.classList.remove(class_name);
      element.offsetWidth;
      element.classList.add(class_name);
    },
    text_focus(){
      document.getElementById("typing_letter").focus()
    },
    new_line_detection(id){
      let element = document.getElementById(id);
      let new_length = element.offsetHeight;
      let res = new_length < this.old_length;
      this.old_length = new_length;
      return res;
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
  font-family: "Grandstander", Helvetica;
  font-weight: bold;
  background-color: lightgray;
  width: 80%;
  border-radius: 0.5em;
  border: 0.12em solid;
  border-color: #000000;
  padding: 1em;
  font-size: x-large;
  text-align: left;
  text-shadow: grey 0.04em 0.04em 0.5em;
  line-height: 1.5em;
  caret-color: darkblue;
}

#correct_text{
  color: lawngreen;
}

#typing_letter{
  font-family: "Grandstander", Helvetica;
  font-weight: bold;
  background-color: lightgray;
  border: none;
  outline: none;
  width: 0.07em;
  font-size: xx-large;
}

.fading{
  animation: fading 1s linear;
}
@keyframes fading {
  0% { color: red; }
  100% {color: 000; }
}
</style>
