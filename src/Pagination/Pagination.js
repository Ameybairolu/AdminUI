import classes from './Pagination.module.css';

const Pagination = (props) => {

    const pageNumbers = Array.from({ length: props.total }, (_, i) => i + 1);
    const filterdPageNumbers = pageNumbers.filter((eachNumber) => {
        return Math.abs(eachNumber - props.onPage) <= 2;
    });

    const pageNumbersButtons = filterdPageNumbers.map(eachNumber => {
        return <button key={eachNumber} className={eachNumber === props.onPage ? `${classes.active_page}` : ''} onClick={props.onPageNumberClick.bind(this, eachNumber)}>{eachNumber}</button>
    })

    return (
        <div className={classes.pagination_container}>
            <div className={classes.delete_all}><button onClick={props.onDeleteSelected} className={classes.delete_selected}>Delete Selected</button></div>
            <div className={classes.page_numbers_container}>
                <button onClick={props.onFirstPage}><i className="fas fa-backward"></i></button>
                <button onClick={props.onPrevPage}><i className="fas fa-step-backward"></i></button>
                {pageNumbersButtons}
                <button onClick={props.onNextPage}><i className="fas fa-step-forward"></i></button>
                <button onClick={props.onLastPage}><i className="fas fa-forward"></i></button>
            </div>
        </div>
    )
}

export default Pagination;