import {isObject, isArray, isNull, isNumber} from "./utils/Types";

export interface ILatLng {
    lat:number
    lng:number
}



export function isLatLng(args: any): args is ILatLng {
    return !isNull(args) &&
        isObject(args) &&
        isNumber(args['lat']) &&
        isNumber(args['lng']);

}

export class LatLng implements  ILatLng {

    lat:number = 35
    lng:number = 135

    constructor(latitude:number, longitude:number);
    constructor(latitude: ILatLng);
    constructor(latitude: any[]);
    constructor(latitude?: number | ILatLng | any[] | null, longitude?: number | null) {

        if(isNumber(latitude) && isNumber(longitude)) {
            this.lat = latitude
            this.lng = longitude
        } else if(isLatLng(latitude)) {
            this.lat = latitude.lat
            this.lng = latitude.lng
        } else if(isArray(latitude)) {
            this.lat = Number(latitude[0])
            this.lng = Number(latitude[1])
        }
    }

}
