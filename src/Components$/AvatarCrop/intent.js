export default sources => ({
  cancelClicks$: sources.DOM.select('#cancelButton').events('click'),
  confirmClicks$: sources.DOM.select('#confirmButton').events('click'),
  cropCurrentButtonClicks$: sources.DOM.select('#cropCurrentButton').events('click'),
  uploadClicks$: sources.DOM.select('#uploadButton').events('click'),
  fileInputChange$: sources.DOM.select('#fileInput').events('change'),
  dropAreaDrop$: sources.DOM.select('#dropArea').events('drop')
})
