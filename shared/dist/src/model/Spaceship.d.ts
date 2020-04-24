import { Particle } from "./Particle";
export declare class Spaceship extends Particle {
    id: any;
    color: string;
    maxSpeed: number;
    curSpeed: number;
    get acceleration(): number;
    timeToMaxSpeed: number;
    shipSize: number;
    speedInput: number;
    maxOmega: number;
    private _targetPlayer;
    set targetPlayer(target: Spaceship);
    get targetPlayer(): Spaceship;
    orbitRadius: number;
    actionOrbitTarget: boolean;
    actionKeepAtRange: boolean;
    health: number;
    constructor(id: any, color: any);
    removeTarget(): void;
    renderTargeting(): void;
}
//# sourceMappingURL=Spaceship.d.ts.map