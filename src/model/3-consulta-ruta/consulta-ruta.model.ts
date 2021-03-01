import { Deserializable } from "./deserializable.model";
// solo devuelve un DataSource, deve devolver 2
export class ConsultaRuta {
    countLl: number;
    countSal: number;
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    setValuesInstanceUpdate(_countLl, _countSal) {
        this.countLl = _countLl;
        this.countSal = _countSal;
    }
}