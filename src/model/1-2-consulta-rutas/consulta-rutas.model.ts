import { Deserializable } from "./deserializable.model";

export class ConsultaRutas {
    origin: string;
    dest: string;
    count: number;
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    setValuesInstanceUpdate(_origin, _dest, _count) {
        this.origin = _origin;
        this.dest = _dest;
        this.count = _count;
    }
}