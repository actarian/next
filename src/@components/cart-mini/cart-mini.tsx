
import { Button, Drawer } from '@geist-ui/core';
import { ShoppingCart } from '@geist-ui/icons';
import { useCartItems, useLayout, useUI } from '@hooks';
import { usePrice } from '@pipes';
import { ReactNode } from 'react';
import CartMiniItem from './cart-mini-item';
import styles from './cart-mini.module.scss';

export default function CartMini({ children, visible, onClose }: CartMiniProps) {

  const { locale } = useLayout();
  const { cartItems } = useCartItems(locale, visible);

  const totalAmount = cartItems.reduce((p, c) => p + c.price * c.qty, 0);
  const totalPrice = usePrice(totalAmount);

  const reduceUI = useUI(state => state.reduce);

  function onSetDrawer(value?: string) {
    reduceUI((state) => ({ drawer: value }));
  }

  function onBuy() {
    return onSetDrawer();
  }

  return (
    <Drawer visible={visible} onClose={onClose} placement="right">
      <Drawer.Title>Cart</Drawer.Title>
      <Drawer.Subtitle>{cartItems.length} items found</Drawer.Subtitle>
      <Drawer.Content>
        <div className={styles.inner}>
          <div className={styles.body}>
            {cartItems && cartItems.map((item, i) =>
              <CartMiniItem key={i} item={item} />
            )}
          </div>
          <div className={styles.foot}>
            <Button type="success" icon={<ShoppingCart />} auto onClick={() => onBuy()}>Buy {totalPrice}</Button>
          </div>
        </div>
      </Drawer.Content>
    </Drawer>
  )
}

/*
export function CartMini_({ children, visible, onClose }: CartMiniProps) {

  const { locale } = useLayout();
  const { items } = useCart();
  const [cartItems, setCartItems] = useState<ICartMiniItem[]>([]);

  useEffect(() => {
    if (visible) {
      // declare the data fetching function
      const fetchData = async () => {
        const products = await apiGet(`/product?locale=${locale}`) as IProduct[];
        if (products) {
          const cartItems = items.map(x => {
            const product = products.find(p => p.schema === x.schema && p.id === x.id);
            if (product) {
              return {
                ...product,
                ...x,
              };
            } else {
              return null;
            }
          }).filter(x => x !== null) as ICartMiniItem[];
          setCartItems(cartItems);
        }
      };
      fetchData().catch(console.error);
    }
  }, [visible, items]);

  return (
    <Drawer visible={visible} onClose={onClose} placement="right">
      <Drawer.Title>Cart</Drawer.Title>
      <Drawer.Subtitle>{items.length} items found</Drawer.Subtitle>
      <Drawer.Content>
        {cartItems && cartItems.map((item, i) =>
          <CartMiniItem key={i} item={item} />
        )}
      </Drawer.Content>
    </Drawer>
  )
}
*/

export interface CartMiniProps {
  children: ReactNode;
  visible: boolean;
  onClose: () => void;
}
