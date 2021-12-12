function loadMap(){
    Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1IjoiaG9yYWNlZSIsImEiOiJjam82bmQxMGkwMmdyM2tscjZnZW9wcXhzIn0._LTY6vU955VaO-pWORCnjQ'
    });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var mapParams = getMapParams(this.response);
            Plotly.plot('map', mapParams.data, mapParams.layout);
        }
    };
    xhttp.open("GET", "/tickets");
    xhttp.send(); 
}



function setupMapData(array){
    var a = [];
    var b = [];
    var c = [];
    for(var i of array){
        a.push(i[0]);
        b.push(i[1]);       
        c.push(i[2]);
    }
    var data = [{
        type:'scattermapbox',
        lat:a,
        lon:b,
        mode:'markers',
        marker: {
            size:5,
            color:'rgb(255,0,0)'
            },
        text:c
    }];
    return data;
}



function findCenter(arr2){
    var arr4 = [];
    var max_lat = Number.NEGATIVE_INFINITY;
    var min_lat = Number.POSITIVE_INFINITY;
    var max_lon = Number.NEGATIVE_INFINITY;
    var min_lon = Number.POSITIVE_INFINITY;
    for(var i of arr2){
        if(i[0]>max_lat){
            max_lat=i[0];
        }
        if(i[0]<min_lat){
            min_lat=i[0];
        }
        if(i[1]>max_lon){
            max_lon=i[1];
        }
        if(i[1]<min_lon){
            min_lon=i[1];
        }
    }
    var a = (max_lat+min_lat)*0.5;
    var b = (max_lon+min_lon)*0.5;
    arr4.push(a);
    arr4.push(b);
    return arr4;
}

function setupMapLayout(arr2){
    var layout = {
        mapbox :{
        style : 'satellite-streets',
        zoom : 11,
        center : {
            lat : findCenter(arr2)[0],
            lon : findCenter(arr2)[1]
        }
    }
};
return layout;
}


function getMapParams(x){
    var y = JSON.parse(x);
    var d = setupMapData(y);
    var l = setupMapLayout(y);
    var map = {'data' : d,'layout' : l};
    return map;
}