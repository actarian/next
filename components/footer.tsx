import Container from './container';

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <div className="footer__title">Statically Generated with Next.js.</div>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a href="https://nextjs.org/docs/basic-features/pages" className="btn"> Read Documentation </a>
            <a href={`https://github.com/vercel/next.js/tree/canary/examples/`} className="btn" > View on GitHub </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
