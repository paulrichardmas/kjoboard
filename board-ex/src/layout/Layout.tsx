import Header from "./Header/Header"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="p-2">{children}</div>
    </>
  )
}

export default Layout
