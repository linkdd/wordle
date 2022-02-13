<template>
  <div class="keyboard">
    <div v-for="(row, rowIndex) in keyboardRows" :key="rowIndex">
      <span v-for="(key, keyIndex) in row" :key="keyIndex">
        <button v-if="key.label == 'enter'" @click="validateTry()">
          ENTER
        </button>
        <button v-else-if="key.label == 'backspace'" @click="removeLetter()">
          ⌫
        </button>
        <button v-else :class="key.state" @click="typeLetter(key.label)">
          {{ key.label }}
        </button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'

const store = useStore()
const { keyboardRows, currentTry, currentLetter, currentWord } = storeToRefs(store)

function validateTry() {
  if (store.currentLetter === 5) {
    store.$patch(state => {
      const wordTry = state.wordTries[state.currentTry]

      const checkWord = wordTry.map(letter => letter.val).join('')
      if (state.words.indexOf(checkWord) === -1) {
        alert('Not a word')
        return
      }

      const word = state.currentWord
      let validLetters = ''

      for(let i = 0; i < 5; i++) {
        const letter = wordTry[i]

        if (letter.val === word[i]) {
          letter.state = 'valid'
          validLetters += letter.val

          for (let keyboardRow of state.keyboardRows) {
            for (let keyboardLetter of keyboardRow) {
              if (keyboardLetter.label === letter.val) {
                keyboardLetter.state = 'valid'
              }
            }
          }
        }
        else if (word.indexOf(letter.val) >= 0 && validLetters.indexOf(letter.val) === -1) {
          letter.state = 'misplaced'

          for (let keyboardRow of state.keyboardRows) {
            for (let keyboardLetter of keyboardRow) {
              if (keyboardLetter.label === letter.val && keyboardLetter.state === 'unknown') {
                keyboardLetter.state = 'misplaced'
              }
            }
          }
        }
        else {
          letter.state = 'invalid'

          for (let keyboardRow of state.keyboardRows) {
            for (let keyboardLetter of keyboardRow) {
              if (keyboardLetter.label === letter.val && keyboardLetter.state === 'unknown') {
                keyboardLetter.state = 'invalid'
              }
            }
          }
        }
      }

      if (validLetters.length === 5) {
        state.game = 'won'
      }
      else {
        state.currentTry++
        state.currentLetter = 0

        if (state.currentTry >= 6) {
          state.game = 'lost'
        }
      }
    })
  }
}

function removeLetter() {
  if (store.currentLetter > 0) {
    store.$patch(state => {
      state.currentLetter--
      state.wordTries[state.currentTry][state.currentLetter].val = '_'
      state.wordTries[state.currentTry][state.currentLetter].state = 'empty'
    })
  }
}

function typeLetter(l: string) {
  if (store.currentLetter < 5) {
    store.$patch(state => {
      state.wordTries[state.currentTry][state.currentLetter].val = l
      state.wordTries[state.currentTry][state.currentLetter].state = 'unknown'
      state.currentLetter++
    })
  }
}
</script>

<style lang="scss">
@import '~/bulma/bulma.sass';

.keyboard {
  @extend .has-text-centered;

  margin: auto;

  button {
    @extend .has-background-grey;
    @extend .has-text-white;
    @extend .is-shadowless;

    font-size: 1em;
    font-weight: bold;
    text-transform: uppercase;

    padding: 1em;
    margin: 0.25em;

    border-radius: 5px;
    transition: all 0.3s ease-in-out;

    &.valid {
      @extend .has-background-success;
    }

    &.misplaced {
      @extend .has-background-warning-dark;
    }

    &.invalid {
      @extend .has-background-grey-dark;
    }
  }
}
</style>