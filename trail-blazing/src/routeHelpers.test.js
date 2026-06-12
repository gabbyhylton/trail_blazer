import { describe, it, expect } from "vitest";
import { generateWaypoints, calculateCircumference, createPolygon } from "./routeHelpers";
import { circle, geometry } from "@turf/turf";

describe("routeHelpers", () => {
    describe("generateWaypoints", () => {
        const origin = [-71.0589, 42.3601];

        it("returns an array", () => {
            const result = generateWaypoints(origin, 2);
            expect(Array.isArray(result)).toBe(true);
        });

        it("starts and ends at the origin", () => {
            const result = generateWaypoints(origin, 2);
            expect(result[0]).toEqual(origin);
            expect(result[result.length - 1]).toEqual(origin);
        });

        it("has at least 3 elements", () => {
            const result = generateWaypoints(origin, 2);
            expect(result.length).toBeGreaterThanOrEqual(3);
        });

        it("throws on invalid distance", () => {
            expect(() => generateWaypoints(origin, 0)).toThrow();
            expect(() => generateWaypoints(origin, -1)).toThrow();
        });

        it("throws on missing origin", () => {
            expect(() => generateWaypoints(null, 2)).toThrow();
        });

        it("generates points within the boundary circle", () => {

        });

        it("generates the expected distance", () => {

        });
    });
    
    describe("createPolygon", () => {
        it("returns a polygon", () => {
            const polygon = createPolygon();
            console.log("Polygon", polygon.geometry.coordinates);
            expect(polygon.geometry.type).toEqual("Polygon");
        });

        it("returns coordinates", () => {
            const polygon = createPolygon();
            expect(Array.isArray(polygon.geometry.coordinates)).toBe(true);
        });
    });
});