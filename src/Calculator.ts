import Genome from "./Genome";
import Log from "./lib/logger";
import { sigmoid } from "./util/Activation";
import ConnectionInterface from "./util/ConnectionInterface";
import NodeInterface from "./util/NodeInterface";

class Calculator {
    input_nodes: NodeInterface[] = [];
    hidden_nodes: NodeInterface[] = [];
    output_nodes: NodeInterface[] = [];
    constructor(genome: Genome) {
        let nodes = genome.nodes;
        let cons = genome.connections;

        let nodeHashMap: Map<Number, NodeInterface> = new Map<Number, NodeInterface>();
        for (let i = 0; i < nodes.data.length; i++) {
            let n = nodes.data[i];
            let node = new NodeInterface(n.x);
            nodeHashMap.set(n.innovationNumber, node);
            if (n.x <= 0.1) {
                this.input_nodes.push(node);
            } else if (n.x >= 0.9) {
                Log("push", node);
                this.output_nodes.push(node);
            } else {
                this.hidden_nodes.push(node);
            }
            this.hidden_nodes.sort((a, b) => a.compareTo(b));
        }
        for (let i = 0; i < cons.data.length; i++) {
            let c = cons.data[i];
            let from = nodeHashMap.get(c.from.innovationNumber);
            let to = nodeHashMap.get(c.to.innovationNumber);
            if (!from || !to) continue;
            let con = new ConnectionInterface(from, to);
            con.weight = c.weight;
            con.setEnabled = c.isEnabled;

            to.connections.push(con);
        }
    }

    calculate = (...input: number[]) => {
        if (input.length != this.input_nodes.length)
            throw new Error(`mismatch input size. Expected ${this.input_nodes.length} and got ${input.length}`);
        for (let i = 0; i < this.input_nodes.length; i++) {
            this.input_nodes[i].output = input[i];
        }
        for (let i = 0; i < this.hidden_nodes.length; i++) {
            this.hidden_nodes[i].calculate(sigmoid);
        }
        let output: number[] = [];
        for (let i = 0; i < this.output_nodes.length; i++) {
            this.output_nodes[i].calculate(sigmoid);
            output.push(this.output_nodes[i].output);
            Log("debug", this.output_nodes[i]);
        }
        return output;
    }
}

export default Calculator;