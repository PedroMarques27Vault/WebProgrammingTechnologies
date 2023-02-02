import {Mammal} from "./Mammal";


export class Feline extends Mammal{
    static nFelines: number = 0;
    family: string;

    constructor(hab: string, family: string) {
        super(hab);
        Feline.nFelines++;
        this.family = family;
    }
    show(): void{
        console.log("There Are " + Feline.nFelines + " Felines" +
            " This One: Family="+this.family+";\n Habitat= " +this.habitat);
    }


}