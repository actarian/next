import Alert from '../components/alert';
import Footer from '../components/footer';
import Header from '../components/header';
import Meta from '../components/meta';

export default function Layout({ menu, children }) {
  return (
    <>
      <Meta />
      <Header menu={menu}></Header>
      <main>{children}</main>
      <Alert preview={false} />
      <Footer />
    </>
  )
}
