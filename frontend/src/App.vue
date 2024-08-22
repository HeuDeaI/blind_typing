<template>
  <main>
    <h1 id="main_name" @click="boost">
      blind_typing
    </h1>
    <div id="typing_information">
      <div id="precent_of_mistakes">
        {{ accuracy }}%
      </div>
      <div id="speed_of_typing">
        {{ typingSpeed }} WPM
      </div>
    </div>
    <div id="input_box">
      <div id="text_field">
        <span id="correct_text">
          <text-letter v-for="(letter, index) in correctLetters"
                       :key="index"
                       :letter="letter"
                       :isCorrect="true" />
        </span>
        <span id="text_for_typing">
          <text-letter v-for="(letter, index) in remainingLetters"
                       :key="index"
                       :letter="letter"
                       :isCurrent="index === 0"
                       :isCorrect="index === 0 ? isNextLetterCorrect : null" />
        </span>
      </div>
      <div id="complete_message" ref="complete_message">
        Nice
      </div>
      <div id="debug_info">
        <p>Last Key Pressed: {{ lastKeyPressed }}</p>
      </div>
    </div>
  </main>
</template>

<script src="./script.js"></script>
<style src="./realmainPASHUK.css" scoped></style>
