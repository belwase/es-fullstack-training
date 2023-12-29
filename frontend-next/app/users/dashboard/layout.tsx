export default function DashboardLayout({children, left, right}) {

  return (
    <>
      <h2>Dashboard Layout</h2>
      {children}
      {left}
      <h3>Rendering right </h3>
      {right}
    </>
  )
}
