
export type Pipe = (value: any) => any

function pipe(value: any, ...pipes: Pipe[]): string {
  value = pipes.reduce((p, c, i) => {
    return c(p);
  }, value);
  return value.toString();
}

function price(options: any = {}) {
  return (value: any): any => {
    return value + '€';
  };
}

pipe.price = price;

export const P = pipe;

/*
// !!! use hooks?
*/
