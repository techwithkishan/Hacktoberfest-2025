import requests
import argparse

def get_weather(lat, lon):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
    res = requests.get(url).json()
    data = res.get("current_weather", {})
    print(f"🌤️ Temperature: {data.get('temperature')}°C")
    print(f"💨 Wind Speed: {data.get('windspeed')} km/h")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Get Weather Info")
    parser.add_argument("--lat", type=float, required=True)
    parser.add_argument("--lon", type=float, required=True)
    args = parser.parse_args()
    get_weather(args.lat, args.lon)
