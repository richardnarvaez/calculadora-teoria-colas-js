import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import ResultItem from '../components/results/ResultItem';
import Button, { ButtonType } from '../components/buttons/Button';
import Input, { InputTypes } from '../components/inputs/Input';
import OptionInput, {
  OptionInputTypes,
} from '../components/inputs/OptionInput';
import { MM1Model } from '../library/queueing/formulas/MM1.model';
import { SystemOrQueuing, TypeCalculate } from '../library/queueing/Constants';

type MM1Values = {
  lambda: number;
  miu: number;
  n: number;
  calculate: TypeCalculate;
  system: SystemOrQueuing;
};

const LabelSystemOrQueuing: any = {
  system: 'el sistema',
  queuing: 'la cola',
};

const LabelTypeCalculate: any = {
  fixed: 'exactamente',
  max: 'máximo',
  least: 'al menos',
};

const MM1 = () => {
  const [showResult, setShowResult] = useState({ loading: false, show: false });
  const [result, setResult] = useState<MM1Model>();
  const [labelPn, setLabelPn] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<MM1Values>();

  const onSubmit: SubmitHandler<MM1Values> = async (data) => {
    // parse data for avoid problems
    let lambda = parseFloat(data.lambda.toString());
    let miu = parseFloat(data.miu.toString());
    let n = parseInt(data.n.toString());
    const model = new MM1Model(lambda, miu, n);

    if (model.isStatable()) {
      setShowResult({ loading: true, show: false });
      await model.calculateAll(data.system, data.calculate);
      setResult(model);
      setLabel(n, data.calculate, data.system);
      setShowResult({ loading: false, show: true });
    } else {
      alert('no cumple con la condición de estabilidad');
    }
  };

  useEffect(() => {
    setValue('calculate', TypeCalculate.Fixed);
    setValue('system', SystemOrQueuing.System);
  }, [setValue]);

  const setLabel = (n: number, calculate: string, operation: string) => {
    setLabelPn(`Probabilidad de hallar 
    ${LabelTypeCalculate[calculate] || 'exactamente'} 
    ${n} clientes en ${LabelSystemOrQueuing[operation] || 'el sistema'}`);
  };

  return (
    <div className="flex justify-center h-full lg:items-center">
      <div className="m-8"> 
      {/* flex flex-col rounded-xl w-full shadow-md overflow-hidden sm:w-11/12 lg:flex-row lg:w-11/12 */}
      <div
          className={`w-full lg:min-h-full flex justify-center border px-6 pt-4
          ${!showResult.show ? 'bg-gray-200' : 'bg-white'}`}
        >
          {showResult.loading ? (
            <p className="self-center my-36">Calculando resultados...</p>
          ) : !showResult.show ? (
            <div className=" m-36 flex flex-col justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox='0 0 48 48'><path d="M36 47Q31.4 47 28.2 43.8Q25 40.6 25 36Q25 31.4 28.2 28.2Q31.4 25 36 25Q40.6 25 43.8 28.2Q47 31.4 47 36Q47 40.6 43.8 43.8Q40.6 47 36 47ZM36 44Q39.3 44 41.65 41.65Q44 39.3 44 36Q44 32.7 41.65 30.35Q39.3 28 36 28Q32.7 28 30.35 30.35Q28 32.7 28 36Q28 39.3 30.35 41.65Q32.7 44 36 44ZM12 47Q7.4 47 4.2 43.8Q1 40.6 1 36Q1 31.4 4.2 28.2Q7.4 25 12 25Q16.6 25 19.8 28.2Q23 31.4 23 36Q23 40.6 19.8 43.8Q16.6 47 12 47ZM12 44Q15.3 44 17.65 41.65Q20 39.3 20 36Q20 32.7 17.65 30.35Q15.3 28 12 28Q8.7 28 6.35 30.35Q4 32.7 4 36Q4 39.3 6.35 41.65Q8.7 44 12 44ZM12 23Q7.4 23 4.2 19.8Q1 16.6 1 12Q1 7.4 4.2 4.2Q7.4 1 12 1Q16.6 1 19.8 4.2Q23 7.4 23 12Q23 16.6 19.8 19.8Q16.6 23 12 23ZM12 20Q15.3 20 17.65 17.65Q20 15.3 20 12Q20 8.7 17.65 6.35Q15.3 4 12 4Q8.7 4 6.35 6.35Q4 8.7 4 12Q4 15.3 6.35 17.65Q8.7 20 12 20ZM36 23Q31.4 23 28.2 19.8Q25 16.6 25 12Q25 7.4 28.2 4.2Q31.4 1 36 1Q40.6 1 43.8 4.2Q47 7.4 47 12Q47 16.6 43.8 19.8Q40.6 23 36 23ZM36 20Q39.3 20 41.65 17.65Q44 15.3 44 12Q44 8.7 41.65 6.35Q39.3 4 36 4Q32.7 4 30.35 6.35Q28 8.7 28 12Q28 15.3 30.35 17.65Q32.7 20 36 20ZM31 40V37H41V40ZM31 35V32H41V35ZM10.5 41V37.5H7V34.5H10.5V31H13.5V34.5H17V37.5H13.5V41ZM7 13.5V10.5H17V13.5ZM33.5 16.6 31.4 14.5 33.9 12 31.4 9.5 33.5 7.4 36 9.9 38.5 7.4 40.6 9.5 38.1 12 40.6 14.5 38.5 16.6 36 14.1Z"/></svg>
              <span>Introduce los datos para empezar</span>
            </div>
          ) : (
            <div>
              <div className="relative flex my-3 justify-center items-center">
                <h2 className="font-bold text-2xl mb-3">RESULTADOS</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-6 ">
             
                  <ResultItem
                    symbol="ρ"
                    formula="\rho=\frac{\lambda}{\mu}"
                    label="Probabilidad de hallar el sistema ocupado"
                    value={result?.ro.toFixed(5)}
                  />
                  <ResultItem
                  formula="P_{0}=1-\tfrac{\lambda}{\mu}"
                    symbol="P0"
                    label="Probabilidad de hallar el sistema vacío"
                    value={result?.p0.toFixed(5)}
                  />
                  <ResultItem
                  formula="P_{n}=P_{0}(\tfrac{\lambda}{\mu})_{}^{n}, \sum_{n=0}^{\infty }P_{n}=1"
                    symbol="Pn"
                    label={labelPn}
                    value={result?.pn.toFixed(5)}
                  />
                  <ResultItem
                    symbol="Lq"
                    label="El número esperado de clientes en la cola"
                    value={result?.lq.toFixed(5)}
                  />
                  <ResultItem
                    symbol="L"
                    label="El número esperado de clientes en el sistema"
                    value={result?.l.toFixed(5)}
                  />
              
                  <ResultItem
                    symbol="Wq"
                    label="El tiempo esperado en la cola por los clientes"
                    value={result?.wq.toFixed(5)}
                  />
                  <ResultItem
                    symbol="W"
                    label="El tiempo promedio esperado en el sistema por los clientes"
                    value={result?.w.toFixed(5)}
                  />
                  <ResultItem
                    symbol="Ln"
                    label="El número esperado de clientes en la cola no vacía"
                    value={result?.ln.toFixed(5)}
                  />
                  <ResultItem
                    symbol="Wn"
                    label="El tiempo esperado en la cola para colas no vacías por los clientes"
                    value={result?.wn.toFixed(5)}
                  />
              </div>
            </div>
          )}
        </div>
        <div className="bg-white p-2 border w-full mt-4">
          <div className="relative flex my-3  items-center">
            <Link
              to="/"
              className=" hover:bg-gray-200 rounded-full p-2"
              title="back"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
                />
              </svg>
            </Link>
            <div className='ml-3'> 
              <h1 className="font-bold">M/M/1</h1>
              <small>PICS - Poblacion Infinita Canal Simple</small>
            </div>
           
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              symbol="λ"
              label="tasa de llegada"
              name="lambda"
              placeholder="0"
              type={InputTypes.Number}
              register={register}
              error={errors.lambda}
              step='0.001'
              required={{ required: 'El campo es obligatorio' }}
            />
            <Input
              symbol="μ"
              label="tasa de servicio"
              name="miu"
              placeholder="0"
              type={InputTypes.Number}
              register={register}
              error={errors.miu}
              container="mt-2"
              step='0.001'
              required={{ required: 'El campo es obligatorio' }}
            />
            <div className="mt-2">
              <Input
                symbol="N"
                label="clientes"
                name="n"
                placeholder="0"
                type={InputTypes.Number}
                register={register}
                error={errors.n}
              />
            </div>
            <div className="ml-2 mt-2">
              <p>Opciones para calculo de Pn</p>
              <div className="flex mt-1">
                <div>
                  <OptionInput
                    label="Exactamente"
                    name="calculate"
                    option={TypeCalculate.Fixed}
                    register={register}
                    type={OptionInputTypes.Radio}
                  />
                  <OptionInput
                    label="Al menos"
                    name="calculate"
                    option={TypeCalculate.AtLeast}
                    register={register}
                    type={OptionInputTypes.Radio}
                  />
                  <OptionInput
                    label="Máximo"
                    name="calculate"
                    option={TypeCalculate.Max}
                    register={register}
                    type={OptionInputTypes.Radio}
                  />
                </div>
                <div className="ml-4">
                  <OptionInput
                    label="Sistema"
                    name="system"
                    option={SystemOrQueuing.System}
                    register={register}
                    type={OptionInputTypes.Radio}
                  />
                  <OptionInput
                    label="Cola"
                    name="system"
                    option={SystemOrQueuing.Queuing}
                    register={register}
                    type={OptionInputTypes.Radio}
                  />
                </div>
              </div>
            </div>
            <div className="my-8">
              <input type="submit" value="Calcular" className='hover:bg-gray-200 hover:shadow-lg cursor-pointer px-4 py-2 rounded shadow'/>
            </div>
          </form>
        </div>
       
      </div>
    </div>
  );
};

export default MM1;
