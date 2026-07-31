import React, { useEffect } from 'react'
import Home from './pages/Home'
import './styles/Global.scss'
import { initSound } from './lib/audio'

const App = () => {
    // Desbloquea el audio en el primer gesto del usuario.
    useEffect(() => {
        initSound()
    }, [])

    return (
        <>
            <Home />
       
        </>
    )
}

export default App