import TextLetter from '@/TextLetter.vue';

export default {
    components: {
        TextLetter
    },
    data() {
        return {
            text_for_typing: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...`,
            right_count: 0,
            wrong_count: 0,
            start_date: new Date(),
            isNextLetterCorrect: null,
            lastKeyPressed: ''
        };
    },
    computed: {
        correctLetters() {
            return this.text_for_typing.substring(0, this.right_count).split('');
        },
        remainingLetters() {
            return this.text_for_typing.substring(this.right_count).split('');
        },
        accuracy() {
            return Math.round((this.right_count / (this.right_count + this.wrong_count)) * 100);
        },
        typingSpeed() {
            const timeElapsed = new Date() - this.start_date;
            return Math.round((this.right_count * 60000) / timeElapsed);
        }
    },
    methods: {
        handleKeyPress(event) {
            this.lastKeyPressed = event.key;
            const currentLetter = this.text_for_typing[this.right_count];
            if (event.key === currentLetter) {
                this.right_count++;
                this.isNextLetterCorrect = true;
                if (this.right_count === this.text_for_typing.length) {
                    this.$refs.complete_message.style.visibility = 'visible';
                }
            } else {
                this.wrong_count++;
                this.isNextLetterCorrect = false;
            }
        },
        boost() {
            this.right_count = 76;
        }
    },
    mounted() {
        window.addEventListener('keydown', this.handleKeyPress);
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.handleKeyPress);
    }
};
