import {IMapController} from "./IMapController";
import {GeocodingMap} from "../GeocodingMap";
import {IMapConfig} from "../MapConfig";
import {Marker, IMarker, IMarkerList, IApiResponse, isIMarkerList} from "../Marker";
import {isString} from "../utils/Types";


export abstract class MapController<T> extends IMapController {

    root: GeocodingMap
    config: IMapConfig
    timer:any

    protected markers: {[key:string]: IMarkerList<T>;} = {}

    protected constructor(root: GeocodingMap) {
        super()
        this.root = root
        this.config = root.config
    }


    protected onMove()  {
        clearTimeout(this.timer)

        this.timer = setTimeout(() => {
            this.APIRequest()
        },this.config.lazy_load)
    }


    protected APIRequest() {

        const centre = this.getCenter()
        const zoom = this.getZoom()
        const request_url = this.config.api_url + "?lat=" + centre.lat.toFixed(5) + "&lng=" + centre.lng.toFixed(5) + "&zoom=" + zoom;

        fetch(request_url)
            .then(response => {
                    return response.json()
            })
            .then(json =>
                this.onReceive(json)
            ).catch(() => {
                throw new Error("couldn't access the api_url")
            }
        )
    }


    protected onReceive(data: IApiResponse) {
        var marker =  data
            for (let index = 0; index < marker.data.length; index++) {
            this.addMarker(marker.data[index])
        }

    }

    protected onClickEvent(marker: IMarkerList<T>) {
        if(this.config.show_info) {
            this.openModal(marker)
        }
    }

    protected abstract openModal(marker: IMarkerList<T>):void

    protected createMarker(marker: IMarker):IMarkerList<T> {

        let new_marker = new Marker(marker)
        const current_marker = this.findMarker(new_marker)

        if (current_marker !== null) {
            return current_marker
        }


        return this.markers[new_marker.id] = {
            marker: new_marker,
            origin:null,
            display: false
        }
    }

    protected findMarker(target: Marker): IMarkerList<T> | null;
    protected findMarker(target: IMarkerList<T>): IMarkerList<T> | null;
    protected findMarker(target: string): IMarkerList<T> | null
    protected findMarker(target: string | Marker | IMarkerList<T>): IMarkerList<T> | null {

            let id: string = "";

            if (isString(target)) {
                id = target as string;
            } else if (target instanceof Marker) {
                id = target.id;
            } else if (isIMarkerList<T>(target)) {
                id = target.marker.id;
            }

            if (id === "" || this.markers[id] === undefined) {
                return null;
            }

            return this.markers[id];
        }



}
