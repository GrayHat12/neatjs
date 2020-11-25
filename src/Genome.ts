import Calculator from "./Calculator";
import Connection from "./Connection";
import Log from "./lib/logger";
import RandomHashSet from "./lib/RandomHashSet";
import Neat from "./Neat";
import NodeGene from "./Node";

class Genome {
    private _connections: RandomHashSet<Connection> = new RandomHashSet<Connection>();
    private _nodes: RandomHashSet<NodeGene> = new RandomHashSet<NodeGene>();

    private _neat: Neat;

    constructor(neat: Neat) {
        this._neat = neat;
    }

    distance = (g2: Genome) => {
        let g1: Genome = new Genome(this._neat); // g1 should have higher innovation number than g2

        Object.assign(g1, this);

        //
        let highest_innovation_g1: number | undefined = 0;
        if (g1.connections.size() != 0) {
            highest_innovation_g1 = g1.connections.get(g1.connections.size() - 1)?.innovationNumber;
        }
        let highest_innovation_g2: number | undefined = 0;
        if (g2.connections.size() != 0) {
            highest_innovation_g2 = g2.connections.get(g2.connections.size() - 1)?.innovationNumber;
        }
        //

        if (!highest_innovation_g1 || !highest_innovation_g2) {
            Log("SAVE ME... We're all dead");
            return 0;
        }

        if (highest_innovation_g1 < highest_innovation_g2) {
            let temp = g1;
            g1 = g2;
            g2 = temp;
        }

        let index_g1: number = 0;
        let index_g2: number = 0;

        let disjoint = 0;
        let excess = 0;
        let wt_diff = 0;
        let wt_sim = 0;

        while (index_g1 < g1.connections.size() && index_g2 < g2.connections.size()) {
            let gene1 = g1.connections.get(index_g1);
            let gene2 = g2.connections.get(index_g2);

            if (gene1 === null || gene2 === null) {
                Log("This went very wrong.");
                break;
            }

            let inv1 = gene1.innovationNumber;
            let inv2 = gene2.innovationNumber;

            if (inv1 === inv2) {
                // similar gene
                wt_sim++;
                index_g1++;
                index_g2++;
                wt_diff += Math.abs(gene1.weight - gene2.weight);
            } else if (inv1 > inv2) {
                //disjoint gene of b
                disjoint++;
                index_g2++;
            } else {
                // disjoint gene of a
                disjoint++;
                index_g1++;
            }

        }

        wt_diff /= wt_sim;
        excess = g1.connections.size() - index_g1;

        let n = Math.max(g1.connections.size(), g2.connections.size());
        if (n < 20) {
            n = 1;
        }

        return this._neat.c1 * (disjoint / n) + this._neat.c2 * (excess / n) + this._neat.c3 * (wt_diff / n);
    }

    // g1 genome is better than g2 genome in terms of score
    static crossOver = (g1: Genome, g2: Genome) => {

        let neat = g1.neat;
        let childGenome = neat.empty_genome();

        let index_g1: number = 0;
        let index_g2: number = 0;
        while (index_g1 < g1.connections.size() && index_g2 < g2.connections.size()) {
            let gene1 = g1.connections.get(index_g1);
            let gene2 = g2.connections.get(index_g2);

            if (gene1 === null || gene2 === null) {
                Log("This went very wrong.");
                break;
            }

            let inv1 = gene1.innovationNumber;
            let inv2 = gene2.innovationNumber;

            if (inv1 === inv2) {
                // similar gene
                if (Math.random() > 0.5) {
                    childGenome.connections.add(Neat.getConnection(gene1));
                } else {
                    childGenome.connections.add(Neat.getConnection(gene2));
                }
                index_g1++;
                index_g2++;
            } else if (inv1 > inv2) {
                //disjoint gene of b
                childGenome.connections.add(Neat.getConnection(gene2));
                index_g2++;
            } else {
                // disjoint gene of a
                childGenome.connections.add(Neat.getConnection(gene1));
                index_g1++;
            }

        }
        while (index_g1 < g1.connections.size()) {
            let gene1 = g1.connections.get(index_g1);
            if (gene1 === null) {
                Log("This went horribly wrong.");
                break;
            }
            childGenome.connections.add(Neat.getConnection(gene1));
            index_g1++;
        }
        let data = g1.connections.data;
        for (let i = 0; i < data.length; i++) {
            let c = data[i];
            childGenome.nodes.add(c.from);
            childGenome.nodes.add(c.to);
        }
        return childGenome;
    }

    mutate = () => {
        if (this.neat.PROBABILITY_MUTATE_LINK > Math.random()) {
            this.mutate_link();
        }
        if (this.neat.PROBABILITY_MUTATE_NODE > Math.random()) {
            this.mutate_node();
        }
        if (this.neat.PROBABILITY_MUTATE_TOGGLE_LINK > Math.random()) {
            this.mutate_link_toggle();
        }
        if (this.neat.PROBABILITY_MUTATE_WEIGHT_RANDOM > Math.random()) {
            this.mutate_weight_random();
        }
        if (this.neat.PROBABILITY_MUTATE_WEIGHT_SHIFT > Math.random()) {
            this.mutate_weight_shift();
        }
    };

    mutate_link = () => {
        for (let i = 0; i < 100; i++) {
            let a = this.nodes.random_element();
            let b = this.nodes.random_element();
            if (a === null || b === null) continue;
            if (a.x === b.x) continue;
            let con: Connection;
            if (a.x < b.x) {
                con = new Connection(a, b);
            } else {
                con = new Connection(b, a);
            }
            if (this.connections.contains(con)) {
                continue;
            }
            con = this.neat.getConnection(con.from, con.to);
            con.weight = (Math.random() * 2 - 1) * this.neat.WEIGHT_RANDOM_STRENGTH;
            this.connections.addSorted(con);
            return;
        }
    };

    mutate_node = () => {
        let con = this.connections.random_element();
        if (con === null) return;
        let from = con.from;
        let to = con.to;
        let middle = this.neat.getNode();
        if (middle === null) return;
        middle.x = (from.x + to.x) / 2;
        middle.y = (from.y + to.y) / 2 + Math.random() * 0.1 - 0.05;
        let con1 = this.neat.getConnection(from, middle);
        let con2 = this.neat.getConnection(middle, to);
        con1.weight = 1;
        con2.weight = con.weight;
        con2.setEnabled = con.isEnabled;
        this.connections.remove(con);
        this.connections.add(con1);
        this.connections.add(con2);
        this.nodes.add(middle);
    };

    mutate_weight_shift = () => {
        let connection = this.connections.random_element();
        if (connection === null) return;
        connection.weight = connection.weight + (Math.random() * 2 - 1) * this.neat.WEIGHT_SHIFT_STRENGTH;
    };

    mutate_weight_random = () => {
        let connection = this.connections.random_element();
        if (connection === null) return;
        connection.weight = (Math.random() * 2 - 1) * this.neat.WEIGHT_RANDOM_STRENGTH;
    };

    mutate_link_toggle = () => {
        let connection = this.connections.random_element();
        if (connection === null) return;
        connection.setEnabled = !connection.isEnabled;
    };

    public get connections(): RandomHashSet<Connection> {
        return this._connections;
    }

    public get nodes(): RandomHashSet<NodeGene> {
        return this._nodes;
    }

    public get neat(): Neat {
        return this._neat;
    }

}

export default Genome;