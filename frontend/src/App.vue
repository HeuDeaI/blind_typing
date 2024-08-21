<script>
export default{
  data(){
    return {
      text_for_typing: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the    
      industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
      scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
      electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
      Aldus PageMaker including versions of Lorem Ipsum.`.replace(/\s+/g, ' '),
      typing_letter: '',
      right_count: 0,
      wrong_count: 0,
      start_date: new Date(), // change start time from start typing
      date_difference: 0,
    };
  },
  methods: {
    text_render(){
      this.$refs.next_letter.className = null;
      let new_date = new Date();
      if (this.typing_letter === this.text_for_typing[this.right_count]){
        this.date_difference = new_date - this.start_date;
        this.right_count++;
      } else {
        this.mistake_animation(this.$refs.next_letter, this.$refs.next_letter.innerText === ' '
        ? "space_fading" : "letter_fading");
        this.wrong_count++;
      };
      this.typing_letter = null;
    },
    mistake_animation(element, class_name){
      void element.offsetWidth;
      element.className = class_name;
    },
    text_focus(){
      this.$refs.typing_letter.focus();
    },
    boost(){
      this.right_count = 76;
    }
  }
};
</script>

<template>
  <main>
    <h1 id="main_name" @click="boost">
      blind_typing
    </h1>
    <div id="typing_information">
      <div id="precent_of_mistakes">
        {{ 100 - Math.round(wrong_count/(right_count + wrong_count) * 100)}}%
      </div>
      <div id="speed_of_typing">
        {{ Math.round(right_count * 60000/ date_difference) }} <!-- change uploading event -->
      </div>
    </div>
    <div id="input_box" @click="text_focus">
      <div id="text_field" ref="text_field">
        <span id="correct_text">{{ text_for_typing.substring(0, right_count) }}</span>
        <span id="text_for_typing">
          <input id="typing_letter" ref="typing_letter" v-model="typing_letter" @input="text_render"
          autofocus autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false">
          <span id="next_letter" ref="next_letter">{{ text_for_typing.charAt(right_count) }}
          </span>{{ text_for_typing.substring(right_count + 1) }}
        </span>
      </div>
      <div id="complete_message" ref="complete_message"> <!-- success message -->
        Nice
      </div>
    </div>
  </main>
</template>

<style scoped>
#main_name{
  font-size: 3.6em;
  margin-bottom: 0;
}

#typing_information{
  flex-direction: row;
  display: flex;
  width: 80%;
  font-size: 1.4em;
  flex-wrap: wrap-reverse;
  box-sizing: border-box;
  justify-content: left;
  padding-bottom: 0.2em;
  padding-top: 0.2em;
  padding-left: 1.5em;
}

#precent_of_mistakes{
  padding-right: 2em;
}

#input_box{
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: lightgray;
  border-radius: 0.5em;
  border: 0.12em solid black;
}

#text_field{
  line-height: 1.5em;
  padding: 1em;
  position: relative;
  white-space: pre-wrap;
  text-align: start;
  font-size: 1.5em;
  text-shadow: grey 0.04em 0.04em 0.5em;
}

#correct_text{
  color: lawngreen;
  padding: 0em;
}

#typing_letter{
  background-color: transparent;
  padding: 0em;
  border: none;
  outline: none;
  font-size: 1.12em;
  caret-color: darkblue;
  width: 0.1em;
}

#next_letter{
  position: relative;
  border-radius: 0.5em;
  margin-left: 0.1em;
}

#complete_message{
  position: absolute;
  background-color: red;
  text-align: center;
  font-size: 3em;
  visibility: hidden;
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
