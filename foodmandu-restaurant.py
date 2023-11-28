import pprint
import requests
from bs4 import BeautifulSoup

# url = "https://foodmandu.com/Restaurant/Details/1027"
# r = requests.get(url)
# soup = BeautifulSoup(r.text)

# menu_ul = soup.find("ul", {"class": "menu__items"})
# print(menu_ul)

url = "https://foodmandu.com/webapi/api/v2/Product/GetVendorProductsBySubCategoryV2?VendorId=1027&show="
r = requests.get(url)
all_menus = r.json()
print(r.text)

all_menus = all_menus[0]['items']

for menu in all_menus:
	print("name : ",  menu['name'], menu['price'])
