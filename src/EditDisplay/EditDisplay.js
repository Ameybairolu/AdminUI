import { useReducer } from 'react';

import classes from './EditDisplay.module.css';


const EditDisplay = (props) => {
    const initialState = {
        ...props.user
    }

    function reducer(state, action) {
        if (action.type === 'name') {
            const updatedData = { ...state };
            updatedData.name = action.item;
            return updatedData;
        }
        if (action.type === 'email') {
            const updatedData = { ...state };
            updatedData.email = action.item;
            return updatedData;
        }
        if (action.type === 'role') {
            const updatedData = { ...state };
            updatedData.role = action.item;
            return updatedData;
        }

        return initialState;

    }

    const [state, dispatch] = useReducer(reducer, initialState);

    function uponMakingChanges(changed, event) {
        dispatch({
            type: changed,
            item: event.target.value
        });
    }

    function submitHandler(event) {
        event.preventDefault();
        props.submit(state);
    }

    return (
        <div className={classes.edit_container}>
            <div className={classes.modal}>
                <br />
                <form className={classes.form} onSubmit={submitHandler}>
                    <h5>Name:</h5>
                    <input type="text" defaultValue={state.name} onChange={uponMakingChanges.bind(this, "name")} />
                    <h5>Email:</h5>
                    <input type="text" defaultValue={state.email} onChange={uponMakingChanges.bind(this, "email")} />
                    <h5>Role:</h5>
                    <input type="text" defaultValue={state.role} onChange={uponMakingChanges.bind(this, "role")} />
                    <p className={classes.submit}><button type="submit" >Edit Changes</button></p>
                </form>
            </div>
        </div>
    )
}

export default EditDisplay;