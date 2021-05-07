import { LightShader, ShaderGodRays } from "@orbitweb/renderer";
import { Filter } from "pixi.js";
import { GameManager } from "./GameManager";


type FilterHolder = {
    name: string,
    construct: any,
    shader: {
        v: string,
        f: string,
    }
}

type Replace = {
    source: string[],
    query: string,
    replaceWith: string
}

export class ShaderManager {
    
    private replacements: Replace[] = [
        {
            source: ["assets/shader/GodRayShader.frag", "assets/shader/Light.frag"],
            query: "${perlin}",
            replaceWith: "assets/shader/Perlin.frag"
        }
    ];


    private prototypes: FilterHolder[] = [
        {
            name: "GodRay",
            construct: ShaderGodRays.prototype.constructor,
            shader: {
                v: "assets/shader/Default.vert",
                f: "assets/shader/GodRayShader.frag"
            }
        },
        {
            name: "Light",
            construct: LightShader.prototype.constructor,
            shader: {
                v: "assets/shader/Default.vert",
                f: "assets/shader/Light.frag"
            }
        }
    ];

    private resources: Map<string, string> = new Map();

    constructor(private gameManager: GameManager) {
        let resources: string[] = [];

        resources = this.prototypes.reduce( (acc, cur) => {
            if ( acc.findIndex ( v => v === cur.shader.v) < 0)
                acc.push(cur.shader.v);

            if ( acc.findIndex ( v => v === cur.shader.f) < 0)
                acc.push(cur.shader.f);

            return acc;
        }, resources);

        resources = this.replacements.reduce( (acc, cur) => {

            if ( acc.findIndex ( v => v === cur.replaceWith) < 0)
                acc.push(cur.replaceWith);

            return acc;
        }, resources);

        resources.forEach ( res => {
            this.gameManager.loader.add(res, res);
        })

        this.gameManager.loader.load( (loader, res) => {
            for ( let key in res) {
                let data = res[key].data;

                this.replacements.filter( (r) => r.source.indexOf(key) >= 0).forEach( (r) => {
                    data = data.replace(r.query, res[r.replaceWith].data);
                });

                this.resources.set(key, data);
            }

            this.gameManager.postShaderLoaded();
        });

    }

    public createFilter(name: string, options): Filter {

        const shaderProto = this.prototypes.find ( p => p.name === name);
        
        if ( !shaderProto)
            return undefined;

        const v = this.resources.get(shaderProto.shader.v);
        const f = this.resources.get(shaderProto.shader.f);

        return new shaderProto.construct(v, f, options);
    }
}