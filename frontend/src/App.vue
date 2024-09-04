<script>
export default{
  data(){
    return {
      text_for_typing: '',
      typing_letter: '',
      right_count: 0,
      wrong_count: 0,
      start_date: null,
      date_difference: 0,
    };
  },
  computed: {
    total_count(){
      return this.right_count + this.wrong_count;
    },
    percent_of_mistakes() {
      return this.total_count ? 100 - Math.round((this.wrong_count / this.total_count) * 100) : 100;
    },
    speed_of_typing() {
      return this.date_difference ? Math.round((this.right_count * 60000) / this.date_difference) : 0;
    },
  },
  methods: {
    async fetch_text() {
      try {
        const response = await fetch('http://localhost:3000/text_for_typing');
        const data = await response.json();
        console.log(data);
        this.text_for_typing = data.text_for_typing;
      } catch (error) {
        console.error('Error fetching text:', error);
      }
    },
    text_render() {
      if (!this.start_date) {
        this.start_date = new Date();
      }
      this.$refs.next_letter.className = null;
      let new_date = new Date();
      if (this.typing_letter === this.text_for_typing[this.right_count]) {
        this.date_difference = new_date - this.start_date;
        this.right_count++;
        this.check_completion();
      } else {
        this.mistake_animation(this.$refs.next_letter,
          this.$refs.next_letter.innerText === ' ' ? 'space_fading' : 'letter_fading');
        this.wrong_count++;
      }
      this.typing_letter = '';
    },
    mistake_animation(element, class_name) {
      void element.offsetWidth;
      element.className = class_name;
    },
    text_focus() {
      this.$refs.typing_letter.focus();
    },
    check_completion() {
      if (this.right_count === this.text_for_typing.length) {
        this.$refs.complete_message.style.visibility = "visible";
        this.$refs.text_field.style.filter = "blur(0.1em)";
        this.$refs.typing_letter.style.visibility = "hidden";
      }
    },
    reload(){
      location.reload();
    }
  },
  mounted() {
    this.fetch_text();
  },
};
</script>

<template>
  <main>
    <div id="header">
      <button id="authorization">
        Sign up
      </button>
    </div>
    <h1 id="main_name" @click="reload">
      blind_typing
    </h1>
    <div id="typing_information">
      <div id="percent_of_mistakes">
        {{ percent_of_mistakes }}%
      </div>
      <div id="speed_of_typing">
        {{ speed_of_typing }}cpm
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
      <div id="complete_message" ref="complete_message" >
        <div id="nice_work">
          Nice work! 
        </div>
        <div id="your_score">
          Your score is:
          <div id="result_message">
          {{ percent_of_mistakes }}% accuracy and {{ speed_of_typing }}cpm
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped>
#main_name{
  font-size: 3.6em;
  margin: 0;
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

#percent_of_mistakes, #speed_of_typing{
  padding-right: 1em;
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
  text-shadow: 0.04em 0.04em 0.5em gray;
  filter: none;
}

#correct_text{
  color: lawngreen;
  padding: 0em;
}

#typing_letter{
  background-color: transparent;
  padding: 0em;
  position: absolute;
  border: none;
  outline: none;
  font-size: 1.12em;
  caret-color: darkblue;
  width: 0.1em;
  visibility: visible;
}

#next_letter{
  position: relative;
  border-radius: 0.5em;
  margin-left: 0.1em;
}

#complete_message{
  position: absolute;
  text-align: center;
  font-size: 3em;
  visibility: hidden;
}
#nice_work{
  font-size: 2em;
} 

#your_score{
  font-size: 0.75em;
}

#result_message{
  text-decoration: underline;
}
#header{
  width: 100%;
  margin: 0.5em;
  display: flex;
  flex-direction: row;
  justify-content: right;
}

#authorization{
  font-family: inherit;
  font-weight: inherit;
  font-size: 1.5em;
  justify-self: end;
  margin-right: 2em;
  padding: 0.3em;
  background-color: lightgray;
  border-radius: 0.3em;
  border: 0.08em solid black;
  transition-duration: 0.4s;
  box-shadow: 0.2em 0.2em 0.4em gray;
}

#authorization:hover{
  background-color: darkgray;
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
