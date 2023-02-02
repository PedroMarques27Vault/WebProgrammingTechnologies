import {Feline} from "./Feline";

export class Cat extends Feline{
    static nCats: number = 0;
    meow: string;
    name: string;

    show(): void{
        console.log("There Are " + Cat.nCats + " Cats\n" +
            " This One: \n Name="+this.name+";\n Family="+this.family+";\n Habitat= " +this.habitat);
    }

    constructor(hab: string, family: string, name: string, meow: string) {
        super(hab, family);
        Cat.nCats++;
        this.name=name;
        this.meow = meow;
    }
    talk(): void{
        console.log(this.meow)
    }
}