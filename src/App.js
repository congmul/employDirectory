import React from 'react'
import Header from './components/Header'
import Table from './components/Table'


function App() {
    return (
        <div>
            <Header />
            <div style={{"margin": "5rem"}}>
                <Table />
            </div>
        </div>
    )
}

export default App
