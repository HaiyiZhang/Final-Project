import urllib.request
import json


def get_ticket_data(url):
    response = urllib.request.urlopen(url)
    content_string = response.read().decode()
    content = json.loads(content_string)
    arr2 = []
    for i in content:
        if "latitude" in i.keys():
            arr1 = []
            arr1.append(float(i['latitude']))
            arr1.append(float(i['longitude']))
            arr1.append(i['viodesc'])
            arr2.append(arr1)
    return json.dumps(arr2)
