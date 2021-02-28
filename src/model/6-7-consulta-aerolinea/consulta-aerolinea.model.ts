import { Deserializable } from "./deserializable.model";
// solo devuelve un DataSource, deve devolver 2
export class ConsultaAerolinea {
    aerolinea: string;
    count: number;
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    setValuesInstanceUpdate(_aerolinea, _count) {
        this.aerolinea = _aerolinea;
        this.count = _count;
    }
}