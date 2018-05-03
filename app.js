/* global FileReader, Papa, Handsontable */
const input = document.getElementById('input-file')
const handsontableContainer = document.getElementById('handsontable-container')

input.addEventListener('change', async function () {
  const [file] = this.files
  
  readAsText(file)
    .then(createTable)
    .catch(console.error)
})

const createTable = csv => {
  const data = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true
  })

  Handsontable(handsontableContainer, {
    data: data.data,
    rowHeaders: true,
    colHeaders: data.meta.fields,
    columnSorting: true
  })
}
