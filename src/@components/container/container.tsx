
import { ReactNode } from 'react';
import styles from './container.module.scss';

export default function Container({ children }: ContainerProps) {
  return <div className={styles.container}>{children}</div>;
}

export interface ContainerProps {
  children: ReactNode;
}
