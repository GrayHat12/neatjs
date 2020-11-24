import { ActivationFunction } from "./Activation";
import ConnectionInterface from "./ConnectionInterface";

class NodeInterface {
    private _x: number;
    private _output: number = 0;
    private _connections: ConnectionInterface[] = [];

    constructor(x: number) {
        this._x = x;
    }

    calculate = (activation: ActivationFunction) => {
        let sum = 0;
        for (let i = 0; i < this._connections.length; i++) {
            if (this._connections[i].isEnabled) {
                sum += this._connections[i].weight * this._connections[i].from.output;
            }
        }
        this._output = activation(sum);
    }

    compareTo = (o: NodeInterface) => {
        if (this._x > o._x) return -1;
        if (this._x < o._x) return 1;
        return 0;
    }

    public get x(): number {
        return this._x;
    }

    public get output(): number {
        return this._output;
    }

    public get connections(): ConnectionInterface[] {
        return this._connections;
    }

    public set x(v: number) {
        this._x = v;
    }

    public set output(v: number) {
        this._output = v;
    }

    public set connections(v: ConnectionInterface[]) {
        this._connections = v;
    }
}

export default NodeInterface;