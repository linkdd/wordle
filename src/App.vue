<template>
  <header class="titlebar">
    <button class="newgame" data-tooltip="New Game" @click="newGame()">
      ▶
    </button>
    <h1 v-if="game === 'unknown'" class="title has-text-light">Wordle</h1>
    <h1 v-else-if="game === 'won'" class="title has-text-success">You won</h1>
    <h1 v-else-if="game === 'lost'" class="title has-text-danger">You lost</h1>
  </header>

  <main v-if="!loading">
    <GameBoard />
    <Keyboard />
  </main>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'

import GameBoard from './components/GameBoard.vue'
import Keyboard from './components/Keyboard.vue'

const store = useStore()
const { game, loading } = storeToRefs(store)

const load = async () => {
  await store.load()
  store.$patch({ loading: false })
}
load().catch(console.error)

function newGame() {
  store.$reset()
  load().catch(console.error)
}
</script>

<style lang="scss">
@import "~/bulma/bulma.sass";
@import "~/bulma-tooltip/src/sass/index.sass";
@import "~/bulma-fab-button/src/bulma-fab-button.sass";

html, body {
  @extend .has-background-black;
  @extend .has-text-light;
}

.titlebar {
  @extend .has-text-centered;
  @extend .p-3;
  @extend .mb-3;

  border-bottom: 1px solid $grey-dark;

  .newgame {
    @extend .button;
    @extend .is-floating;
    @extend .is-info;
    @extend .has-tooltip-left;
  }
}
</style>
