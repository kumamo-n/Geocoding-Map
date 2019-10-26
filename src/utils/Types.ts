export function isNumber(value: any): value is number {
     return typeof value == 'number'
}

export function isArray<T extends any>(args:any): args is T[] {
     return Array.isArray(args)
}

export function isObject(value: any): value is Object {
     return typeof value === 'object'
}

export function isNull(value: any): value is null {
     return typeof  value === null
}

export function isString(value: any): value is null {
     return typeof  value === null
}
