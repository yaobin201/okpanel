import { Outlet } from 'react-router-dom'
import GlobalHeader from '@/components/GlobalHeader'
import { ConfigProvider, Layout, Flex } from 'antd'
import './App.less'
import { Provider } from 'react-redux';
import store from './store';

function App() {
  const headerStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  }

  return <Provider store={store}>
    <ConfigProvider theme={{
      token: {
        colorPrimary: 'rgb(175, 255, 255)',
      },
      components: {
        Menu: {
          itemColor: '#e0e0e0',
          itemActiveBg: '#ffffff',
          fontSize: '14px'
        }
      },
    }}>
      <Flex gap="middle" wrap>
      <Layout className='main-layout'>
        <Layout.Header style={headerStyle}>
          <GlobalHeader />
        </Layout.Header>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
      </Flex>
    </ConfigProvider>
  </Provider>
}

export default App
