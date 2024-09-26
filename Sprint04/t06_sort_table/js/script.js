const placeholder = document.getElementById('placeholder')
const noti = document.getElementById('notification')
const data = [
    ['Black Panther', 66, 53],
    ['Captain America', 79, 137],
    ['Captain Marvel', 97, 26],
    ['Hulk', 80, 49],
    ['Iron Man', 88, 48],
    ['Spider-Man', 78, 16],
    ['Thanos', 99, 1000],
    ['Thor', 95, 1000],
    ['Yon-Rogg', 73, 52],
]
let sortOrder = [1, 1, 1]

const buildTable = () => {
    placeholder.innerHTML = ''

    const table = document.createElement('table')
    const tr = document.createElement('tr')

    const nameTh = document.createElement('th')
    nameTh.textContent = 'Name'
    nameTh.addEventListener('click', () => sortByValues(0, true))
    const strengthTh = document.createElement('th')
    strengthTh.textContent = 'Strength'
    strengthTh.addEventListener('click', () => sortByValues(1))
    const ageTh = document.createElement('th')
    ageTh.textContent = 'Age'
    ageTh.addEventListener('click', () => sortByValues(2))

    tr.appendChild(nameTh)
    tr.appendChild(strengthTh)
    tr.appendChild(ageTh)

    table.appendChild(tr)

    buildDataRow(table)

    placeholder.appendChild(table)
}

const buildDataRow = (table) => {
    data.forEach(rowData => {
        const row = document.createElement('tr')

        const nameTd = document.createElement('td')
        nameTd.textContent = rowData[0]
        const strengthTd = document.createElement('td')
        strengthTd.textContent = rowData[1]
        const ageTd = document.createElement('td')
        ageTd.textContent = rowData[2]

        row.appendChild(nameTd)
        row.appendChild(strengthTd)
        row.appendChild(ageTd)

        table.appendChild(row)
    })
}

const sortByValues = (num, isStr = false) => {
    if (isStr) {
        if (sortOrder[num]) {
            data.sort((a, b) => a[num].localeCompare(b[num]));
            sortOrder[num] = 0;
        } else {
            data.sort((a, b) => b[num].localeCompare(a[num]));
            sortOrder[num] = 1;
        }
    } else {
        if (sortOrder[num]) {
            data.sort((a, b) => a[num] - b[num]);
            sortOrder[num] = 0;
        } else {
            data.sort((a, b) => b[num] - a[num]);
            sortOrder[num] = 1;
        }
    }

    buildTable();
    showNoti(num);
}

const showNoti = num => {
    const params = ['Name', 'Strength', 'Age']
    noti.textContent = `Sorting by ${params[num]}, order: ${!sortOrder[num] ? 'ASC' : 'DESC'}`
}

buildTable()
