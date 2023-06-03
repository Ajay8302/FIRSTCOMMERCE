import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Loader from './Loader'


// export const ThemeContext = React.createContext({});

function Layout(props) {
  // const [dardkMode, setDarkMode] = useState(false);   //whether dark Mode Is enabled or not

  return (
    <div>
        {props.loading && (<Loader />)}
        <Header/>
        <div className="content scroll">
            {props.children}
        </div>
        <Footer/>
    </div>
  )
}

export default Layout