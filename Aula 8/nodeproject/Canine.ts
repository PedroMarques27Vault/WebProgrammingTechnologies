import {Mammal} from "./Mammal";

export abstract class Canine extends Mammal{
    static nCanines: number = 0;
    race: string;

    constructor(hab: string, race: string) {
        super(hab);
        Canine.nCanines++;
        this.race = race;
    }

    show(): void{
        console.log("There Are " + Canine.nCanines + " Felines" +
            " This One: Race="+this.race+";\n Habitat= " +this.habitat);
    }
}
