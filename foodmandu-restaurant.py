import pprint
import requests
from bs4 import BeautifulSoup


url = "https://foodmandu.com/webapi/api/v2/Product/GetVendorProductsBySubCategoryV2?VendorId=1027&show="
r = requests.get(url)
all_menus = r.json()
print(r.text)

all_menus = all_menus[0]['items']

for menu in all_menus:
	print("name : ",  menu['name'], menu['price'])
