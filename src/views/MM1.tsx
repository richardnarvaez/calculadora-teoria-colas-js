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
import MathJax from 'react-mathjax';
import Wait from '../components/wait';
import Toolbar from '../components/toolbar/main.toolbar';
import CostTab from '../components/cost/CostTab';
import CostTabMM1 from '../components/cost/CostTabMM1';

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

let dataPn :any =  [];
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
    let pnnn = 0
    const model = new MM1Model(lambda, miu, n);

    if (model.isStatable()) {
      setShowResult({ loading: true, show: false });
      await model.calculateAll(data.system, data.calculate);
      for(let i=0; i<=8 ; i++){
        pnnn = model.getPnn(i)
        dataPn[i] = {pn: pnnn}
        const sumPn = dataPn.reduce((a: any, b:any) => a + b.pn, 0)
        dataPn[i] = {pn: pnnn, sum: sumPn, prob:1-sumPn}
        console.log("P cuando n = " + i+":", pnnn, dataPn[i])
      }
      console.log(dataPn)
      setResult(model);
      setLabel(n, data.calculate, data.system);
      setShowResult({ loading: false, show: true });
      console.log(model);
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
            <Wait/>
          ) : (
            <div>
              <div className="relative flex my-3 justify-center items-center">
                <h2 className="font-bold text-2xl mb-3">RESULTADOS</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-6 ">
              <MathJax.Provider>
              <div style={{textAlign: "center"}} className="border p-2 col-span-1 sm:col-span-2">
            <p ><b>Calculo de Pn Probabilidad de Clientes en el sistema</b></p>
          </div>
                  <ResultItem
                    symbol="ρ"
                    label="Probabilidad de hallar el sistema ocupado"
                    value={result?.ro.toFixed(5)}
                  />
                  <ResultItem
                    symbol="P0"
                    label="Probabilidad de hallar el sistema vacío"
                    value={result?.p0.toFixed(5)}
                  />
                  <ResultItem
                    symbol="Pn"
                    label={labelPn}
                    value={result?.pn.toFixed(5)}
                  />
                  <div className="flex flex-col items-center py-4 px-2 border">
                    <div className='grid grid-cols-3 gap-2'>
                    {
                      dataPn && dataPn.length > 0 && dataPn.map((item: any, index: number) => {
                        return(<div className={"flex flex-col border p-1 " + (index ===0 ? "bg-gray-100" : "")}>
                        <small><b>{`P${index}: `}</b>{item.pn}</small>
                        <small>{`SumP${index}: `}{item.sum}</small>
                        <small>{`1-Sum${index}: `}{item.prob}</small>
                      </div>)
                        
                      })
                    }</div>
                    
                    <p className="text-center text-xs mt-2">Calculo Pn en los casos {'n>=0'} hasta n=8</p>
                  </div>
                  <div style={{textAlign: "center"}} className="border p-2 col-span-1 sm:col-span-2">
            <p ><b>Tiempo esperado</b></p>
          </div>
          <ResultItem
                    symbol="W"
                    label="El tiempo promedio esperado en el sistema por los clientes"
                    value={result?.w.toFixed(5)}
                  />
          <ResultItem
                    symbol="Wq"
                    label="El tiempo esperado en la cola por los clientes"
                    value={result?.wq.toFixed(5)}
                  />
                  
                  <ResultItem
                    symbol="Wn"
                    label="El tiempo esperado en la cola para colas no vacías por los clientes"
                    value={result?.wn.toFixed(5)}
                  />

                  
                  <div style={{textAlign: "center"}} className="border p-2 col-span-1 sm:col-span-2">
            <p ><b>Numero de Clientes</b></p>
          </div>
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
                  
                  </MathJax.Provider>
              </div>
              <CostTabMM1 mmk={result} />
            </div>
          )}
        </div>
        <div className="bg-white p-2 border w-full mt-4">
          <Toolbar title="M/M/1" description="PICS - Poblacion Infinita Canal Simple"/>

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
