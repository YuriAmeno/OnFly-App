export const formatMask = (value: any) => {
  value = String(value).replace(/\D/g, '');

  value = parseFloat(value);

  if (isNaN(value)) {
    return 0;
  }

  const formatoMoeda = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formatoMoeda.format(value / 100);
};

export const formatMonetaryToBr = (value: any) => { 
  return Number(value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}
