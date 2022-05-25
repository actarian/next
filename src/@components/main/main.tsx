import { ReactNode } from 'react';
import styles from './main.module.scss';

export default function Main({ children }: MainProps) {
  return <main className={styles.main}>{children}</main>;
}

export interface MainProps {
  children: ReactNode;
}
