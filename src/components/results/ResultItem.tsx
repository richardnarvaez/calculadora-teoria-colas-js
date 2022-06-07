import React from 'react';
import Math from '../math/Math';

interface ResultItemProps {
  symbol: string;
  label: string;
  value: number | any;
  type?: string;
}


const formulasPICS = {
  'P0': 'P_{0}=1-\\tfrac{\\lambda}{\\mu}',
  'Pn': "P_{n}=P_{0}(\\tfrac{\\lambda}{\\mu})_{}^{n}, \\sum_{n=0}^{\\infty }P_{n}=1",
  'L': 'L=\\frac{\\lambda}{\\mu-\\lambda}',
  'Lq': 'L_{q}=\\frac{\\lambda^{2}}{\\mu(\\mu-\\lambda)}',
  'Ln': 'L_{n}=\\frac{\\lambda}{\\mu-\\lambda}',
  'W': 'W=\\frac{1}{\\mu-\\lambda}',
  'Wq': 'W_{q}=\\frac{\\lambda}{\\mu(\\mu-\\lambda)}',
  'Wn': 'W_{n}=\\frac{1}{\\mu-\\lambda}',
  'Pe': 'P_{E}=\\sum_{n=k}^{M}P_{n}=1-\\sum_{n=0}^{k-1}nP_{n}',
  'Pne': 'P_{NE}=1-P_{E}',
  'ρ': 'ρ=\\frac{\\lambda}{\\mu}',
  'CTTE': 'CT_{TE}=\\lambda*Time*W_{q}*C_{TE}',
  'CTTS': 'CT_{TS}=\\lambda*Time*W_{q}*C_{TS}',
  'CTTSE': 'CT_{TSE}=\\lambda*Time*\\frac{1}{\\mu}*C_{TSE}',
  'CTS': 'CT_{S}=1*C_{S}',
  'CT': 'CT(\\frac{$}{dia})=\\lambda*T_{dia.laborable}*W*C_{TS}+1*C_{S}',
}

const formulasPICM: any = {
  'P0': 'P_{0}=\\frac{1}{[\\sum_{n=0}^{n=k-1}\\frac{1}{n!}(\\frac{\\lambda}{\\mu})^{n}] + \\frac{1}{k}(\\frac{\\lambda}{\\mu})^{k}\\frac{k\\mu}{k\\mu-\\lambda}}',
  'Pn': "P_{n}=\\frac{P_{0}}{n!}(\\frac{\\lambda}{\\mu})^{n}, n = 0,1,2,...,k",
  'L': 'L=\\frac{\\lambda\\mu(\\lambda/\\mu)^{k}}{(k-1)!(k\\mu-\\lambda)^{2}}P_{0}+\\frac{\\lambda}{\\mu}',
  'Lq': 'L_{q}=\\frac{\\lambda\\mu(\\lambda/\\mu)^{k}P_{0}}{(k-1)!(k\\mu-\\lambda)^{2}}',
  'Ln': 'L_{n}=\\frac{L_{q}}{P_{k}}',
  'W': 'W=\\frac{\\mu(\\lambda/\\mu)^{k}}{(k-1)!(k\\mu-\\lambda)^{2}}P_{0}+\\frac{1}{\\mu}',
  'Wq': 'W_{q}=\\frac{\\mu(\\lambda/\\mu)^{k}P_{0}}{(k-1)!(k\\mu-\\lambda)^{2}}',
  'Wn': 'W_{n}=\\frac{W_{q}}{P_{k}}',
  'Pne': 'P_{NE}=1-P_{k}',
  'Pk': 'P_{k}=\\frac{1}{k!}(\\frac{\\lambda}{\\mu})^{k}\\frac{k\\mu}{(k\\mu-\\lambda)}P_{0}',
  'CT': 'CT(\\frac{$}{dia})=\\lambda*T_{dia.laborable}*W*C_{TS}+k*C_{S}',
}

const formulas = {
  'PICS': formulasPICS,
  'PICM': formulasPICM,
}
type ObjectKey= keyof typeof formulas;
type ObjectKeyPICS = keyof typeof formulasPICS;
type ObjectKeyPICM = keyof typeof formulasPICM;

const ResultItem = ({ label, symbol, value, type = 'PICS' }: ResultItemProps) => {
  const frmType = type as ObjectKey;
  const frmSymbol = symbol as  ObjectKeyPICS | ObjectKeyPICM;

  return (
    <div className="flex flex-col items-center py-4 px-2 border">
      <Math formula={formulas[frmType][frmSymbol]}/>
      <div className="flex items-center">
        <p className="text-xl font-bold">{`${symbol}:`}</p>
        <p className="ml-2">{value}</p>
      </div>
      <p className="text-center text-xs">{label}</p>
    </div>
  );
};

export default ResultItem;
