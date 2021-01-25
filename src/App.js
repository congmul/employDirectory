import React from 'react'
import Header from './components/Header'
import Table from './components/Table'
import Search from './components/Search'

function App() {
    return (
        <div>
            <Header />
            <Search />
            <div style={{"margin": "5rem"}}>
                <Table />
            </div>
        </div>
    )
}

export default App
