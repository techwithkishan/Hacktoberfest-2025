import requests
from bs4 import BeautifulSoup
import pandas as pd

search_product = "laptop"
url = f"https://www.amazon.in/s?k={search_product.replace(' ', '+')}"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/114.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9"
}

response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.content, "html.parser")

product_names = []
product_prices = []
product_ratings = []
product_links = []

for item in soup.find_all("div", {"data-component-type": "s-search-result"}):
    # Product name
    try:
        name = item.h2.text.strip()
    except AttributeError:
        name = "N/A"
    product_names.append(name)

    # Product link
    try:
        link_tag = item.h2.a
        if link_tag:
            link = "https://www.amazon.in" + link_tag['href']
        else:
            link = "N/A"
    except Exception:
        link = "N/A"
    product_links.append(link)

    # Product price
    try:
        price = item.find("span", "a-price-whole").text.strip()
    except AttributeError:
        price = "N/A"
    product_prices.append(price)

    # Product rating
    try:
        rating = item.find("span", "a-icon-alt").text.split()[0]
    except AttributeError:
        rating = "N/A"
    product_ratings.append(rating)

# Save to CSV
df = pd.DataFrame({
    "Name": product_names,
    "Price (INR)": product_prices,
    "Rating": product_ratings,
    "Link": product_links
})

df.to_csv("amazon_products.csv", index=False)
print("Scraping complete! Saved to amazon_products.csv")
