import Neat from "./Neat";
import { sigmoid } from "./util/Activation";
let neat = new Neat(3, 2, 100, "DEBUG");
let genome = neat.empty_genome();
console.log(genome.nodes.size());
for (let i = 0; i < 100; i++) {
    genome.mutate();
}
console.log(genome.calculate(1, 1, 1));
console.log(sigmoid(0));