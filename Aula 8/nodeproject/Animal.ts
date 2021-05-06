export class Animal {
    habitat: string;
    static nAnimals: number = 0;

    show(): void{
        console.log(this.habitat);
    }
    constructor(hab: string) {
        Animal.nAnimals++;
        this.habitat = hab;
    }
}







