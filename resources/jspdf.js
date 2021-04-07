const {jsPDF} = require('jspdf')
const {autoTable} = require('jspdf-autotable')

const doc = new jsPDF()
document.querySelector('.pdfBtn').addEventListener('onClick', (e) => {
    e.preventDefault()
    console.log(e.target);
    autoTable(doc, { html: '#table' })
    doc.save('table.pdf')
})