const DEFAULT_WIDTH = 1400;

const objects = [
    { name: "Earth", pixels: 1 },
    { name: "Jupiter", pixels: 318 },
    { name: "Sun / White Dwarf", pixels: 333000 },
    { name: "Red Giant", pixels: 1500000 },
    { name: "Black Hole", pixels: 7000000 },
];

const container = document.getElementById("container");

for (const obj of objects) {
    const row = document.createElement("div");
    row.className = "row";

    const label = document.createElement("div");
    label.className = "label";
    label.textContent =
        `${obj.name}: ${obj.pixels.toLocaleString()}× Earth's mass`;

    const block = document.createElement("div");
    block.className = "block";

    const width = Math.min(obj.pixels, DEFAULT_WIDTH);
    const height = Math.ceil(obj.pixels / DEFAULT_WIDTH);

    block.style.width = `${width}px`;
    block.style.height = `${height}px`;

    row.appendChild(label);
    row.appendChild(block);

    container.appendChild(row);
}