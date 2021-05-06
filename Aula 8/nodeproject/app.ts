import {Cat} from "./Cat";
import {Dog} from "./Dog";
import {Animal} from "./Animal";
import {Mammal} from "./Mammal";


let a = new Cat("Habitat1", "Family1", "Cat1", "MEOW1")
let b = new Cat("Habitat2", "Family4", "Cat2", "MEOW2")
let c = new Cat("Habitat3", "Family3", "Cat3", "MEOW3")
let d = new Cat("Habitat4", "Family2", "Cat4", "MEOW4")


a.talk();
b.show();

console.log("-------------------------------------------------------------");
let e = new Dog("Habitat1", "Race1", "Dog1", "BARK1")
let f = new Dog("Habitat2", "Race2", "Dog2", "BARK2")
let g = new Dog("Habitat3", "Race3", "Dog3", "BARk3")

f.talk();
g.show();


console.log("There Are " + Animal.nAnimals + " Animals");
console.log("There Are " + Mammal.nMammals + " Mammals");