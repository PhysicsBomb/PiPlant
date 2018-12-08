import os
import time
from bs4 import BeautifulSoup
import urllib.request
from urllib.request import urlopen
from twilio.rest import Client

account_sid = "AC2a4c114dcb7f3adc2623514fd60bf614"

auth_token = "39a8a79e37ac8c8743b5bf8b606f4d21"

client = Client(account_sid, auth_token)

def extract(url, type, att_key, att_out):
    hdr = {'User-Agent': 'Mozilla/5.0','Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'}
    request = urllib.request.Request(url, headers = hdr)
    page = urllib.request.urlopen(request) #opens page
    soup = BeautifulSoup(page, 'html.parser') #parses HTML in python

    var = soup.find(type, attrs = {att_key:att_out}) #finds specific HTML code in HTML taken from a page
    #or find all types of the atributes: use soup.find(...)
    varstrp = var.text.strip() #strips variable to string data type
    varstrp = str(varstrp)
    return varstrp
weather = extract('https://search.yahoo.com/search?p=weather&fr=yfp-t&fp=1&toggle=1&cop=mss&ei=UTF-8', 'span', 'class', 'condition')
loc = extract('https://search.yahoo.com/search?p=weather&fr=yfp-t&fp=1&toggle=1&cop=mss&ei=UTF-8', 'p', 'class', 'txt')
temp = extract('https://search.yahoo.com/search?p=weather&fr=yfp-t&fp=1&toggle=1&cop=mss&ei=UTF-8', 'span', 'class', 'currTemp')

humidity = extract('https://search.yahoo.com/search?p=weather&fr=yfp-t&fp=1&toggle=1&cop=mss&ei=UTF-8', 'span', 'class', ' txt')

temp = int(temp)

if temp>80:
    t_rating = 'hot'
elif 60<temp<=80:
    t_rating = 'good'
elif temp<=60:
    t_rating = 'cold'



weather = str(weather)
loc = str(loc)
temp = str(temp)
humidity = str(humidity)
time = str(time.asctime())
print(weather)
print(loc)
print(temp)
print(humidity)


write_file = open('./PiPlant/bs4.json', 'w')
write_file.truncate()
txt = '{"weather":"' + weather + '","location":"' + loc + '","time":"' + time + '","humidity":"' + humidity + '","temp_rating":"' + t_rating + '","temperature":"' + temp + '"}'
write_file.write(txt)
write_file.close()

client.api.account.messages.create(
    to = '+16096085525',
    media_url='https://c1.staticflickr.com/5/4873/44415504720_0b8cb5aa12_o.jpg',
    from_= '+16312021829',

)

client.api.account.messages.create(
    to = '+16096085525',
    from_= '+16312021829',
    body = '''This is your PlantPi letting you know how your plant is doing!
            On ''' + time + ''', in ''' + loc + ''' the temperature is fairly ''' + t_rating + ''' at ''' + temp + '''°F. The humidity is ''' + humidity + ''' and the weather is ''' + weather + '''. That's it for this update! PlantPi will text you again soon!'''
)
