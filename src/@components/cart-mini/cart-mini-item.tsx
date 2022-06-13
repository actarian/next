import { Button, Image, Input, Text } from '@geist-ui/core';
import { MinusCircle, PlusCircle, Trash } from '@geist-ui/icons';
import { ICartMiniItem, useCart, useMounted, useUI } from '@hooks';
import { usePrice } from '@pipes';
import NextLink from 'next/link';
import styles from './cart-mini-item.module.scss';

export default function CartMiniItem({ item }: { item: ICartMiniItem }) {

  const price = usePrice(item.price * item.qty);

  const { update, remove } = useCart();

  function onSetQty(qty: number) {
    if (qty > 0) {
      update({ ...item, qty });
    } else {
      onRemove();
    }
  }

  function onRemove() {
    const count = remove(item);
    console.log('count', count);
    if (count < 1) {
      closeDrawer();
    }
  }

  const reduceUI = useUI(state => state.reduce);

  function onSetDrawer(value?: string) {
    reduceUI((state) => ({ drawer: value }));
  }

  const closeDrawer = () => {
    return onSetDrawer();
  };

  const mounted = useMounted();
  return (
    <>
      <div className={styles.card}>
        {<Image className={styles.image} width="80px" height="80px" src={item.image} draggable={false} title={item.title} />}
        <div className={styles.info}>
          <div className={styles.row}>
            <Text my={0}>{item.qty}</Text>
            <Text paddingLeft={1} paddingRight={1}>x</Text>
            <Text className={styles.text} my={0} onClick={closeDrawer}>{<NextLink href={item.href || ''}>{item.title}</NextLink>}</Text>
          </div>
          <div className={styles.row}>
            <Button className={styles.remove} type="abort" padding="0" onClick={() => onSetQty(item.qty - 1)} >{<MinusCircle />}</Button>
            <Input className={styles.qty} placeholder="qty" value={item.qty.toString()} onChange={(e) => onSetQty(Number(e.target.value))} />
            <Button className={styles.add} type="abort" padding="0" onClick={() => onSetQty(item.qty + 1)} >{<PlusCircle />}</Button>
            <Text my={0}>{price}</Text>
          </div>
        </div>
        {mounted &&
          <Button className={styles.button} auto type="abort" padding={0} onClick={onRemove}>{<Trash />}</Button>
        }
      </div>
    </>
  );
}

