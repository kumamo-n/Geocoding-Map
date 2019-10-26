import {ILatLng} from "../LatLng";
import {IMarker} from "../Marker";

export abstract class IMapController {

    public abstract getZoom():number;

    public abstract setZoom(zoom:number):void;

    public abstract getCenter():ILatLng

    public abstract setCenter(coordinate: ILatLng):void;

    public abstract addMarker(marker: IMarker):IMarker;

    public abstract setUI(show:boolean):void

}
