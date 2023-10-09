const fs = require('fs');
const XLSX = require('xlsx');

const csvData = `Date,Kind,Menu1,Allergy1,Menu2,Allergy2,Menu3,Allergy3,Menu4,Allergy4,Menu5,Allergy5,Menu6,Allergy6,Menu7,Allergy7,Menu8,Allergy8,Menu9,Allergy9,Menu10,Allergy10,Menu11,Allergy11,Menu12,Allergy12,Menu13,Allergy13,Menu14,Allergy14,Menu15,Allergy15,Menu16,Allergy16,Menu17,Allergy17
0910,조식,모듬빵종, ,잼,1.2.5.6,미역국, ,참떡갈비,4.5.6.10.13.15.16.18,해시브라운,5.6.12,깍두기, ,흑임자깨죽, ,누룽지, ,후르트링, ,초코크런치,2.5.6,감귤쥬스, ,우유, ,그릴후랑크,2.5.6.10.15.16,베이컨스크램블에그,1.10,사과, ,토마토, 
0910,중식,볼도넛,1.2.5.6,유부된장국, ,도라지오이생채, ,제육강정,5.6.10.12.13,깍두기, ,이프로,11.13,훈제오리볶음밥,1.2.5.6.9.13,양상추콘샐러드, 
0910,석식,수수밥, ,쌀밥, ,계란찜, ,건파래볶음,5.13,오징어볶음, ,칼국수사리,5.6.17,포기김치,9.13,오렌지쥬스, ,야채탕,5.6,블루베리샐러드,
0911,조식,쇠고기죽, ,누룽지, ,모듬빵종, ,잼,1.2.5.6,고등어감자조림,5.6.7,사과, ,망고, ,코코볼, ,아몬드후레이크, ,오렌지쥬스, ,우유,2.13,어묵국,1.5.6.9,깻잎무침, ,피자카츠,1.5.6.10
0911,중식,쌀밥, ,짜사이무침,5.6.13,포기김치,9.13,복숭아아이스티,11.13,새우칩,5.6.9,완탕면,1.2.5.6.9.10,팔보채,1.5.10.17,춘권,1.5.6
0911,석식,메추리알곤약조림,1.5.6,양배추쌈, ,쌈장,5.6,제육볶음,5.6.10.12.13,수수밥, ,미역국, ,포기김치,9.13,양상추샐러드, ,사과, ,망고
`;

const jsonData = XLSX.utils.csvToJson(csvData);

const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(jsonData);
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

const filePath = 'menuData.xlsx';
XLSX.writeFile(workbook, filePath, { bookSST: true });

console.log('Data saved to', filePath);