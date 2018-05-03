/* global FileReader, Papa, Handsontable */

const input = document.getElementById('input-file')
const handsontableContainer = document.getElementById('handsontable-container')

input.onchange = function () {
  var file = this.files[0]
  var reader = new FileReader()

  reader.onload = function (e) {
    var csv = e.target.result
    
    createTable(csv)
  }

  reader.readAsText(file)
}

const createTable = csv => {
  var data = Papa.parse(csv, {
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
