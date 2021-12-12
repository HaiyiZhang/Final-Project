import bottle
import json
import tickets

@bottle.route('/')
def index():
    return bottle.static_file("index.html", root="")


@bottle.route('/map.js')
def static():
 return bottle.static_file("map.js", root="")


@bottle.route('/tickets')
def get_tickets():
    return json.dumps(tickets.get_ticket_data("https://data.buffalony.gov/resource/ux3f-ypyc.json"))
    

bottle.run(host="0.0.0.0", port=8080, debug=True)