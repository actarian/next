import { createGenericContext, useLayout } from '@hooks';
import React from 'react';

export type ILabelContext = (key: string) => string;

const [useLabel, LabelContextProvider] = createGenericContext<ILabelContext>();

function LabelProvider({ children }: { children?: React.ReactNode }) {

  const { locale, labels } = useLayout() || { locale: '*', labels: [] };

  // console.log('LabelProvider', locale);

  const dictionary = Object.fromEntries(labels.map(l => [l.id, l.text]));

  const context = (key: string): string => {
    return (dictionary[key] || key) as string;
  };

  // console.log('LabelProvider.context', context);
  return (
    <LabelContextProvider value={context}>
      {children}
    </LabelContextProvider>
  );
};

export { useLabel, LabelProvider };

