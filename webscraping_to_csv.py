import requests
from bs4 import BeautifulSoup
import pandas as pd

url = "https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=blBI&pkid=682&os=24931050&qvt=0&query=%EC%83%81%EC%82%B0%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90%20%EA%B8%89%EC%8B%9D%EC%8B%9D%EB%8B%A8"
req = requests.get(url)

if req.status_code == 200:
    soup = BeautifulSoup(req.content, "html.parser")
    # 급식 정보가 있는 부분을 찾아서 가져옵니다
    급식정보 = soup.find_all('div', class_='timeline_box')

    # 급식 정보를 리스트에 저장
    급식정보_list = [item.text for item in 급식정보]

    # 데이터를 DataFrame으로 변환
    df = pd.DataFrame(급식정보_list, columns=['급식정보'])

    # CSV 파일로 저장
    csv_filename = '급식정보.csv'  # 저장할 CSV 파일명
    df.to_csv(csv_filename, index=False)

    print('CSV 파일로 저장되었습니다:', csv_filename)
else:
    print("Request failed with status code:", req.status_code)
