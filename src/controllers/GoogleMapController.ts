import {MapController} from "./MapController";
import {GeocodingMap} from "../GeocodingMap";
import {ILatLng, LatLng} from "../LatLng";
import { IMarker, IMarkerList} from "../Marker";


export class GoogleMapController extends MapController<google.maps.Marker>{

    map: google.maps.Map

    constructor(root: GeocodingMap) {
        super(root)

        const mapOption = {
            zoom:root.config.zoom,
            center: root.config.center,
            scrollwheel: true
        }

        const element = document.getElementById(this.config.selector)
        this.map = new google.maps.Map(element, mapOption)

        this.map.addListener('center_changed', () => {
            this.onMove()

        })

    }


    getZoom() {
        return this.map.getZoom()
    }


    setZoom(zoom:number) {
        return this.map.setZoom(zoom)
    }


    getCenter() {
        let center =  this.map.getCenter()
        return new LatLng(center.lat(), center.lng())
    }

    setCenter(coordinate: ILatLng) {
        return this.map.setCenter(new google.maps.LatLng(coordinate.lat, coordinate.lng))
    }


    addMarker(marker: IMarker): IMarker {
        let m = this.createMarker(marker)


        if (m.origin === null) {
            m.origin = new google.maps.Marker( {
                position: new google.maps.LatLng(m.marker.coordinate.lat,m.marker.coordinate.lng)
            })

            m.origin.addListener('click',() => {
                this.onClickEvent(m)

            })
        }

        if(!m.display && m.marker.display) {
            m.display = true
            m.origin.setMap(this.map)
        }

        return m.marker
    }


    setUI(show: boolean): void {
        this.map.setOptions({
            disableDefaultUI: !show
        });
    }

    protected openModal(marker: IMarkerList<google.maps.Marker>): void {
        const content = marker.marker.content();

        if (marker.origin instanceof google.maps.Marker && content !== "") {
            let info = new google.maps.InfoWindow({
                content: content,
            });

            info.open(this.map, marker.origin);
        }
    }

}
