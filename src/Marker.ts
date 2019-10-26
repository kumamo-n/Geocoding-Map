import {LatLng, ILatLng} from "./LatLng";
import { JsonHelper} from "./utils/JsonHelper";
import {isObject} from "./utils/Types"

enum FormatType  {
    HTML = 'html',
    TEXT = 'test'

}

export interface IApiResponse {
    count: number;
    data: IMarker[];
}

export interface IMarkerList<T> {
    origin: T | null;
    marker: Marker;
    display:  boolean

}

export function isIMarkerList<T>(args: any): args is IMarkerList<T> {
    return args !== null &&
        isObject(args) &&
        args.marker instanceof Marker;
}


export interface IMarker {
    id: string;
    url: string;
    label: string;
    description: string;
    description_format: string;
    feed: string;
    feed_flag: boolean;
    marker_display: boolean;
    coordinate: ILatLng;
}

export class Marker implements IMarker{

    coordinate = new LatLng(0, 0);
    description = "";
    description_format = "html";
    feed = "";
    feed_flag = false;
    id = "";
    label = "";
    marker_display = true;
    url = "";

    constructor(data: any) {


        const c = new JsonHelper(data)

        this.description = c.string('description', this.description);
        this.description_format = c.enum(FormatType, 'description_format', this.description_format);
        this.feed = c.string('feed', this.feed);
        this.feed_flag = c.boolean('feed_flag', this.feed_flag);
        this.label = c.string('label', this.label);
        this.id = c.string('id', this.id);
        this.marker_display = c.boolean('marker_display', this.marker_display);
        this.url = c.string('url', this.url);


        let coordinate = data['coordinate'];

        if (Array.isArray(coordinate)) {
            this.coordinate = new LatLng(coordinate);
        }

    }

    display() {
        return this.marker_display
    }

    content():string {
        if(!this.display()) {
            return  ''
        }

        if (this.feed_flag && this.feed !== "") {
            return `<iframe src="${this.feed}" style="border:0;"></iframe>`;
        } else if (this.description !== "") {
            let classes = "format-html";
            let content = this.description;

            if (this.description_format == FormatType.TEXT) {
                classes = "format-text";
                content = this.escapeHtml(content);
            }

            return `<section class="${classes}">${content}</section>`;
        }

        return "";

    }

    protected escapeHtml(text: string): string {
        return text
            .replace(/&/g, '&amp;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/`/g, '&#x60;')
            .replace(/\r?\n/g, '<br>');
    }

}
