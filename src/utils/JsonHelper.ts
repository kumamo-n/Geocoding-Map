export class JsonHelper {

    private readonly data:any

    constructor(data:any) {
        this.data = data
    }

    public convert(key:string, default_value: any, nullable: boolean = false) {
        if(this.data[key] === undefined) {
            return nullable ? null : default_value
        }
        return this.data[key]
    }

    public number(key:string, default_value:any, nullable: boolean = false):number {
        let value = this.convert(key, default_value, nullable)

        if(value === null) {
            return value
        }
        return value

    }

    public string(key:string, default_value:any, nullable: boolean = false): string {
        let value = this.convert(key,default_value,nullable)
        if (value === null) {
            return value
        }
        return value
    }

    public boolean(key:string, default_value:any, nullable: boolean = false): boolean {
        let value = this.convert(key,default_value,nullable)
        if (value === null) {
            return value
        }
        return value
    }

    public enum(list:any, key:string,default_value:any,nullable:boolean = false):any {
        let value = this.convert(key, default_value,nullable)

        if (value ===null) {
            return value
        }

        let exists = Object.keys(list).filter(k => isNaN(Number(k))).filter(k => list[k] === value).length > 0

        return exists ? value : nullable ? null : default_value


    }


}
