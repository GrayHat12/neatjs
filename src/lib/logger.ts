import Neat from "../Neat";

export type LOG_MODE = "DEBUG" | "NORMAL";

function Log(...data: any[]) {
    if (Neat.MODE === "DEBUG") console.log(...data);
}

export default Log;