import NodeInterface from "./NodeInterface";

class ConnectionInterface {
    private _from: NodeInterface;
    private _to: NodeInterface;

    private _weight: number;
    private _enabled: boolean = true;

    constructor(from: NodeInterface, to: NodeInterface) {
        this._from = from;
        this._to = to;
        this._weight = 0;
    }

    public get from(): NodeInterface {
        return this._from;
    }

    public set from(v: NodeInterface) {
        this._from = v;
    }

    public get to(): NodeInterface {
        return this._to;
    }

    public set to(v: NodeInterface) {
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
}

export default ConnectionInterface;