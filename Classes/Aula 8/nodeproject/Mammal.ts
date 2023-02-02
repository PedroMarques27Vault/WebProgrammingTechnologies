import {Animal} from "./Animal";

export class Mammal extends Animal{
    static nMammals: number = 0;

    show(): void{
        console.log("Mammal Lives In " +this.habitat);
    }

    constructor(hab: string) {
        super(hab);
        Mammal.nMammals++;
    }
}