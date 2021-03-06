
export default function Alert({ preview }: { preview: boolean }) {
  return (
    <>
      {preview ? (
        <> This is page is a preview.{' '} <a href="/api/exit-preview" className="btns" > Click here </a>{' '} to exit preview mode. </>
      ) : (
        <> The source code for this blog is{' '} <a href={`https://github.com/vercel/next.js/tree/canary/examples/`} className="btn" > available on GitHub </a> . </>
      )}
    </>
  )
}
