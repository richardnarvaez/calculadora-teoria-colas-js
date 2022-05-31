import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button, { ButtonType } from '../components/buttons/Button';
import Input, { InputTypes } from '../components/inputs/Input';
import OptionInput, {
  OptionInputTypes,
} from '../components/inputs/OptionInput';
import { MMKModel } from '../library/queueing/formulas/MMK.model';
import { SystemOrQueuing, TypeCalculate } from '../library/queueing/Constants';
import TabsMMK from '../components/tabs/TabsMMK';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import Toolbar from '../components/toolbar/main.toolbar';
import Wait from '../components/wait';

type MMKValues = {
  lambda: number;
  miu: number;
  k: number;
  n: number;
  calculate: TypeCalculate;
  system: SystemOrQueuing;
};



ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const LabelSystemOrQueuing: any = {
  system: 'el sistema',
  queuing: 'la cola',
};

const LabelTypeCalculate: any = {
  fixed: 'exactamente',
  max: 'máximo',
  least: 'al menos',
};

const MMK = () => {
  const [showResult, setShowResult] = useState({ loading: false, show: false });
  const [result, setResult] = useState<MMKModel>(new MMKModel(0,0,0));
  const [labelPn, setLabelPn] = useState<string>('');
  const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99];

  let data2 = [NaN]
  let datapoints = [0]

  
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
          label: 'Condicion de estabilidad',
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

  const config = {
      // type: 'line',
      // data: data,
      // options: {
      //    responsive: true,
      //    plugins: {
      //       title: {
      //          display: true,
      //          text: 'Chart.js Line Chart - Cubic interpolation mode',
      //       },
      //    },
      //    interaction: {
      //       intersect: false,
      //    },
      //    scales: {
      //       x: {
      //          display: true,
      //          title: {
      //             display: true,
      //          },
      //       },
      //       y: {
      //          display: true,
      //          title: {
      //             display: true,
      //             text: 'Value',
      //          },
      //          suggestedMin: -10,
      //          suggestedMax: 200,
      //       },
      //    },
      // },
   }
  
   const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<MMKValues>();

  const onSubmit: SubmitHandler<MMKValues> = async (data) => {
    // parse data for avoid problems
    let lambda = parseFloat(data.lambda.toString());
    let miu = parseFloat(data.miu.toString());
    let k = parseInt(data.k.toString());
    let n = parseInt(data.n.toString());
    data2 = [NaN]
    datapoints = [0]

    if(k <=1){
      // Se calcula hasta k=99  
      let condition = 99;
      let i = 1;
      let encontrado = true
      do{
        const denominator = i * miu;
        condition = lambda/denominator;
        datapoints.push(condition);
        if( condition >= 1){
          k = i +1;
          data2.push(NaN);
        }else{
          if(!encontrado) {
            data2.push(NaN);
          } else { 
            encontrado = false;
            data2.push(condition);
          }
        }
        i++;
        console.log("condition: c<1", condition, "en i:", i, "cuando k:", k);
      }while(i < 99)
      setData({
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
              label: 'Condicion de estabilidad',
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
    }

    const model = new MMKModel(lambda, miu, k, n);

    if (!model.isMultichannel())
      return alert('El problema no es de tipo M/M/K');
    
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
    <div className="flex justify-center h-full lg:items-center" style={{margin:24}}>
      <div className="m-8">
        <div
          className={`w-full lg:min-h-full flex justify-center border 
          ${!showResult.show ? 'bg-gray-200' : 'bg-white'}`}
        >
          {showResult.loading ? (
            <p className="self-center my-36">Calculando resultados...</p>
          ) : !showResult.show ? (
            <Wait/>
          ) : (
            <div className='w-full'>
              {/* <div className="relative flex my-3 justify-center items-center">
                <h2 className="font-bold text-2xl">Resultados</h2>
              </div> */}
            
              <TabsMMK result={result} labelPn={labelPn} />
              <p>CONDICION DE ESTABILIDAD {'a/(k*u)<1'} </p>
              <div style={{width: 400, height: 200, margin: 12}}>
                <Line data={data}  options={config}/>
              </div>
              
            </div>
          )}
        </div>
        
        <div className="bg-white  border w-full mt-8">
        <Toolbar title="M/M/k" description="PICM - Poblacion Ininita Canal Multiple"/>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
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
                container="mt-2 lg:mt-0"
                step="0.001"
                required={{ required: 'El campo es obligatorio' }}
              />
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8">
              <Input
                symbol="k"
                label="número de servidores"
                name="k"
                placeholder="2"
                type={InputTypes.Number}
                register={register}
                error={errors.k}
                container="mt-2"
                required={{
                  required: 'El campo es obligatorio',
                  min: {
                    value: 0,
                    message: 'Debe tener mínimo 0',
                    // message: 'Debe tener mínimo 2 servidores para ser M/M/K',
                  },
                }}
              />
              <Input
                symbol="N"
                label="clientes"
                name="n"
                placeholder="0"
                container="mt-2"
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

export default MMK;
