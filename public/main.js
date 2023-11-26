const allergyNames = {
  1: "난류",
  2: "우유",
  3: "메밀",
  4: "땅콩",
  5: "대두",
  6: "밀가루",
  7: "고등어",
  8: "게",
  9: "새우",
  10: "돼지고기",
  11: "복숭아",
  12: "토마토",
  13: "아황산염",
  14: "호두",
  15: "닭고기",
  16: "쇠고기",
  17: "오징어",
  18: "조개류(굴, 전복, 홍합 포함)",
  19: "잣",
};

let currentDate = moment().tz("Asia/Seoul").format("YYYYMMDD");
let parsedData = [];

// fetch(
//   "https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=P10&SD_SCHUL_CODE=8320104&Type=json&MLSV_YMD=202311&KEY=b0da414019cc409fb799819adf220a8a"
// )
fetch("/.netlify/functions/getDataFromDB")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.mealServiceDietInfo[1].row);
    parsedData = data.mealServiceDietInfo[1].row.map((item) => {
      return {
        type: item["MMEAL_SC_NM"],
        date: item["MLSV_YMD"],
        menu: convertAllergyNumberToKorean(item["DDISH_NM"]),
      };
    });

    setMenu();

    const previousButton = document.getElementById("previous-button");
    previousButton.addEventListener("click", previousButtonClickHandler);

    const todayButton = document.getElementById("today-button");
    todayButton.addEventListener("click", todayButtonClickHandler);

    const nextButton = document.getElementById("next-button");
    nextButton.addEventListener("click", nextButtonClickHandler);
  });

function convertAllergyNumberToKorean(menu) {
  for (let i = Object.keys(allergyNames).length; i > 0; i--) {
    menu = menu.replaceAll(i, allergyNames[i]);
  }
  return menu;
}

function setMenu() {
  try {
    const breakfastMenu = parsedData.find(
      (item) => item.type === "조식" && item.date === currentDate
    ).menu;
    const lunchMenu = parsedData.find(
      (item) => item.type === "중식" && item.date === currentDate
    ).menu;
    const dinnerMenu = parsedData.find(
      (item) => item.type === "석식" && item.date === currentDate
    ).menu;

    const breakfastCell = document.getElementById("breakfast-cell");
    breakfastCell.innerHTML = breakfastMenu;
    const lunchCell = document.getElementById("lunch-cell");
    lunchCell.innerHTML = lunchMenu;
    const dinnerCell = document.getElementById("dinner-cell");
    dinnerCell.innerHTML = dinnerMenu;

    document.getElementById("current-date").innerText =
      currentDate + " 급식 메뉴";
  } catch (error) {
    alert("나이스에서 급식 식단 정보를 업데이트하지 않았습니다");
  }
}

const previousButtonClickHandler = () => {
  currentDate = moment(currentDate, "YYYYMMDD")
    .subtract(1, "days")
    .format("YYYYMMDD");
  setMenu();
};

const todayButtonClickHandler = () => {
  currentDate = moment().tz("Asia/Seoul").format("YYYYMMDD");
  setMenu();
};

const nextButtonClickHandler = () => {
  currentDate = moment(currentDate, "YYYYMMDD")
    .add(1, "days")
    .format("YYYYMMDD");
  setMenu();
};
