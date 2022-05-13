import Footer from '../components/footer';
import Header from '../components/header';
import Meta from '../components/meta';
import Main from './main';

export default function Layout({ menu, children }) {
  return (
    <>
      <Meta />
      <Header menu={menu}></Header>
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
