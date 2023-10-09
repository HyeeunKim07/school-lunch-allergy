const csvData =`Date,Kind,Menu1,Allergy1,Menu2,Allergy2,Menu3,Allergy3,Menu4,Allergy4,Menu5,Allergy5
0910,조식,모듬빵종,0,잼,1.2.5.6,미역국,0,참떡갈비,4.5.6.10.13.15.16.18,해시브라운,5.6.12
0910,중식,볼도넛,1.2.5.6,유부된장국,0,도라지오이생채,0,제육강정,5.6.10.12.13,깍두기,0
0910,석식,수수밥,0,쌀밥,0,계란찜,0,건파래볶음,5.13,오징어볶음`;

const rows = csvData.split('\n');

for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].split(',');

    for (let j = 0; j < cells.length; j += 2) {
        if (cells[j + 1] === '0') {
            console.log(`Menu${(j / 2) + 1}에 Allergy가 없습니다.`);
        }
    }
}
