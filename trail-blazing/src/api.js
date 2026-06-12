var api_key = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImZmMjlhOWU1ZWFlYTQ5ZDBhZmRjMTllMjAwYzA1MzcyIiwiaCI6Im11cm11cjY0In0='

export function callOpenRouteAPI ( { api_key, coordinates }) {

    let request = new XMLHttpRequest();

    request.open('POST', "https://api.openrouteservice.org/v2/directions/foot-walking");

    request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', api_key);

    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
        }
    };

    // const body = '{"coordinates":[[8.681495,49.41461],[8.686507,49.41943],[8.687872,49.420318]]}';
    const body = coordinates;
    request.send(body);

}