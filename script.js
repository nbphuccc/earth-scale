const DEFAULT_WIDTH = 1400;

const objects = [
    { name: "Earth", pixels: 1, color: "#4CAF50" },
    { name: "Jupiter", pixels: 318, color: "#D2B48C" },

    // ~0.6 solar masses
    { name: "Average White Dwarf", pixels: 200000, color: "#E6E6E6" },

    // ~1 solar mass
    { name: "Average Red Giant / Sun", pixels: 333000, color: "#FF4500" },

    // representative stellar black hole (~7.5 solar masses)
    { name: "Black Hole", pixels: 2500000, color: "#6A0DAD" },

    {
    name: "Intermediate-Mass Black Hole",
    pixels: 30000000, // ~100 solar masses (visual-friendly scaled representation)
    color: "#3A0CA3"
},

    {name: "Smallest Supermassive Black Hole", pixels: 33000000000, color: "#2E0854"}
];

const container = document.getElementById("container");

function format(n) {
    if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
    return n;
}

for (const obj of objects) {
    const row = document.createElement("div");
    row.className = "row";

    const label = document.createElement("div");
    label.className = "label";
    label.textContent = `${obj.name}: ${obj.pixels.toLocaleString()}× Earth`;

    const blockWrapper = document.createElement("div");
    blockWrapper.className = "block-wrapper";

    // block
    const block = document.createElement("div");
    block.className = "block";
    block.style.backgroundColor = obj.color;

    const width = Math.min(obj.pixels, DEFAULT_WIDTH);
    const height = Math.ceil(obj.pixels / DEFAULT_WIDTH);

    block.style.width = width + "px";
    block.style.height = height + "px";

    const noRuler = obj.name === "Earth" || obj.name === "Jupiter";

if (!noRuler) {
    const ruler = document.createElement("div");
    ruler.className = "ruler";
    ruler.style.height = height + "px";

    const isIntermediateBH = obj.name === "Intermediate-Mass Black Hole";
    const isSMBH = obj.name === "Smallest Supermassive Black Hole";

    if (isIntermediateBH) {
        const step = 500000; // 500k only for IMBH

        for (let value = 0; value <= obj.pixels; value += step) {
            const y = (value / obj.pixels) * height;

            const t = document.createElement("div");
            t.className = "tick";
            t.style.top = `${y}px`;

            const labelTick = document.createElement("div");
            labelTick.className = "tick-label";
            labelTick.style.top = `${y - 6}px`;
            labelTick.textContent = format(value);

            ruler.appendChild(t);
            ruler.appendChild(labelTick);
        }

    }
    if (isSMBH) {
        const step = 1000000; // 1M only for SMBH

        for (let value = 0; value <= obj.pixels; value += step) {
            const y = (value / obj.pixels) * height;

            const t = document.createElement("div");
            t.className = "tick";
            t.style.top = `${y}px`;

            const labelTick = document.createElement("div");
            labelTick.className = "tick-label";
            labelTick.style.top = `${y - 6}px`;
            labelTick.textContent = format(value);

            ruler.appendChild(t);
            ruler.appendChild(labelTick);
        }

    } else {
        const ticks = 5;

        for (let i = 0; i <= ticks; i++) {
            const y = (height * i) / ticks;

            const t = document.createElement("div");
            t.className = "tick";
            t.style.top = `${y}px`;

            const labelTick = document.createElement("div");
            labelTick.className = "tick-label";
            labelTick.style.top = `${y - 6}px`;

            const value = Math.round((obj.pixels * i) / ticks);
            labelTick.textContent = format(value);

            ruler.appendChild(t);
            ruler.appendChild(labelTick);
        }
    }

    blockWrapper.appendChild(ruler);
}

    blockWrapper.appendChild(block);

    row.appendChild(label);
    row.appendChild(blockWrapper);

    container.appendChild(row);

    // spacer = 1 screen height
const spacer = document.createElement("div");
spacer.style.height = "100vh";
container.appendChild(spacer);

// ----- navigation -----

const rows = [];
document.querySelectorAll(".row").forEach(row => rows.push(row));

let current = 0;

function getTop(el) {
    return el.getBoundingClientRect().top + window.scrollY;
}

function goTo(index) {
    const OFFSET = 100;

    current = Math.max(0, Math.min(rows.length - 1, index));

    window.scrollTo({
        top: Math.max(0, getTop(rows[current]) - OFFSET),
        behavior: "smooth"
    });
}

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;

    let nearest = 0;
    let bestDist = Infinity;

    rows.forEach((row, i) => {
        const dist = Math.abs(getTop(row) - scrollTop);

        if (dist < bestDist) {
            bestDist = dist;
            nearest = i;
        }
    });

    current = nearest;
});

const controls = document.createElement("div");
controls.className = "controls";

const prev = document.createElement("button");
prev.textContent = "Prev";
prev.onclick = () => goTo(current - 1);

const currentBtn = document.createElement("button");
currentBtn.textContent = "Current";
currentBtn.onclick = () => goTo(current);

const next = document.createElement("button");
next.textContent = "Next";
next.onclick = () => goTo(current + 1);

controls.appendChild(prev);
controls.appendChild(currentBtn);
controls.appendChild(next);

document.body.appendChild(controls);
}