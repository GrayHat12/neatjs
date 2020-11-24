import Gene from "./Gene";
import Neat from "./Neat";
import NodeGene from "./Node";

class Connection extends Gene {
    private _from: NodeGene;
    private _to: NodeGene;

    private _weight: number;
    private _enabled: boolean = true;

    constructor(from: NodeGene, to: NodeGene) {
        super(0);
        this._from = from;
        this._to = to;
        this._weight = 0;
    }

    public get from(): NodeGene {
        return this._from;
    }

    public set from(v: NodeGene) {
        this._from = v;
    }

    public get to(): NodeGene {
        return this._to;
    }

    public set to(v: NodeGene) {
        this._to = v;
    }

    public get weight(): number {
        return this._weight;
    }

    public set weight(v: number) {
        this._weight = v;
    }

    public get isEnabled(): boolean {
        return this._enabled;
    }

    public set setEnabled(v: boolean) {
        this._enabled = v;
    }

    equals = (object: any) => {
        if (!(object instanceof Connection)) return false;
        return this._from.equals(object._from) && this._to.equals(object._to);
    }

    hashCode = () => {
        return this._from.innovationNumber * Neat.MAX_NODES + this._to.innovationNumber;
    }

}

export default Connection;