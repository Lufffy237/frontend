interface ParsedFigure {
    number: number;
    suffix: string;
    decimals: number;
  }
  
  export function parseFigure(value: string): ParsedFigure {
    // Extraire le nombre et le suffixe
    const match = value.match(/^([\d.,]+)(.*)$/);
    
    if (!match) {
      return { number: 0, suffix: value, decimals: 0 };
    }
  
    const [, numStr, suffix] = match;
    
    // Gérer les décimales
    const hasDecimals = numStr.includes(',') || numStr.includes('.');
    const normalizedNum = numStr.replace(',', '.');
    const number = parseFloat(normalizedNum);
    const decimals = hasDecimals ? 1 : 0;
  
    return {
      number: isNaN(number) ? 0 : number,
      suffix: suffix || '',
      decimals,
    };
  }