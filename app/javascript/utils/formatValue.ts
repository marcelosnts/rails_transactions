const formatValue = (value: number): string => {
  const formatedValue = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  return formatedValue;
};

export default formatValue;