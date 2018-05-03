/* global Papa, Handsontable, readAsText */

const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || [])
    .reduce(
      (acc, value) => ({
        ...acc,
        [value.slice(0, value.indexOf('='))]: value.slice(value.indexOf('=') + 1)
      }), {}
    )

const input = document.getElementById('input-file')
const handsontableContainer = document.getElementById('handsontable-container')

const params = getURLParameters(location.search)

if (params.csv) {
  createTable(btoa(unescape(params.csv)))
} else {
  input.addEventListener('change', async function () {
  const [file] = this.files

  readAsText(file)
    .then(createTable)
    .catch(console.error)
  })
}

const createTable = csv => {
  input.remove()

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
