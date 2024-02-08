import { useRef } from 'react'
import { Container, Content } from './components/layout'
import { Editor } from './components/screen/Editor'
import { Sidebar } from './components/sidebar/Sidebar'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }
  return (
    <>
      <Container>
        <Sidebar resetScroll={resetScroll} />
        <Content ref={contentContainerRef}>
          <Editor />
        </Content>
      </Container>
    </>
  )
}

export default App
