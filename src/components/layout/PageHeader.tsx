// src/components/layout/PageHeader.tsx — editorial page header

interface PageHeaderProps {
  kicker?: string
  title: string
  dek?: string
}

export default function PageHeader({ kicker, title, dek }: PageHeaderProps) {
  return (
    <header className="page-head">
      {kicker && <span className="eyebrow">{kicker}</span>}
      <h1>{title}</h1>
      {dek && <p className="dek">{dek}</p>}
    </header>
  )
}
