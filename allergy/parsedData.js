function parseCSVRow(row) {
  const cells = row.split(',');
  const date = cells[0];
  const kind = cells[1];
  const menuInfo = [];

  for (let j = 2; j < cells.length; j += 2) {
    const menuName = cells[j];
    const allergyNumbers = cells[j + 1].split('.').map(Number).filter(num => num !== 0);

    const allergyText = allergyNumbers.map(allergy => allergyNames[allergy]).join(', ');

    menuInfo.push({
      menuName,
      allergies: allergyText
    });
  }

  return { date, kind, menuInfo };
}

function printMenuInfo(menuInfo) {
  console.log(`Date: ${menuInfo.date}, Kind: ${menuInfo.kind}`);
  for (const menuItem of menuInfo.menuInfo) {
    console.log(`${menuItem.menuName}의 알러지: ${menuItem.allergies}`);
  }
}

async function main() {
  const filePath = 'C:\\Users\\study\\data.csv';

  try {
    const csvData = await readCSV(filePath);
    const rows = csvData.split('\n');

    for (let i = 1; i < rows.length; i++) {
      const menuInfo = parseCSVRow(rows[i]);
      printMenuInfo(menuInfo);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();