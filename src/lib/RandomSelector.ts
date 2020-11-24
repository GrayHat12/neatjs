class RandomSelector<T> {

    private _objects: T[] = [];
    private _scores: number[] = [];
    private _total_score: number = 0;

    add = (element: T, score: number) => {
        this._objects.push(element);
        this._scores.push(score);
        this._total_score += score;
    }

    random = () => {
        let v = Math.random() * this._total_score;
        let c = 0;
        for (let i = 0; i < this._objects.length; i++) {
            c += this._scores[i];
            if (c > v) {
                return this._objects[i];
            }
        }
        return null;
    }

    reset = () => {
        this._objects = [];
        this._scores = [];
        this._total_score = 0;
    }
}

export default RandomSelector;