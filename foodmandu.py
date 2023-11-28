"""
Libraries required: 
pip install requests
pip install bs4
"""

import requests
from bs4 import BeautifulSoup

url = "https://foodmandu.com/"
r = requests.get(url)
source_code = r.text

soup = BeautifulSoup(source_code)

listing_div = soup.findAll("div", {
	"class": "listing"})

for listing in listing_div:
	print(listing.text.strip())
