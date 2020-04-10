import populartimes
import json

data = populartimes.get_id("AIzaSyAmMhKrT7FzP2csp881g__Aq47mOP1uWaM", "ChIJSYuuSx9awokRyrrOFTGg0GY")

with open('data.json', 'w') as outfile:
    json.dump(data, outfile, indent=4)

with open("data.json", "r+") as f:
    old = f.read()
    f.seek(0)
    f.write("data = \n" + old)