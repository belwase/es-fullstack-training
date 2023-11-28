import requests
from bs4 import BeautifulSoup


class Daraz:


	def scrape_product(self, url):
		r = requests.get(url)
		soup = BeautifulSoup(r.text)
		print(soup)
		print(soup.title)

d = Daraz()
d.scrape_product("https://www.daraz.com.np/products/sel-roti-maker-machine-soli-by-salcko-premium-quality-i105485983-s1027290343.html?spm=a2a0e.11779170.just4u.13.287d2d2boX0EHs&scm=1007.28811.358859.0&pvid=75de5d03-b856-41bd-a1c5-70ba5430458f&clickTrackInfo=pvid%3A75de5d03-b856-41bd-a1c5-70ba5430458f%3Bchannel_id%3A0000%3Bmt%3Ahot%3Bitem_id%3A105485983%3B")