import { MMKModel } from './../formulas/MMK.model';
import { Division } from './../../../utils/MathUtils';

export class CostMMK {
  readonly mmk: MMKModel;
  readonly time: number;

  ctte: number = 0;
  ctts: number = 0;
  cttse: number = 0;
  cts: number = 0;
  ct: number = 0;
 
  ctExercise: number = 0;

  constructor(mmk: MMKModel, time: number) {
    this.mmk = mmk;
    this.time = time;
  }

  /**
   * 
   * @param cs  Costo unitario por el servicio (Alquiler, Salario, funcionamiento, etc)
   * @param cts Costo unitario por tiempo en el sistema (Tiempo en el sistema de los clientes)
   */
  calculateExercise(cs: number, cts: number) {
    // this.ctExercise = (this.mmk.lambda * this.time * cts * this.mmk.w) + (this.mmk.k * cs * this.time);
    this.ctExercise = (this.mmk.lambda * this.time * cts * this.mmk.w) + (this.mmk.k * cs);
  }

  /**
   * 
   * @param cte  Costo unitario por tiempo en cola (Tiempo de espera de los clientes)
   * @param cts  Costo unitario por tiempo en el sistema (Tiempo en el sistema de los clientes)
   * @param ctse Costo unitario por tiempo en de servicio(Tiempo en el servicio de los clientes)
   * @param cs   Costo unitario por el servicio (Alquiler, Salario, funcionamiento, etc)
   */
  calculateAll(cte: number, cts: number, ctse: number, cs: number) {
    this.ctte = this.calculateCTTE(cte); // Costo diario por el tiempo de espera en cola
    this.ctts = this.calculateCTTS(cts); // Costo diario por el tiempo en el sistema
    this.cttse = this.calculateCTTSE(ctse); // Costo diario por el tiempo de servicio en el sistema
    this.cts = this.calculateCTS(cs); // Costo diario por el tiempo del servidor
    this.ct = this.calculateCT(); // Costo diario total
  }

  calculateCTTE(cte: number) {
    return this.mmk.lambda * this.time * this.mmk.wq * cte;
  }

  calculateCTTS(cts: number) {
    return this.mmk.lambda * this.time * this.mmk.w * cts;
  }

  calculateCTTSE(ctse: number) {
    return this.mmk.lambda * this.time * Division(1, this.mmk.miu) * ctse;
  }

  calculateCTS(cs: number) {
    return this.mmk.n * cs;
  }

  calculateCT() {
    return this.ctte + this.ctts + this.cttse + this.cts;
  }
}
