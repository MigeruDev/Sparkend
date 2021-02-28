import { Deserializable } from "./deserializable.model";
// solo devuelve un DataSource, deve devolver 2
export class ConsultaRuta {
    count: number;
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    setValuesInstanceUpdate(_count) {
        this.count = _count;
    }
}