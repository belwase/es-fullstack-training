import pprint
import requests
from bs4 import BeautifulSoup
import csv


class FoodmanduScraper:

	def __init__(self):
		self.url = "https://foodmandu.com/webapi/api/v2/Product/GetVendorProductsBySubCategoryV2?VendorId={restaurant_id}&show="

	def scrape_menu(self, restaurant_id):
		url = self.url.format(restaurant_id=restaurant_id)
		r = requests.get(url)
		all_menus = r.json()
		all_menus = all_menus[0]['items']
		output = []
		for menu in all_menus:
			print("name : ",  menu['name'], menu['price'])
			tmp = {
				"name": menu['name'],
				"price": menu['price']
			}
			output.append(tmp)

		headers = output[0].keys()

		with open('foodmandu-menus.csv', 'w') as file_object:
		    dict_writer = csv.DictWriter(file_object, headers)
		    dict_writer.writeheader()
		    dict_writer.writerows(output)

		return all_menus

s = FoodmanduScraper()
s.scrape_menu(1027)
s.scrape_menu(1028)
