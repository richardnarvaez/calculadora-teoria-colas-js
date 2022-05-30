import React from 'react';
import Math from '../math/Math';

interface ResultItemProps {
  symbol: string;
  label: string;
  value: number | any;
  formula?: string;
}

const ResultItem = ({ label, symbol, value, formula }: ResultItemProps) => {
  return (
    <div className="flex flex-col items-center py-4 px-2 border">
      <Math formula={formula}/>
      <div className="flex items-center ">
        <p className="text-xl font-bold">{`${symbol}:`}</p>
        <p className="ml-2">{value}</p>
      </div>
      <p className="text-center text-xs">{label}</p>
    </div>
  );
};

export default ResultItem;
