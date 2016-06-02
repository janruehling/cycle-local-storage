const hoverContainer$ = sources => sources.DOM.select('.hoverContainer')
  .events('mouseenter')
  .map(true)
  .merge(sources.DOM.select('.buttonAdd')
    .events('mouseenter')
    .map(true))
  .merge(sources.DOM.select('.buttonRemove')
    .events('mouseenter')
    .map(true))

export default sources => ({
  hover$: sources.DOM.select('.avatarHoverTarget')
    .events('mouseenter')
    .map(true)
    .merge(
      sources.DOM.select('.avatarHoverTarget')
        .events('mouseleave')
        .map(false)
        .merge(hoverContainer$(sources))
    )
    .startWith(false),
  addButtonClick$: sources.DOM.select('.addButton').events('click'),
  removeButtonClick$: sources.DOM.select('.removeButton').events('click')
})
