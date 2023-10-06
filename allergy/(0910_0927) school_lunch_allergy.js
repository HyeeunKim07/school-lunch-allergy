const allergyNames = {
    1: '난류',
    2: '우유',
    3: '메밀',
    4: '땅콩',
    5: '대두',
    6: '밀가루',
    7: '고등어',
    8: '게',
    9: '새우',
    10: '돼지고기',
    11: '복숭아',
    12: '토마토',
    13: '아황산염',
    14: '호두',
    15: '닭고기',
    16: '쇠고기',
    17: '오징어',
    18: '조개류(굴, 전복, 홍합 포함)',
    19: '잣'
};

const csvFilePath = 'C:/Users/study/SSEP/급식 웹스크롤링/allergy/csvData.js';

fetch(csvFilePath)
    .then(response => response.text())
    .then(csvData => {
        const rows = csvData.split('\n');

        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].split(',');

            const date = cells[0];
            const kind = cells[1];

            console.log(`Date: ${date}, Kind: ${kind}`);

            for (let j = 2; j < cells.length; j += 2) {
                const menuName = cells[j];
                const allergyNumbers = cells[j + 1].split('.').map(Number).filter(num => num !== 0);

                let allergyText = '';

                // 알러지 체크
                for (const allergy of allergyNumbers) {
                    allergyText += `${allergyNames[allergy]}, `;
                }

                // ,랑 띄어쓰기 제거
                allergyText = allergyText.slice(0, -2);

                console.log(`${menuName}의 알러지: ${allergyText}`);
            }
        }
    })
    .catch(error => console.error('Error fetching CSV file:', error));