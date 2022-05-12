import Link from 'next/link';

export default function Header({ menu }) {
  console.log('Header', menu);
  return (
    <header>
      <ul>
        {menu && menu.map((item, i) => (
          <li key={i}>
            <Link href={item.slug}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </header>
  )
}
