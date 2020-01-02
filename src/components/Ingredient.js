import React from 'react';
import styled from 'styled-components';

const Ingredient = () => {

    const [name, setName] = React.useState('');

    const saveAndExit = async () => {
        try {
            const ingredient = {
                name
            }
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mutation: `{ createFile { path : \'./../apps/Ingredients App/data/ingredient/ingredient/${ name }.json\', content : ${ ingredient } } }` })
            })
            const res = await response.json();
            console.log(res);
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <Style>
            <div className="top-bar">
                <div className="left">
                    <input placeholder="Untitled Ingredient" value={ name } onChange={ (e) => setName(e.target.value) }/>
                </div>
                <div className="right">
                    <span>
                        Open in editor
                    </span>
                    <span onClick={ saveAndExit }>
                        Save and Exit
                    </span>
                    <span>
                        Publish
                    </span>
                </div>
            </div>
            <div className="content">
                <div className="allergans">
                    <label> Allergans </label>
                    <div className="allergans-list">

                    </div>
                </div>
            </div>
        </Style>
    );
}

export default Ingredient;

const Style = styled.div`
    .top-bar {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #D8D8D8;
        padding: 15px 0;

        .right {
            span:not(:last-child) {
                margin-right: 20px;
            }
        }
    }
`