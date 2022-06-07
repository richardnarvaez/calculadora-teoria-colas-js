import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import MathJax from 'react-mathjax';
import { CostMMK } from '../../library/queueing/cost/CostMMK';
import { MMKModel } from '../../library/queueing/formulas/MMK.model';
import Button, { ButtonType } from '../buttons/Button';

import Input, { InputTypes } from '../inputs/Input';
import ResultItem from '../results/ResultItem';
import { Line } from 'react-chartjs-2'

interface CostMMKProps {
  mmk: MMKModel;
}

type CostMMKValues = {
  time: number;
  cts: number;
  cs: number;
};

const CostTabMM1 = ({ mmk }: any) => {
  const [showResult, setShowResult] = useState(false);
  const [cost, setCost] = useState<CostMMK>();

  const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
  let data2 = [NaN]
  let datapoints = [NaN]
  
  const [data, setData] = useState({
    labels: labels,
    datasets: [
       {
          label: 'Puntos de la curva',
          data: datapoints,
          
          fill: false,
          // cubicInterpolationMode: 'monotone',
          tension: 0.4,
          pointRadius: 0
       },
       {
          label: 'Costo ACTUAL',
          data: data2,
          // borderColor: Utils.CHART_COLORS.red,
          fill: false,
          borderColor: '#f87979',
          // cubicInterpolationMode: 'monotone',
          tension: 0.4,
          pointRadius: 10
       },
    ],
 })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CostMMKValues>();

  const onSubmit: SubmitHandler<CostMMKValues> = (data) => {
    console.log(data);
    setShowResult(false);
    let time = parseFloat(data.time.toString());
    let cts = parseFloat(data.cts.toString());
    let cs = parseFloat(data.cs.toString());
    const cost = new CostMMK(mmk, time);
    cost.calculateExercise(cs, cts, 1);
    cost.calculateCTTE(0.5)
    cost.calculateCTTS(cts)
    cost.calculateCTTSE(0.5)
    cost.calculateCTS(0.5)
    // cost.calculateCT

    setCost(cost);
    console.log("COST: ", cost)
    setShowResult(true);
  };

  return (
    <div className="flex flex-col pb-8">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Input
          symbol="T"
          label="horas día laborable"
          name="time"
          placeholder="0"
          type={InputTypes.Number}
          register={register}
          error={errors.time}
          required={{ required: 'El campo es obligatorio' }}
        />
        <div className="mt-2 flex flex-col lg:grid lg:grid-cols-2 lg:gap-2">
          <Input
            symbol="Cts"
            label="$ por tiempo en el sistema"
            name="cts"
            placeholder="0"
            type={InputTypes.Number}
            register={register}
            error={errors.cts}
            step="0.001"
            required={{ required: 'El campo es obligatorio' }}
          />
          <Input
            symbol="Cs"
            label="$ del servidor"
            name="cs"
            placeholder="0"
            type={InputTypes.Number}
            register={register}
            error={errors.cs}
            step="0.001"
            required={{ required: 'El campo es obligatorio' }}
          />
        </div>

        <div className="my-8">
          <Button text="Calcular Costos" type={ButtonType.Submit} />
        </div>
      </form>
      <div>
        {showResult ? (
          <MathJax.Provider>
            <ResultItem
            type='PICS'
            label="Costo Diario por el Tiempo de Espera en la Cola"
            symbol="CTTE"
            value={cost?.ctte.toFixed(5)}
          />
          <ResultItem
            type='PICS'
            label="Costo Diario por el Riempo en el Sistema"
            symbol="CTTS"
            value={cost?.ctts.toFixed(5)}
          />
          <ResultItem
            type='PICS'
            label="Costo total DIARIO por el Tiempo de servicio"
            symbol="CTTSE"
            value={cost?.cttse.toFixed(5)}
          />
          <ResultItem
            type='PICS'
            label="Costo total DIARIO del servicio"
            symbol="CTS"
            value={cost?.cts.toFixed(5)}
          />
          <ResultItem
            type='PICS'
            label={cost?.time === 1 ? "Costo total POR HORA (Tiempo) del sistema": "Costo total DIARIO del sistema"}
            
            symbol="CT"
            value={cost?.ctExercise.toFixed(5)}
          /></MathJax.Provider>
        ) : (
          <div className="flex justify-center items-center p-12 rounded-sm bg-gray-200">
            Presiona Calcular Costos para ver los resultados
          </div>
        )}
      </div>
    </div>
  );
};

export default CostTabMM1;
