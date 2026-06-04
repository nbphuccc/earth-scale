const objects = [
    {
        name: "Earth",
        scale: 1
    },
    {
        name: "Jupiter",
        scale: 11.2
    },
    {
        name: "Sun",
        scale: 109
    }
];

const container = document.getElementById("container");

objects.forEach(obj => {
    const row = document.createElement("div");
    row.className = "row";

    const label = document.createElement("div");
    label.className = "label";
    label.textContent = `${obj.name} (${obj.scale}× Earth)`;

    const circle = document.createElement("div");
    circle.className = "circle";

    circle.style.width = `${obj.scale}px`;
    circle.style.height = `${obj.scale}px`;

    row.appendChild(label);
    row.appendChild(circle);

    container.appendChild(row);
});