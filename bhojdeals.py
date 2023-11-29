import pprint
import requests
from bs4 import BeautifulSoup
import csv


class BhojdealsScraper:

	def __init__(self):
		self.url = "https://www.bhojdeals.com/api/?version=5&tag=restaurant_menu_detail"

	def scrape_menu(self, payload):
		headers = {
			'Token': 'w%Lf7DoI*9Pu*Amm^*64g08VRQyjZ_QG'
			#'Cookie': '_fbp=fb.1.1701224594794.953284942; PHPSESSID=4s1bseorp975qh43gf82o1u0v7'
		}
		r = requests.post(self.url, headers=headers, json=payload)
		print(r.text)
		

s = BhojdealsScraper()
request_payload = {"restaurant_id":"361","latitude":0,"longitude":0}
s.scrape_menu(request_payload)

