export function isInstanceOfError(data: any): boolean {
    return "error" in data;
}

export function isInstanceOfSuccess(data: any): boolean {
    return !("error" in data);
}
