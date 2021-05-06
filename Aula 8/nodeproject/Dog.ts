import {Canine} from "./Canine";


export class Dog extends Canine{
    static nDogs: number = 0;
    bark: string;
    name: string;

    show(): void{
        console.log("There Are " + Dog.nDogs + " Dogs\n" +
            " This One:\n Name="+this.name+";\n Family="+this.race+";\n Habitat= " +this.habitat);
    }

    constructor(hab: string, race: string, name: string, bark: string) {
        super(hab, race);
        Dog.nDogs++;
        this.name=name;
        this.bark = bark;
    }
    talk(): void{
        console.log(this.bark)
    }
}