let flower = {
    name: "Fuscia",
    color: "pink",
    height: 12
};

flower.color = "blue";

flower.pollinators = [
    "bees",
    "birds",
    "butterflies"
];

flower.grow = function() {
if (flower.pollinators.length >= 4)
    flower.height++;
};

flower.grow();
console.log(flower.height + "before");

flower.pollinators.push("humans");
flower.grow();



console.log(flower.height + "after");