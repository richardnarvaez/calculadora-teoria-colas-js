import React from 'react';
import Math from '../math/Math';

interface ResultItemProps {
  symbol: string;
  label: string;
  value: number | any;
  formula?: string;
}
const formulas = {
  'P0': 'P_{0}=1-\\tfrac{\\lambda}{\\mu}',
  'Pn': "P_{n}=P_{0}(\\tfrac{\\lambda}{\\mu})_{}^{n}, \\sum_{n=0}^{\\infty }P_{n}=1",
  'L': 'L=\\sum_{n=0}^{n=M}nP_{n}=M-\\frac{\\mu }{\\lambda}(1-P_{0})',
  'Lq': 'L_{q}=M-\\frac{\\lambda+\\mu}{\\lambda}(1-P_{0})',
  'Ln': 'L_{n}=\\frac{L_{q}}{P_{E}}',
  'W': 'W=W_{q}+\\frac{1}{\\mu}',
  'Wq': 'W_{q}=\\tfrac{L_{q}}{(M-L)\\lambda}',
  'Wn': 'W_{n}=\\frac{W_{q}}{P_{E}}',
  'Pe': 'P_{E}=\\sum_{n=k}^{M}P_{n}=1-\\sum_{n=0}^{k-1}nP_{n}',
  'Pne': 'P_{NE}=1-P_{E}',
  'ρ': 'ρ=\\frac{\\lambda}{\\mu}',
}
type ObjectKey = keyof typeof formulas;

const ResultItem = ({ label, symbol, value, formula }: ResultItemProps) => {
  const frmSymbol = symbol as ObjectKey;
  return (
    <div className="flex flex-col items-center py-4 px-2 border">
      <Math formula={formulas[frmSymbol]}/>
      <div className="flex items-center">
        <p className="text-xl font-bold">{`${symbol}:`}</p>
        <p className="ml-2">{value}</p>
      </div>
      <p className="text-center text-xs">{label}</p>
    </div>
  );
};

export default ResultItem;
