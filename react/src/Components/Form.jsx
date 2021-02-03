import React from 'react'
import moment from 'moment'

function Form() {

    function submit(e) {
        e.preventDefault();
        const word = document.forms['word_form']['word'].value
        if(!(/^[a-zA-Z]{1,}$/).test(word)) {
            alert('好好学习！输入英文！')
            return
        }

        fetch('http://localhost:8091/word/add', {
            method: 'POST',
            body: JSON.stringify({word, date: moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(response => response.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))

        document.forms['word_form']['word'].value = ''
    }

    return (
        <form name='word_form' method="get">
            <div className="form_son">
                <label>New word: 
                    <input type="text" name="word" required />
                </label>
            </div>
            <div className="form_son">
                <input type="submit" value='Go!' onClick={ e => submit(e)}/>
            </div>
        </form>
    )
}

export default Form