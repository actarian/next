import { useLayout } from '@hooks/useLayout/useLayout';
import React from 'react';
import type { ILabel } from './label';

export type ILabelContext = {
  locale: string,
  labels: ILabel[],
  getLabel: (key: string) => string,
};

export const LabelContext = React.createContext<ILabelContext>({
  locale: '',
  labels: [],
  getLabel: (key) => key,
});

export default function LabelProvider({ children }: { children?: React.ReactNode }) {

  const { locale, labels } = useLayout() || { locale: '*', labels: [] };

  const dictionary = Object.fromEntries(labels.map(l => [l.id, l.text]));

  const context = {
    locale,
    labels,
    getLabel: (key: string): string => {
      return (dictionary[key] || key) as string;
    },
  };

  // console.log('LabelProvider.context', context);

  return (
    <LabelContext.Provider value={context}>
      {children}
    </LabelContext.Provider>
  );
}
