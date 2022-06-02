import React from 'react';
import { AppBar, Box, Tab, Tabs, Typography } from '@material-ui/core';

import { MMKModel } from '../../library/queueing/formulas/MMK.model';
import ResultItem from '../results/ResultItem';
import CostTab from '../cost/CostTab';
import MathJax from 'react-mathjax';
import { Line } from 'react-chartjs-2';

interface TabsMMKProps {
  result: MMKModel;
  labelPn: string;
  data: any;
}

const TabsMMK = ({ result, labelPn, data }: TabsMMKProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Tabs
          className="bg-white text-black shadow"
          indicatorColor="primary"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Respuesta" {...a11yProps(0)} />
          <Tab label="Costos" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
        <MathJax.Provider>
            <ResultItem
              symbol="P0"
              type="PICM"
              label="Probabilidad de hallar el sistema vacío"
              value={result?.p0.toFixed(5)}
            />
            <ResultItem
              symbol="Pk"
              type="PICM"
              label="La probabilidad de que un usuario que llega tenga que esperar (k o más)"
              value={result?.pk.toFixed(5)}
            />
            <ResultItem
              symbol="Pne"
              type="PICM"
              label="Probabilidad de que un usuario que llega no tenga que esperar"
              value={result?.pne.toFixed(5)}
            />
            <ResultItem
              symbol="Pn"
               type="PICM"
              label={labelPn}
              value={result?.pn.toFixed(5)}
            />
            <ResultItem
              symbol="L"
              type="PICM"
              label="El número esperado de clientes en el sistema"
              value={result?.l.toFixed(5)}
            />
          
            <ResultItem
              symbol="Lq"
              type="PICM"
              label="El número esperado de clientes en la cola"
              value={result?.lq.toFixed(5)}
            />
            <ResultItem
              symbol="Ln"
              type="PICM"
              label="El número esperado de clientes en la cola no vacía"
              value={result?.ln.toFixed(5)}
            />
            <ResultItem
              symbol="W"
              type="PICM"
              label="El tiempo promedio esperado en el sistema por los clientes"
              value={result?.w.toFixed(5)}
            />
            <ResultItem
              symbol="Wq"
               type="PICM"
              label="El tiempo esperado en la cola por los clientes"
              value={result?.wq.toFixed(5)}
            />
            <ResultItem
              symbol="Wn"
              type="PICM"
              label="El tiempo esperado en la cola para colas no vacías por los clientes"
              value={result?.wn.toFixed(5)}
            />
            </MathJax.Provider>
           
              <div style={{textAlign: "center"}} className="border p-2 col-span-2">
              <p className="ml-2 self-end"><b>CONDICION DE ESTABILIDAD</b> {'a/(k*u)<1 = ' + result.k} </p>
                <Line data={data}/>
              </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CostTab mmk={result} />
      </TabPanel>
    </>
  );
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



export default TabsMMK;
