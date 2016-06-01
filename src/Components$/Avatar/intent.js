export default sources => {
  const hoverContainer$ = sources.DOM.select('.hoverContainer')
    .events('mouseenter')
    .map(true)
    .merge(sources.DOM.select('.buttonAdd')
      .events('mouseenter')
      .map(true))
    .merge(sources.DOM.select('.buttonRemove')
      .events('mouseenter')
      .map(true))

  return {
    hover$: sources.DOM.select('.avatarHoverTarget')
      .events('mouseenter')
      .map(true)
      .merge(
        sources.DOM.select('.avatarHoverTarget')
          .events('mouseleave')
          .map(false)
          .merge(hoverContainer$)
      )
      .startWith(false),
    addButtonClick$: sources.DOM.select('.addButton').events('click'),
    removeButtonClick$: sources.DOM.select('.removeButton').events('click')
  }
}
