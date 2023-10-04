const csvData = `Date,Kind,Menu1,Allergy1,Menu2,Allergy2,Menu3,Allergy3,Menu4,Allergy4,Menu5,Allergy5,Menu6,Allergy6,Menu7,Allergy7,Menu8,Allergy8,Menu9,Allergy9,Menu10,Allergy10,Menu11,Allergy11,Menu12,Allergy12,Menu13,Allergy13,Menu14,Allergy14,Menu15,Allergy15,Menu16,Allergy16,Menu17,Allergy17
0910,조식,모듬빵종,0,잼,1.2.5.6,미역국,0,참떡갈비,4.5.6.10.13.15.16.18,해시브라운,5.6.12,깍두기,0,흑임자깨죽,0,누룽지,0,후르트링,0,초코크런치,2.5.6,감귤쥬스,0,우유,0,그릴후랑크,2.5.6.10.15.16,베이컨스크램블에그,1.10,사과,0,토마토, 
0910,중식,볼도넛,1.2.5.6,유부된장국, ,도라지오이생채, ,제육강정,5.6.10.12.13,깍두기, ,이프로,11.13,훈제오리볶음밥,1.2.5.6.9.13,양상추콘샐러드, 
0910,석식,수수밥, ,쌀밥, ,계란찜, ,건파래볶음,5.13,오징어볶음, ,칼국수사리,5.6.17,포기김치,9.13,오렌지쥬스, ,야채탕,5.6,블루베리샐러드,
0911,조식,쇠고기죽, ,누룽지, ,모듬빵종, ,잼,1.2.5.6,고등어감자조림,5.6.7,사과, ,망고, ,코코볼, ,아몬드후레이크, ,오렌지쥬스, ,우유,2.13,어묵국,1.5.6.9,깻잎무침, ,피자카츠,1.5.6.10`;

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
    18: '조개류(굴, 전복, 홍합 포함)'
};

const rows = csvData.split('\n');

for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].split(',');

    for (let j = 2; j < cells.length; j += 4) {
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