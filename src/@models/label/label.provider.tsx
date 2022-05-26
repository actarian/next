import { useLayout } from '@hooks/useLayout/useLayout';
import React from 'react';
import { ILabel } from './label';

export type ILabelContext = {
  locale: string,
  labels: ILabel[],
  getLabel: (key: string) => string,
};

export const LabelContext = React.createContext<ILabelContext>({
  locale: '',
  labels: [],
  getLabel: (key: string) => key,
});

export default function LabelProvider({ children }) {

  const { locale, labels } = useLayout() || { locale: '*', labels: [] };

  const dictionary = Object.fromEntries(labels.map(l => [l.id, l.text]));

  const context = {
    locale,
    labels,
    getLabel: (key) => {
      return dictionary[key] || key;
    },
  };

  // console.log('LabelProvider.context', context);

  return (
    <LabelContext.Provider value={context}>
      {children}
    </LabelContext.Provider>
  );
}
