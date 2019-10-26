import {ILatLng} from "./LatLng";

export enum MapType  {
    GoogleMap = 'google',
    YahooMap ='yahoo'
}

export interface IMapConfig {
    map_type: MapType;

    center: ILatLng;

    zoom: number;

    selector: string;

    show_ui: boolean;

    show_info: boolean;

    api_url: string;

    grid: number;

    lazy_load: number;

}


export function fixConfig(params: IMapConfig) {

    const def: IMapConfig = {
        map_type: MapType.GoogleMap,

        center: {lat:35.681236,lng:139.767125},
        zoom: 10,

        selector: 'map',

        show_ui: true,

        show_info: true,

        api_url: 'http://localhost:8888/response.php',

        grid: 5,

        lazy_load: 1000,

    }

    const config = {
        ...def,
        ...params
    }

    return config

}

