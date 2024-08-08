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
      correct_text: `sdafas`,
      input_text: ``,
      count: 0,
      text_element: null,
      temp: ``,
    };
  },
  methods: {
    placeholder_render(){
      this.text_element = document.getElementById("myInput");
      this.input_text = this.text_element.textContent;
      if(this.input_text[this.count] === this.text_for_typing[this.count]){
        this.count++;
      };
      this.text_element.innerHTML = this.text_for_typing;
      this.setCursorEditable(this.text_element, this.count);
    },
    setCursorPosition(inputElem, position) { // for textarea
      if (inputElem.setSelectionRange) {
        inputElem.focus();
        inputElem.setSelectionRange(position, position);
      }
    },
    setCursorEditable(editableElem, position) { // for contenteditable
      let range = document.createRange();
      let sel = window.getSelection();
      range.setStart(editableElem.childNodes[0], position);
      range.collapse(true);

      sel.removeAllRanges();
      sel.addRange(range);
      editableElem.focus();
    },
  }
};
</script>

<template>
  <main>
    <h1 class="main_name">
      blind_typing
    </h1>
    <div id="correct_text">

    </div>
    <div class="input_box" id="myInput" autofocus contenteditable @input="placeholder_render()"
    autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" 
    >
    {{ text_for_typing }}
    </div>
    <div>
      {{ input_text }}
    </div>
    <div>
      {{ }}
    </div>
  </main>
</template>

<style scoped>
.main_name{
  font-size: 4em;
}

.input_box{
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
  outline: none;
  caret-color: darkblue;
  resize: none;
}
</style>
