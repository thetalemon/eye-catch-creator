import type { NextPage } from 'next'
import Head from 'next/head'
import Canvas from './components/canvas'
import styled from '@emotion/styled'

const HeaderArea = styled.header`
background-color: #063506;
text-align: center;
`
const HeaderImg = styled.img`
width: auto;
height: 50px;
margin: 2px 0 0 8px;
`
const FooterArea = styled.footer`
text-align: center;
padding: 8px ;
background-color: #063506;
color: #67CC3E;
`

const Home: NextPage = () => {
  const TITLE = "あいきゃっちじぇねれーた - manasandbox"
  const DESCRIPTION = "らくらくアイキャッチ作成！"
  return (
    <div>
      <Head>
        <title>{TITLE}</title>
        <meta property="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={`${process.env.SITE_URL}/aza166.png`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderArea>
        <HeaderImg src="/header.svg" width="230" height="150" />
      </HeaderArea>

      <main>
        <Canvas />
      </main>

      <FooterArea>
        <a href="https://manasas.dev/">©︎ 2021 manasas</a>
      </FooterArea>
    </div>
  )
}

export default Home
