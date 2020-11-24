class Gene {
    protected _innovationNumber: number;
    constructor(innovationNumber: number) {
        this._innovationNumber = innovationNumber;
    }

    public get innovationNumber(): number {
        return this._innovationNumber;
    }

    public set innovationNumber(v: number) {
        this._innovationNumber = v;
    }
}

export default Gene;