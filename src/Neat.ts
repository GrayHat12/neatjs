import Connection from "./Connection";
import Genome from "./Genome";
import Log, { LOG_MODE } from "./lib/logger";
import CustomMap from "./lib/Map";
import RandomHashSet from "./lib/RandomHashSet";
import NodeGene from "./Node";

class Neat {
    static MAX_NODES = Math.pow(2, 20);
    static MODE: LOG_MODE = "NORMAL";

    private _allConnections: CustomMap<Connection, Connection> = new CustomMap<Connection, Connection>();
    private _allNodes: RandomHashSet<NodeGene> = new RandomHashSet<NodeGene>();

    private _WEIGHT_SHIFT_STRENGTH = 0.3;
    private _WEIGHT_RANDOM_STRENGTH = 1;
    private _PROBABILITY_MUTATE_LINK = 0.2;
    private _PROBABILITY_MUTATE_NODE = 0.2;
    private _PROBABILITY_MUTATE_WEIGHT_SHIFT = 0.2;
    private _PROBABILITY_MUTATE_WEIGHT_RANDOM = 0.2;
    private _PROBABILITY_MUTATE_TOGGLE_LINK = 0.2;

    private _input_size: number = 0;
    private _max_clients: number = 0;
    private _output_size: number = 0;

    private _c1 = 1;
    private _c2 = 1;
    private _c3 = 1;


    constructor(input_size: number, output_size: number, clients: number, mode: LOG_MODE = "NORMAL") {
        Neat.MODE = mode;
        this.reset(input_size, output_size, clients);
    }

    empty_genome = () => {
        let genome = new Genome(this);
        for (let i = 0; i < this._input_size + this._output_size; i++) {
            let node = this.getNode(i + 1);
            if (node === null) {
                continue;
            };
            genome.nodes.add(node);
        }
        return genome;
    }

    reset = (input_size: number, output_size: number, clients: number) => {
        this._input_size = input_size;
        this._output_size = output_size;
        this._max_clients = clients;

        this._allConnections.clear();
        this._allNodes.clear();

        for (let i = 0; i < input_size; i++) {
            let n = this.getNode();
            if (n === null) continue;
            Log("input", i, n);
            n.x = 0.1;
            n.y = (i + 1) / (input_size + 1);
        }

        for (let i = 0; i < output_size; i++) {
            let n = this.getNode();
            if (n === null) continue;
            Log("output", i, n);
            n.x = 0.9;
            n.y = (i + 1) / (output_size + 1);
        }
    }

    static getConnection = (connection: Connection) => {
        let newconnection = new Connection(connection.from, connection.to);
        newconnection.innovationNumber = connection.innovationNumber;
        newconnection.weight = connection.weight;
        newconnection.setEnabled = connection.isEnabled;
        return newconnection;
    }

    getConnection = (node1: NodeGene, node2: NodeGene) => {
        let connection = new Connection(node1, node2);
        if (this._allConnections.contains(connection)) {
            let matchedConnection = this._allConnections.getFromKey(connection);
            Log("has connection", connection, "matched", matchedConnection);
            if (matchedConnection) {
                connection.innovationNumber = matchedConnection.innovationNumber;
            }
        }
        else {
            Log("does not have connection", connection);
            connection.innovationNumber = this._allConnections.size + 1;
            this._allConnections.set(connection, connection);
        }
        return connection;
    }

    getNode = (id?: number): NodeGene | null => {
        if (typeof id === "undefined") {
            let node = new NodeGene(this._allNodes.size() + 1);
            this._allNodes.add(node);
            return node;
        }
        if (id <= this._allNodes.size() && id >= 0) {
            return this._allNodes.get(id - 1);
        }
        return this.getNode();
    }

    public get c1(): number {
        return this._c1;
    }

    public get c2(): number {
        return this._c2;
    }

    public get c3(): number {
        return this._c3;
    }

    public get WEIGHT_SHIFT_STRENGTH(): number {
        return this._WEIGHT_SHIFT_STRENGTH;
    }

    public get WEIGHT_RANDOM_STRENGTH(): number {
        return this._WEIGHT_RANDOM_STRENGTH;
    }

    public get PROBABILITY_MUTATE_LINK(): number {
        return this._PROBABILITY_MUTATE_LINK;
    }

    public get PROBABILITY_MUTATE_NODE(): number {
        return this._PROBABILITY_MUTATE_NODE;
    }

    public get PROBABILITY_MUTATE_WEIGHT_SHIFT(): number {
        return this._PROBABILITY_MUTATE_WEIGHT_SHIFT;
    }

    public get PROBABILITY_MUTATE_WEIGHT_RANDOM(): number {
        return this._PROBABILITY_MUTATE_WEIGHT_RANDOM;
    }

    public get PROBABILITY_MUTATE_TOGGLE_LINK(): number {
        return this._PROBABILITY_MUTATE_TOGGLE_LINK;
    }
}

export default Neat;