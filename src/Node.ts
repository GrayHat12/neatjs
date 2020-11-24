import Gene from "./Gene";

class NodeGene extends Gene {
    private _x: number;
    private _y: number;

    constructor(innovationNumber: number) {
        super(innovationNumber);
        this._x = 0;
        this._y = 0;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public set x(v: number) {
        this._x = v;
    }

    public set y(v: number) {
        this._y = v;
    }

    equals = (object: any) => {
        if (!(object instanceof NodeGene)) {
            return false;
        }
        return this._innovationNumber === object.innovationNumber;
    }

    hashCode = () => {
        return this._innovationNumber;
    }

}

export default NodeGene;