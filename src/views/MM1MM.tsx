import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import ResultItem from '../components/results/ResultItem';
import Button, { ButtonType } from '../components/buttons/Button';
import Input, { InputTypes } from '../components/inputs/Input';
import OptionInput, {
  OptionInputTypes,
} from '../components/inputs/OptionInput';
import { SystemOrQueuing, TypeCalculate } from '../library/queueing/Constants';
import { MM1MMModel } from '../library/queueing/formulas/MM1MM.model';
import MathJax from 'react-mathjax';
import Toolbar from '../components/toolbar/main.toolbar';
import Wait from '../components/wait';

type MM1MMValues = {
  lambda: number;
  miu: number;
  m: number;
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

const MM1MM = () => {
  const [showResult, setShowResult] = useState({ loading: false, show: false });
  const [result, setResult] = useState<MM1MMModel>();
  const [labelPn, setLabelPn] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<MM1MMValues>();

  const onSubmit: SubmitHandler<MM1MMValues> = async (data) => {
    // parse data for avoid problems
    let lambda = parseFloat(data.lambda.toString());
    let miu = parseFloat(data.miu.toString());
    let m = parseInt(data.m.toString());
    let n = parseInt(data.n.toString());
    const model = new MM1MMModel(lambda, miu, m, n);

    setShowResult({ loading: true, show: false });
    await model.calculateAll(data.system, data.calculate);
    setResult(model);
    setLabel(n, data.calculate, data.system);
    setShowResult({ loading: false, show: true });
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
         <div
          className={`w-full lg:min-h-full flex justify-center border px-6 pt-4
        ${!showResult.show ? 'bg-gray-200' : 'bg-white'}`}
        >
          {showResult.loading ? (
            <p className="self-center my-36">Calculando resultados...</p>
          ) : !showResult.show ? (
            <Wait/>
          ) : (
            <div>
              <div className="relative flex my-3 justify-center items-center">
                <h2 className="font-bold text-2xl">Resultados</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
              <MathJax.Provider>

                  <ResultItem
                    symbol="P0"
                    label="Probabilidad de hallar el sistema vacío"
                    value={result?.p0.toFixed(5)}
                  />
                  <ResultItem
                    symbol="Pe"
                    label="Probabilidad de hallar el sistema ocupado"
                    value={result?.pe.toFixed(5)}
                  />
                  <ResultItem
                    symbol="Pn"
                    label={labelPn}
                    value={result?.pn.toFixed(5)}
                  />
                  <ResultItem
                    symbol="L"
                    label="El número esperado de clientes en el sistema"
                    value={result?.l.toFixed(5)}
                  />
                  <ResultItem
                    symbol="Lq"
                    label="El número esperado de clientes en la cola"
                    value={result?.lq.toFixed(5)}
                  />
               
                  <ResultItem
                    symbol="Ln"
                    label="El número esperado de clientes en la cola no vacía"
                    value={result?.ln.toFixed(5)}
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
                    symbol="Wn"
                    label="El tiempo esperado en la cola para colas no vacías por los clientes"
                    value={result?.wn.toFixed(5)}
                  />
               </MathJax.Provider>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white px-6 pt-4 border w-full mt-8">
         
        <Toolbar title="M/M/1/M/M" description="PFCS - Poblacion Finita Canal Simple"/>
         

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8">
              <Input
                symbol="λ"
                label="tasa de llegada"
                name="lambda"
                placeholder="0"
                type={InputTypes.Number}
                register={register}
                error={errors.lambda}
                step="0.001"
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
                step="0.001"
                required={{ required: 'El campo es obligatorio' }}
              />
            </div>
            <Input
              symbol="M"
              label="población conocida"
              name="m"
              placeholder="0"
              type={InputTypes.Number}
              register={register}
              error={errors.m}
              required={{ required: 'El campo es obligatorio' }}
              container="mt-2"
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
              <Button text="Calcular" type={ButtonType.Submit} />
            </div>
          </form>
        </div>
       
      </div>
    </div>
  );
};

export default MM1MM;
