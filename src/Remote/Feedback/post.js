export const postFeedback$ = ({config$, text$}) => {
  return config$
    .combineLatest(text$, (config, text) => ({config, text}))
    .map(({config, text}) => ({
      url: config.api + '/feedback',
      method: 'POST',
      category: 'postFeedback$',
      send: {
        text: text
      }
    }))
}
