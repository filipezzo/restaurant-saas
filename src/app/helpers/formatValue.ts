export function formatValue(value: number){
  return value.toLocaleString('pt-br', {
    currency: 'BRL',
    style: 'currency'
  })
}