import {Animal} from "./Animal";

export abstract class Reptile extends Animal {
    constructor(hab: string) {
        super(hab);
    }
}
