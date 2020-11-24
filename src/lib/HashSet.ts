class HashSet<T> {
    private _values: Map<T, boolean>;
    loadFactor: number;
    constructor(capacity: number = 0, loadFactor: number = 0, collection: any[] = []) {
        this.loadFactor = loadFactor;
        this._values = new Map<T, boolean>();
        for (let i = 0; i < collection.length; i++) {
            this.add(collection[i]);
        }
    }
    private _reinitialise = (capacity: number = 0, loadFactor: number = 0, collection: any[] = []) => {
        this.loadFactor = loadFactor;
        if (this._values) {
            this._values.clear();
        } else {
            this._values = new Map<T, boolean>();
        }
        for (let i = 0; i < collection.length; i++) {
            this.add(collection[i]);
        }
    }
    add = (val: T) => {
        this._values.set(val, true);
    }

    clear = () => {
        this._reinitialise();
    }

    get = (index: number) => {
        return [...this._values.keys()][index];
    }

    contains = (val: T) => {
        return this._values.has(val);
    }

    remove = (val: T) => {
        this._values.delete(val);
    }

    getValues = () => {
        return this._values.keys();
    }

    public get size(): number {
        return this._values.size;
    }

}

export default HashSet;