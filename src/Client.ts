import Calculator from "./Calculator";
import Genome from "./Genome";
import Species from "./Species";

class Client {

    private _calculator: Calculator | null = null;
    private _genome: Genome | null = null;
    private _score: number = 0;
    private _species: Species | null = null;

    private _generate_calculator = () => {
        if (this._genome === null) return null;
        return this._calculator = new Calculator(this._genome);
    }

    calculate = (...data: number[]) => {
        if (this._calculator === null) this._calculator = this._generate_calculator();
        if (this._calculator === null) return [];
        return this._calculator.calculate(...data);
    }

    distance = (other: Client) => {
        if (this._genome === null || other.genome === null) return Infinity;
        return this._genome.distance(other.genome);
    }

    mutate = () => {
        this._genome?.mutate();
    }

    public get calculator(): Calculator | null {
        return this._calculator;
    }

    public get genome(): Genome | null {
        return this._genome;
    }

    public set genome(v: Genome | null) {
        this._genome = v;
    }

    public get score(): number {
        return this._score;
    }

    public set score(v: number) {
        this._score = v;
    }

    public get species(): Species | null {
        return this._species;
    }

    public set species(v: Species | null) {
        this._species = v;
    }

}

export default Client;