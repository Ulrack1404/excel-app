const CODES = {
    A: 65,
    Z: 90
};

// function toCell(_, col) {
//     return `
//     <div class="cell" contenteditable="true" data-col=${col}></div>
//     `;
// }
function toCell(row) {
    return function (_, col) {
        return `
            <div class="cell" 
            contenteditable="true" 
            data-type="cell"
            data-col=${col}
            data-row=${row}
            data-id="${row}:${col}"
            ></div>
            `;
    };
    //     return `
    //     <div class="cell" contenteditable="true" data-col=${col}></div>
    //     `;
}
function toColumn(col, index) {
    return `
    <div class="column" data-type="resizable" data-col=${index}>
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `;
}

// createRow - функция, которая создает структуру строчки
function createRow(index, content) {
    const resize = index
        ? '<div class="row-resize" data-resize="row"></div>'
        : "";
    return `
    <div class="row" data-type="resizable"> 
        <div class="row-info">${index ? index : ""}
            ${resize}
        </div>
        <div class="row-data">${content}</div>
    </div>
    `;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 35) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];
    const cols = new Array(colsCount)
        .fill("")
        .map(toChar)
        .map(toColumn)
        .join("");
    rows.push(createRow(null, cols));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount).fill("").map(toCell(row)).join("");
        rows.push(createRow(row + 1, cells));
    }

    return rows.join("");
}
