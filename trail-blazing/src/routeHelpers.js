// This for generating the route Helper
// For testing, start with 5km
// Basically from the users current location, the map should be generating a random walking path of 5km
// Maybe draw the circumreference around the user and randomize the walking points around?
import * as turf from '@turf/turf';

export function calculateCircumference(radius = 5) {
    if (typeof radius !== 'number' || radius <= 0) {
        throw new Error('Invalid radius');
    }
    const circumference = 2 * Math.PI * radius;
    return circumference;
}

export function createPolygon() {
    // create a hexagon or other polygon to mimic a circle or the general radius of the circle
    const center = [-71.0589, 42.3601];
    const radius = 5;
    const options = {
        steps: 6, // number of sides
        units: 'kilometers' // can be changed to others
    };

    const polygon = turf.circle(center, radius, options);
    return polygon;
}

export function generateWaypoints(origin, distance) {
    if (!Array.isArray(origin) || origin.length !== 2) {
        throw new Error('Invalid origin');
    }
    if (typeof distance !== 'number' || distance <= 0) {
        throw new Error('Invalid distance');
    }

    const [lon, lat] = origin;
    const waypoints = [origin];
    const steps = 4;
    const circleboundary = createPolygon();

    for (let i = 1; i <= steps; i += 1) {
        let newcoordinates = [lon + 0.001 * i, lat + 0.001 * i];
        // let randomizeChecker = false
        // while (randomizeChecker == false) {
        //     if ((checkBoundary(circleboundary, newcoordinates)) !== true) {
        //         newcoordinates = createNewCoordinates(origin, newcoordinates);
        //     } else {
        //         randomizeChecker == true;
        //     }
        // }
        waypoints.push([lon + 0.001 * i, lat + 0.001 * i]);
    }
    waypoints.push(origin);
    console.log(waypoints);
    return waypoints;
}

export function checkBoundary(circle, coordinates) {
    var pt = turf.point([coordinates[0], coordinates[1]]);

    if (turf.booleanPointInPolygon(pt, circle) == true) {
        return true;
    } else {
        return false;
    }
}

// function idea (a bonus nice-to-have: make sure that the waypoints equate to the desired distance)

// next: translating the points to a route
export async function createRoute(waypoints) {
    const request = {
        coordinates: waypoints,
    };

    try {
        const response = await fetch('/api/directions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch route:', error);
        return null;
    }
}
// current problem: connection to the api is blocked for security reasons;
export function createNewCoordinates(origin, coordinates) {
    // const lat = random(origin[0]);
    // const lon = random(origin[1]);

    // if this isn't the best way, use the turf randomPoint
    return [lat, lon];
}
