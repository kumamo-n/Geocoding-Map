import {MapController} from "./MapController";
import {GeocodingMap} from "../GeocodingMap";
import {ILatLng, LatLng} from "../LatLng";
import {IMarker, IMarkerList} from "../Marker";


/// <reference path="../typings/Yahoo.d.ts" />
export class YahooMapController extends MapController<Y.Marker> {

    map: Y.Map

    private yc: any = []
    constructor(root: GeocodingMap) {
        super(root)

            this.map = new Y.Map(this.config.selector, {
            configure: {
                scrollWheelZoom: true,
                continuousZoom: true,
            }
        });

        this.yc.push(
            new Y.SliderZoomControlVertical(),
            new Y.LayerSetControl(),
        );

        this.map.drawMap(new Y.LatLng(this.config.center.lat, this.config.center.lng), this.getZoom(), Y.LayerSetId.NORMAL)

        for (let index = 0; index < this.yc.length; index++) {
            this.map.addControl(this.yc[index]);
        }

        this.map.bind('moveend',() => {
            this.onMove()

        })

    }


    getZoom() {
        return this.map.getZoom()
    }


    setZoom(zoom:number) {
        this.map.setZoom(zoom, true, this.map.getCenter(), true)
    }


    getCenter() {
        let center =  this.map.getCenter()
        return new LatLng(center.lat(), center.lng())
    }

    setCenter(coordinate: ILatLng) {
        this.map.drawMap(new Y.LatLng(coordinate.lat, coordinate.lng), this.getZoom(), Y.LayerSetId.NORMAL)
    }


    addMarker(marker: IMarker): IMarker {
        let m = this.createMarker(marker)

        if(m.origin === null) {
            m.origin = new Y.Marker( new Y.LatLng(m.marker.coordinate.lat,m.marker.coordinate.lng))

            m.origin.bind('click',() => {
                this.onClickEvent(m)

            })
        }

        if(!m.display && m.marker.display) {
            m.display = true
            this.map.addFeature(m.origin)
        }


        return m.marker
    }

    setUI(show:boolean) {

        for (let index = 0; index < this.yc.length; index++) {
            if (show) {
                this.map.addControl(this.yc[index]);
            } else {
                this.map.removeControl(this.yc[index]);
            }
        }
    }


    protected openModal(marker: IMarkerList<Y.Marker>) {
        const content = marker.marker.content()
        if (marker.origin instanceof Y.Marker && content !== "") {
            marker.origin.openInfoWindow(content);
        }

    }


}
