class RMap1<T> {
    private body: T;
    public constructor(v: T) {
        this.body = v;
    }
    public is_map(): this is RMap2<T> {
        return false;
    }
    public get(): T {
        return this.body;
    }
    public set(v: T) {
        this.body = v;
    }
    public map<U>(f: (arg: T) => U): RMap<U>;
    public map<U>(
        f: (arg: T, key: string, full_key: string) => U,
        key: string,
        full_key: string,
    ): RMap<U>;
    public map<U>(
        f: (arg: T, key: string, full_key: string) => U,
        key?: string,
        full_key?: string,
    ): RMap<U> {
        if (key !== undefined) return new RMap1(f(this.body, key!, full_key!));
        return new RMap1(f(this.body, "", ""));
    }
    public async map_async<U>(f: (arg: T) => Promise<U>): Promise<RMap<U>>;
    public async map_async<U>(
        f: (arg: T, key: string, full_key: string) => Promise<U>,
        key: string,
        full_key: string,
    ): Promise<RMap<U>>;
    public async map_async<U>(
        f: (arg: T, key: string, full_key: string) => Promise<U>,
        key?: string,
        full_key?: string,
    ): Promise<RMap<U>> {
        if (key !== undefined)
            return new RMap1(await f(this.body, key!, full_key!));
        return new RMap1(await f(this.body, "", ""));
    }
    public as_val(): RMap1<T> {
        return this;
    }
    public as_map(): RMap2<T> {
        throw new Error();
    }
}

class RMap2<T> {
    private body: Map<string, RMap<T>>;
    public constructor(v: Map<string, RMap<T>>) {
        this.body = v;
    }
    public is_map(): this is RMap2<T> {
        return true;
    }
    public map<U>(f: (arg: T, key: string, full_key: string) => U): RMap<U> {
        return this.map2(f, "");
    }
    public async map_async<U>(
        f: (arg: T, key: string, full_key: string) => Promise<U>,
    ): Promise<RMap<U>> {
        return this.map_async2(f, "");
    }
    private map2<U>(
        f: (arg: T, key: string, full_key: string) => U,
        r_path: string,
    ): RMap<U> {
        const body = this.body;
        const n_m = new Map<string, RMap<U>>();
        body.forEach((v, k) => {
            const f_k = r_path ? `${r_path}/${k}` : k;
            if (v.is_map()) {
                n_m.set(k, v.map2(f, f_k));
            } else {
                n_m.set(k, v.map(f, k, f_k));
            }
        });
        return new RMap2<U>(n_m);
    }
    private async map_async2<U>(
        f: (arg: T, key: string, full_key: string) => Promise<U>,
        r_path: string,
    ): Promise<RMap<U>> {
        const body = this.body;
        const n_m = new Map<string, RMap<U>>();
        const promises: Promise<unknown>[] = [];
        body.forEach(async (v, k) => {
            const f_k = r_path ? `${r_path}/${k}` : k;
            const p = v.is_map()
                ? v.map_async2(f, f_k)
                : v.map_async(f, k, f_k);
            promises.push(p);
            n_m.set(k, await p);
        });
        return new RMap2<U>(n_m);
    }
    public set(k: string, v: T | RMap<T>) {
        if (v instanceof RMap1 || v instanceof RMap2) {
            this.body.set(k, v);
        } else {
            this.body.set(k, new RMap1(v));
        }
    }
    public has(k: string) {
        return this.body.has(k);
    }
    public get(k: string) {
        return this.body.get(k);
    }
    public raw() {
        return this.body;
    }
    public delete(k: string) {
        this.body.delete(k);
    }
    public forEach(
        f: (value: T, key: string, full_key: string, map: RMap<T>) => void,
    ) {
        this.for_each_2(f, "");
    }

    private for_each_2(
        f: (value: T, key: string, full_key: string, map: RMap<T>) => void,
        r_path: string,
    ) {
        this.body.forEach((v, k) => {
            if (v.is_map()) {
                v.for_each_2(f, r_path ? `${r_path}/${k}` : k);
            } else {
                f(v.get(), k, r_path ? `${r_path}/${k}` : k, this);
            }
        });
    }
    public as_val(): RMap1<T> {
        throw new Error();
    }
    public as_map(): RMap2<T> {
        return this;
    }
}

export type RMap<T> = RMap2<T> | RMap1<T>;

type RMapObj = {
    new: (<T>() => RMap2<T>) &
        (<T>(v: T) => RMap1<T>) &
        (<T>(m: Map<string, RMap<T>>) => RMap2<T>);
};

export const RMap: RMapObj = {
    new: <T>(vm?: T | Map<string, RMap<T>>) => {
        if (vm === undefined) return new RMap2<T>(new Map()) as never;
        if (typeof vm === "object" && vm instanceof Map)
            return new RMap2<T>(vm) as never;
        return new RMap1<T>(vm) as never;
    },
};

export type Dir<T> = T | Map<string, Dir<T>>;
