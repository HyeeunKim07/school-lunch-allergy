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
    updateMenuWithSelectedAllergies();

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

let breakfastMenu = "";
let lunchMenu = "";
let dinnerMenu = "";
function setMenu() {
  try {
    breakfastMenu = parsedData.find(
      (item) => item.type === "조식" && item.date === currentDate
    ).menu;
    lunchMenu = parsedData.find(
      (item) => item.type === "중식" && item.date === currentDate
    ).menu;
    dinnerMenu = parsedData.find(
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
  updateMenuWithSelectedAllergies();
};

const todayButtonClickHandler = () => {
  currentDate = moment().tz("Asia/Seoul").format("YYYYMMDD");
  setMenu();
  updateMenuWithSelectedAllergies();
};

const nextButtonClickHandler = () => {
  currentDate = moment(currentDate, "YYYYMMDD")
    .add(1, "days")
    .format("YYYYMMDD");
  setMenu();
  updateMenuWithSelectedAllergies();
};

const allergyCheckboxesContainer = document.getElementById("allergyCheckboxes");

// 알러지 체크박스 동적으로 생성
Object.keys(allergyNames).forEach((key) => {
  const value = allergyNames[key];
  const checkboxDiv = document.createElement("div");
  checkboxDiv.className = "col-6 col-md-4 col-lg-3 mb-3";
  checkboxDiv.innerHTML = `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="${key}" id="allergy${key}" name="allergies[]">
        <label class="form-check-label" for="allergy${key}">${value}</label>
      </div>
    `;
  allergyCheckboxesContainer.appendChild(checkboxDiv);
});

// localStorage에서 저장된 알러지 정보 불러오기
const savedAllergies =
  JSON.parse(localStorage.getItem("selectedAllergies")) || [];

// 저장된 알러지 정보를 기반으로 체크박스 초기화
savedAllergies.forEach((allergy) => {
  const checkbox = document.getElementById(`allergy${allergy}`);
  if (checkbox) {
    checkbox.checked = true;
  }
});

function submitForm() {
  // 선택된 알러지 확인
  const selectedCheckboxes = document.querySelectorAll(
    'input[name="allergies[]"]:checked'
  );
  const selectedAllergies = Array.from(selectedCheckboxes).map(
    (checkbox) => checkbox.value
  );

  // 선택된 알러지를 localStorage에 저장
  localStorage.setItem("selectedAllergies", JSON.stringify(selectedAllergies));

  // 선택된 알러지를 콘솔에 출력
  console.log("선택된 알러지:", selectedAllergies);
  // 여기에서 선택된 알러지에 대한 추가적인 처리를 할 수 있습니다.
}

// 알러지 체크박스에 대한 이벤트 리스너 등록
document.addEventListener("DOMContentLoaded", function () {
  const allergyCheckboxes = document.querySelectorAll(
    'input[name="allergies[]"]'
  );

  // 페이지 로드 시 localStorage에서 저장된 알러지 정보 불러오기
  const savedAllergies =
    JSON.parse(localStorage.getItem("selectedAllergies")) || [];

  // 저장된 알러지 정보를 기반으로 체크박스 초기화
  savedAllergies.forEach((allergy) => {
    const checkbox = document.getElementById(`allergy${allergy}`);
    if (checkbox) {
      checkbox.checked = true;
    }
  });

  // 체크박스 변경 이벤트에 대한 리스너 등록
  allergyCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      updateSelectedAllergies();
      updateMenuWithSelectedAllergies();
    });
  });

  // 선택된 알러지를 localStorage에 저장하는 함수
  function updateSelectedAllergies() {
    const selectedCheckboxes = document.querySelectorAll(
      'input[name="allergies[]"]:checked'
    );
    const selectedAllergies = Array.from(selectedCheckboxes).map(
      (checkbox) => checkbox.value
    );
    localStorage.setItem(
      "selectedAllergies",
      JSON.stringify(selectedAllergies)
    );
  }
});

// 메뉴를 선택된 알러지에 따라 스타일을 적용하여 업데이트하는 함수
function updateMenuWithSelectedAllergies() {
  document.getElementById("breakfast-cell").innerHTML =
    convertSelectedAllergyNameToRed(breakfastMenu);
  document.getElementById("lunch-cell").innerHTML =
    convertSelectedAllergyNameToRed(lunchMenu);
  document.getElementById("dinner-cell").innerHTML =
    convertSelectedAllergyNameToRed(dinnerMenu);
}

function convertSelectedAllergyNameToRed(menu) {
  const selectedCheckboxes = document.querySelectorAll(
    'input[name="allergies[]"]:checked'
  );
  const selectedAllergies = Array.from(selectedCheckboxes).map(
    (checkbox) => checkbox.value
  );

  for (let i = Object.keys(allergyNames).length; i > 0; i--) {
    const allergyName = allergyNames[i];
    const isSelected = selectedAllergies.includes(i.toString());

    // 선택된 알러지에 대한 스타일 추가
    if (isSelected) {
      menu = menu.replaceAll(
        allergyName,
        `<span style="color: red;">${allergyName}</span>`
      );
    } else {
      menu = menu.replaceAll(i, allergyName);
    }
  }
  return menu;
}
