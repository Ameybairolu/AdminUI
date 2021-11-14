import ContactsRow from "./ContactsRow/ContactsRow";
import classes from "./ContactsContainer.module.css";

const ContactsContainer = (props) => {
    const filteredDataAsPerPageNumber = props.data.filter((_, index) => {
        return index >= (props.onPage - 1) * 6 && index < (props.onPage) * 6;
    })

    const obtainEachRow = filteredDataAsPerPageNumber.map((eachContact) => {
        return (
            <ContactsRow
                key={eachContact.id}
                id={eachContact.id}
                name={eachContact.name}
                email={eachContact.email}
                role={eachContact.role}
                onDeleteUser={props.onDeleteUser}
                checked={eachContact.ischecked}
                onCheckBoxClick={props.onCheckBoxClick}
                onClickEdit={props.onClickEdit
                }
            />
        );
    })

    return (
        <div className={classes.container}>
            {obtainEachRow}
        </div>
    )
}

export default ContactsContainer;