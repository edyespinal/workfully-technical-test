type Props = {
  children: React.ReactNode
}

function AuthLayout(props: Props) {
  const { children } = props

  return <main className='grid justify-center pt-24'>{children}</main>
}

export default AuthLayout
