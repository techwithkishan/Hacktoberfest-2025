import requests
import pyttsx3

api_key = "9fdf033110da55906d806860f535a5ea"
city = input("Enter the name of city: ")

url = f"https://api.openweathermap.org/data/2.5/weather?units=metric&q={city}&appid={api_key}"
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    temp = data["main"]["temp"]
    text = f"The temperature in {city} is {temp} degrees Celsius."

    # Speak the result
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()
else:
    print("Could not fetch weather data:", response.json().get("message"))
