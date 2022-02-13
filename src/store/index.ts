import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  actions: {
    async load() {
      const resp = await window.fetch('/dictionary.json')
      this.words = await resp.json()
      const wordIdx = Math.floor(Math.random() * this.words.length)
      this.currentWord = this.words[wordIdx]
    }
  },
  state: () => {
    return {
      loading: true,
      game: 'unknown',
      words: [] as string[],
      currentWord: '',
      currentTry: 0,
      currentLetter: 0,
      wordTries: [
        [
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'}
        ],
        [
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'}
        ],
        [
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'}
        ],
        [
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'}
        ],
        [
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'}
        ],
        [
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'},
          {state: 'empty', val: '_'}
        ]
      ],
      keyboardRows: [
        [
          {label: 'q', state: 'unknown'},
          {label: 'w', state: 'unknown'},
          {label: 'e', state: 'unknown'},
          {label: 'r', state: 'unknown'},
          {label: 't', state: 'unknown'},
          {label: 'y', state: 'unknown'},
          {label: 'u', state: 'unknown'},
          {label: 'i', state: 'unknown'},
          {label: 'o', state: 'unknown'},
          {label: 'p', state: 'unknown'}
        ],
        [
          {label: 'a', state: 'unknown'},
          {label: 's', state: 'unknown'},
          {label: 'd', state: 'unknown'},
          {label: 'f', state: 'unknown'},
          {label: 'g', state: 'unknown'},
          {label: 'h', state: 'unknown'},
          {label: 'j', state: 'unknown'},
          {label: 'k', state: 'unknown'},
          {label: 'l', state: 'unknown'},
        ],
        [
          {label: 'enter'},
          {label: 'z', state: 'unknown'},
          {label: 'x', state: 'unknown'},
          {label: 'c', state: 'unknown'},
          {label: 'v', state: 'unknown'},
          {label: 'b', state: 'unknown'},
          {label: 'n', state: 'unknown'},
          {label: 'm', state: 'unknown'},
          {label: 'backspace'},
        ]
      ]
    }
  }
})
