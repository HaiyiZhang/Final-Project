/*globals Plotly */
function loadMap(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var mapParams = data(this.response);
            var mapParams1 = data1(this.response);
            Plotly.plot('pie',mapParams);
            Plotly.plot('bar', mapParams1);
            }
        };
    xhttp.open("GET", "/tickets");
    xhttp.send();
}

function data(jdata){
    var x=JSON.parse(jdata);
    var data = [{
        values: [x[0], x[1], x[2], x[3], x[4]],
        labels: ['ELEMENTARY', 'HIGH', 'K-12', 'MIDDLE', 'MIDDLE/HIGH'],
        type: 'pie'
        }];
  return data;
}

function data1(jdata){
    var x = JSON.parse(jdata);
    var data = [
    {
    x: ['ELEMENTARY', 'HIGH', 'K-12', 'MIDDLE', 'MIDDLE/HIGH'],
    y: [x[5], x[6], x[7], x[8], x[9]], 
    type: 'bar'
  }
];

    return data;
}