// const MathJax = require('react-mathjax');
import MathJax from 'react-mathjax';
const Math = ({ formula }) => {
  const tex = `f(x) = \\int_{-\\infty}^\\infty
    \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
    \\,d\\xi`;
  return (
    <div>
      <MathJax.Node formula={formula ? formula : tex} />
    </div>
  );
};

export default Math;
