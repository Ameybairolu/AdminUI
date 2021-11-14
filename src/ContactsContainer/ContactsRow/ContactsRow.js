import classes from './ContactsRow.module.css';

const ContactsRow = (props) => {

    return (
        <>
            <div className={`${classes.common} ${props.checked ? `${classes.selected}` : ''}`} >
                <div className={classes.details}>
                    <p className={classes.checkboxspace}>
                        <input type="checkbox"
                            onChange={props.onCheckBoxClick.bind(this, props.id)}
                            checked={props.checked} />
                    </p>
                    <p className={classes.namespace}>{props.name}</p>
                    <p className={classes.emailspace}>{props.email}</p>
                    <p className={classes.rolespace}>{props.role}</p>
                    <p className={classes.actionspace}><span onClick={props.onClickEdit.bind(this, props.id)}><i className="fas fa-edit"></i></span><span onClick={props.onDeleteUser.bind(this, props.id)}> &nbsp;&nbsp; <i className="fas fa-trash-alt"></i></span></p>
                </div>
            </div>
        </>
    );
};

export default ContactsRow;
// 10 20 30 20 20