import classes from './SearchBar.module.css';

const SearchBar = (props) => {

    return (
        <div className={classes.search_container}>
            <input type="text" onChange={props.showSearchedValue} placeholder="Search by name, email or role" className={classes.search}>
            </input>
            <div className={classes.headers}>
                <p className={classes.checkboxspace}>
                    <input
                        type="checkbox"
                        onChange={props.selectAll}
                        checked={props.onSelectAll}
                    />
                </p>
                <p className={classes.namespace}>Name</p>
                <p className={classes.emailspace} >Email</p>
                <p className={classes.rolespace}>Role</p>
                <p className={classes.actionspace}>Actions</p>
            </div>
        </div>
    );
}

export default SearchBar;