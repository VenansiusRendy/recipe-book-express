const {jsPDF} = require('jspdf')
const {autoTable} = require('jspdf-autotable');
const thousands = require('./thousands');

const printToPdf = (menuIngredients, menu) => {
    const doc = new jsPDF();
    menu.cost = 0;
    const header = [['No', 'Name', 'Qty', 'UOM', 'Price', 'Total']];
    const data = [];
    menuIngredients.forEach((menuIngredient, i) => {
        menu.cost += menuIngredient.subtotal;
        data.push(
                [i+1, menuIngredient.Ingredient.name.toUpperCase(), menuIngredient.qty, menuIngredient.Ingredient.uom.trim(), thousands(menuIngredient.Ingredient.price), thousands(menuIngredient.subtotal)]
        )
    })
    doc.autoTable({
        head: header,
        body: data,
        startY: 40
    })
    doc.text(10, 10, `
        Menu: ${menu.name.toUpperCase()}
        Category: ${menu.category.toUpperCase()}
        Total Cost: ${thousands(menu.cost)}
    `)
    // const name = `${menu.name}.pdf`
    // doc.save(`${name}`);
    return doc.output();
}

module.exports = printToPdf;