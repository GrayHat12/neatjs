import Gene from "../Gene";
import HashSet from "./HashSet";

class RandomHashSet<T> {
    set: HashSet<T>;
    data: T[];
    constructor() {
        this.set = new HashSet<T>();
        this.data = [];
    }
    contains = (object: T) => {
        return this.set.contains(object);
    }
    random_element = () => {
        if (this.set.size > 0) {
            return this.data[Math.floor(Math.random() * this.size())];
        }
        return null;
    }
    size = () => {
        return this.data.length;
    }

    add = (object: T) => {
        if (!this.set.contains(object)) {
            this.set.add(object);
            this.data.push(object);
        }
    }

    addSorted = (gene: Gene) => {
        for (let i = 0; i < this.size(); i++) {
            let innovation = (<Gene><unknown>this.data[i]).innovationNumber;
            if (gene.innovationNumber < innovation) {
                this.data.push(<T><unknown>gene);
                this.set.add(<T><unknown>gene);
                return;
            }
        }
        this.data.push(<T><unknown>gene);
        this.set.add(<T><unknown>gene);
    }

    clear = () => {
        this.set.clear();
        this.data = [];
    }

    get = (index: number) => {
        if (index < 0 || index >= this.size()) return null;
        return this.data[index];
    }

    indexOf = (template: T) => {
        return this.data[this.data.indexOf(template)];
    }

    remove = (object: number | T) => {
        if (typeof object === "number") {
            if (object < 0 || object >= this.size()) return;
            this.set.remove(this.data[object]);
            this.data = this.data.filter((x, i) => i != object);
            return;
        }
        this.set.remove(object);
        this.data = this.data.filter(x => x != object);
    }

    sort = (compareFn: (a: T, b: T) => number) => {
        this.data.sort(compareFn);
        this.set.clear();
        for (let i = 0; i < this.data.length; i++) {
            this.set.add(this.data[i]);
        }
    }
}

export default RandomHashSet;