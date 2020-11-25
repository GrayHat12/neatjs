import Client from "./Client";
import Genome from "./Genome";
import RandomHashSet from "./lib/RandomHashSet";

class Species {

    private _clients: RandomHashSet<Client> = new RandomHashSet<Client>();
    private _representative: Client;
    private _score: number = 0;

    constructor(representative: Client) {
        this._representative = representative;
        this._representative.species = this;
        this._clients.add(representative);
    }

    put = (client: Client) => {
        if (this._representative.genome === null) return false;
        if (client.distance(this._representative) < this._representative.genome.neat.CP) {
            client.species = this;
            this._clients.add(client);
            return true;
        }
        return false;
    }

    force_put = (client: Client) => {
        client.species = this;
        this._clients.add(client);
    }

    kill = (percent: number) => {
        this._clients.data.sort((a, b) => a.score - b.score);
        for (let i = 0; i < percent * this._clients.size(); i++) {
            let ith = this._clients.get(i);
            if (ith === null) continue;
            ith.species = null;
            this._clients.remove(0);
        }
    }

    breed = () => {
        let c1 = this._clients.random_element();
        let c2 = this._clients.random_element();
        if (c1 === null || c2 === null || c1.genome === null || c2.genome === null)
            throw Error("i'm regretting typescript");
        if (c1.score > c2.score) return Genome.crossOver(c1.genome, c2.genome);
        return Genome.crossOver(c2.genome, c1.genome);
    }

    goExtinct = () => {
        for (let i = 0; i < this._clients.data.length; i++) {
            this._clients.data[i].species = null;
        }
    }

    evaluate_score = () => {
        let score = 0;
        for (let i = 0; i < this._clients.data.length; i++) {
            score += this._clients.data[i].score;
        }
        this._score = score / this._clients.data.length;
    }

    reset = () => {
        let re = this._clients.random_element();
        if (re === null) return;
        this._representative = re;
        for (let i = 0; i < this._clients.data.length; i++) {
            this._clients.data[i].species = null;
        }
        this._clients.clear();
        this._clients.add(this._representative);
        this._representative.species = this;
        this._score = 0;
    }

    size = () => this._clients.size();

    public get clients(): RandomHashSet<Client> {
        return this._clients;
    }

    public get representative(): Client {
        return this._representative;
    }

    public get score(): number {
        return this._score;
    }


}

export default Species;