class RMap1<T> {
    private body: T
    public constructor(v: T) {
        this.body = v;
    }
    public is_map(): this is RMap2<T> {
        return false;
    }
    public map<U>(f: (arg: T) => U): RMap<U> {
        return new RMap1(f(this.body));
    }
    public get(): T {
        return this.body;
    }
    public set(v: T) {
        this.body = v;
    }
    public async map_async<U>(f: (arg: T) => Promise<U>): Promise<RMap<U>> {
        return new RMap1(await f(this.body));
    }
}

class RMap2<T> {
    private body: Map<string, RMap<T>>
    public constructor(v: Map<string, RMap<T>>) {
        this.body = v;
    }
    public is_map(): this is RMap2<T> {
        return true;
    }
    public map<U>(f: (arg: T) => U): RMap<U> {
        const body = this.body;
        const n_m = new Map<string, RMap<U>>();
        body.forEach((v, k) => {
            n_m.set(k, v.map(f));
        })
        return new RMap2<U>(n_m);
    }
    public async map_async<U>(f: (arg: T) => Promise<U>): Promise<RMap<U>> {
        const body = this.body;
        const n_m = new Map<string, RMap<U>>();
        const promises: Promise<unknown>[] = [];
        body.forEach(async (v, k) => {
            const p = v.map_async(f);
            promises.push(p);
            n_m.set(k, await p);
        })
        return new RMap2<U>(n_m);
    }
    public set(k: string, v: T | RMap<T>) {
        if (v instanceof RMap1 || v instanceof RMap2) { this.body.set(k, v); }
        else {
            this.body.set(k, new RMap1(v));
        }
    }
    public has(k: string) {
        return this.body.has(k)
    }
    public get(k: string) {
        return this.body.get(k)
    }
    public delete(k: string) {
        this.body.delete(k)
    }
    public forEach(f: (value: T, key: string, map: RMap<T>) => void) {
        this.for_each_2(f, "");
    }

    private for_each_2(f: (value: T, key: string, map: RMap<T>) => void, r_path: string) {
        this.body.forEach((v, k) => {
            if (v.is_map()) {
                v.for_each_2(f, r_path ? `${r_path}/${k}` : k)
            } else {
                f(v.get(), r_path ? `${r_path}/${k}` : k, this);
            }
        })
    }
}

export type RMap<T> = RMap2<T> | RMap1<T>

type RMapObj = {
    new: (<T>() => RMap2<T>)
    & (<T>(v: T) => RMap1<T>)
    & (<T>(m: Map<string, RMap<T>>) => RMap2<T>)
}

export const RMap: RMapObj = {
    new: <T>(vm?: T | Map<string, RMap<T>>) => {
        if (vm === undefined) return new RMap2<T>(new Map()) as never;
        if (typeof vm === "object" && vm instanceof Map) return new RMap2<T>(vm) as never;
        return new RMap1<T>(vm) as never;
    }
}

export type Dir<T> = T | Map<string, Dir<T>>;