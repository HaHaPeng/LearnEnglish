import React, { useEffect, useState } from 'react'
import Form from '../Components/Form'

import './Layout.less'

function Layout() {
    const [wordList, setWordList] = useState([])
    useEffect(() => {
        function getWords() {
            fetch('http://localhost:8091/word/get')
            .then(response => response.json())
            .then(res => {
                if(res.code === 'ok') {
                    setWordList(res.data)
                } else {
                    throw res.message
                }
            })
            .catch(err => console.error(err))
        }

        getWords()
    }, [wordList])
    return (
        <div className='layout'>
            {
                !!wordList.length && (
                    <ul>
                        {
                            wordList.map(item => {
                                return (
                                    <li key={item.id}>{item.word}</li>
                                )
                            })
                        }
                    </ul>
                )
            }
            <div className='footer'>
                <Form />
            </div>
        </div>
    )
}

export default Layout