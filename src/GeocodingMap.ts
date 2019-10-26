import {fixConfig,IMapConfig} from "./MapConfig";
import {GoogleMapController} from "./controllers/GoogleMapController";
import {IMapController} from "./controllers/IMapController";
import {ILatLng} from "./LatLng";
import {YahooMapController} from "./controllers/YahooMapController";
import {IMarker} from "./Marker";


export interface IGeocodingMap {
    config: IMapConfig

    controller: IMapController

    getZoom():number;

    setZoom(zoom:number):void;

    getCenter():ILatLng;

    setCenter(coordinate: ILatLng):void;

    addMarker(marker: IMarker):IMarker;

    setUI(show:boolean):void

}


export class GeocodingMap implements IGeocodingMap{

    config: IMapConfig

    controller: IMapController

    constructor(params: IMapConfig) {
        this.config = fixConfig(params)


        switch (this.config.map_type) {
            case 'google':
                this.controller = new GoogleMapController(this)
                break;
            case 'yahoo':
                this.controller = new YahooMapController(this)
                break;

            default:
                throw new Error("Unable to initialize due to map type error.");

        }

    }

    getZoom():number {
        return this.controller.getZoom()
    }

    setZoom(zoom:number):void {
        return this.controller.setZoom(zoom)
    }

    getCenter():ILatLng {
        return this.controller.getCenter()
    }

    setCenter(coordinate: ILatLng):void {
        return this.controller.setCenter(coordinate)
    }

    addMarker(marker: IMarker):IMarker {
        return this.controller.addMarker(marker)
    }

    setUI(show: boolean):void {
        return this.controller.setUI(show)
    }

}
