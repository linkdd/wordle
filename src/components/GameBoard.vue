<template>
  <table class="gameboard mb-3">
    <tbody><tr v-for="(wordTry, row) in wordTries" :key="row">
        <td v-for="(letter, col) in wordTry" :key="col" :class="letter.state">
          {{ letter.val }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { storeToRefs } from 'pinia';

const store = useStore()
const { wordTries } = storeToRefs(store)
</script>

<style lang="scss">
@import '~/bulma/bulma.sass';

table.gameboard {
  margin: auto;
  border-collapse: separate;
  border-spacing: 0.25em;

  td {
    @extend .has-text-centered;
    vertical-align: middle;

    font-family: monospace;
    font-size: 2em;
    font-weight: bold;
    line-height: 2em;
    text-transform: uppercase;

    width: 2em;
    height: 2em;
    border: 1px solid $grey;

    transition: all 0.3s ease-in-out;

    &.empty {
      @extend .has-text-black;
    }

    &.valid {
      @extend .has-background-success;
      border: 1px solid $success;
    }

    &.misplaced {
      @extend .has-background-warning-dark;
      border: 1px solid $warning-dark;
    }

    &.invalid {
      @extend .has-background-grey;
    }
  }
}
</style>