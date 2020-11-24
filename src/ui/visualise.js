let parent = document.getElementById("ui");

let rn_wt_button = document.createElement("button");
let wt_shift_button = document.createElement("button");
let lk_mutate_button = document.createElement("button");
let nd_mutate_button = document.createElement("button");
let on_off_button = document.createElement("button");
let mutate_button = document.createElement("button");
let calc_button = document.createElement("button");

function onRandomWeightClick(ev) { }
function onWeightShiftClick(ev) { }
function onLinkMutateClick(ev) { }
function onNodeMutateClick(ev) { }
function onOnOffClick(ev) { }
function onMutateClick(ev) { }
function onCalculateClick(ev) { }

function addEventListeners() {
    rn_wt_button.addEventListener("click", onRandomWeightClick);
    wt_shift_button.addEventListener("click", onWeightShiftClick);
    lk_mutate_button.addEventListener("click", onLinkMutateClick);
    nd_mutate_button.addEventListener("click", onNodeMutateClick);
    on_off_button.addEventListener("click", onOnOffClick);
    mutate_button.addEventListener("click", onMutateClick);
    calc_button.addEventListener("click", onCalculateClick);
}

function addButtons() {
    rn_wt_button.className = "op_bt";
    rn_wt_button.textContent = "Random Weight";
    parent.appendChild(rn_wt_button);

    wt_shift_button.className = "op_bt";
    wt_shift_button.textContent = "Weight Shift";
    parent.appendChild(wt_shift_button);

    lk_mutate_button.className = "op_bt";
    lk_mutate_button.textContent = "Link Mutate";
    parent.appendChild(lk_mutate_button);

    nd_mutate_button.className = "op_bt";
    nd_mutate_button.textContent = "Node Mutate";
    parent.appendChild(nd_mutate_button);

    on_off_button.className = "op_bt";
    on_off_button.textContent = "On/Off";
    parent.appendChild(on_off_button);

    mutate_button.className = "op_bt";
    mutate_button.textContent = "Mutate";
    parent.appendChild(mutate_button);

    calc_button.className = "op_bt";
    calc_button.textContent = "Calculate";
    parent.appendChild(calc_button);
}

function addCanvas() {
    let main = document.createElement("main");
    parent.appendChild(document.createElement("br"));
    parent.appendChild(main);
}

function setup() {
    createCanvas(800, 800);
}

function draw() {
    background(220);
}

addButtons();
addEventListeners();
addCanvas();