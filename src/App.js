import { useCallback, useEffect, useState } from "react";
import ContactsContainer from "./ContactsContainer/ContactsContainer";
import EditDisplay from "./EditDisplay/EditDisplay";
import Pagination from "./Pagination/Pagination";
import SearchBar from "./SearchBar/SearchBar";
import ShortListSearchedValues from "./ReactIndependentFunctions/ShortListSearchedValues";
import toggleHandler from "./ReactIndependentFunctions/ObtainDataAfterCheckboxToggle";
import { SelectAllFromCurrentList, updateMainList } from "./ReactIndependentFunctions/SelectAllFromCurrentList";

import { URL, DATA_ON_EACH_PAGE } from "./ReactIndependentFunctions/MagicData";


function App() {

  // Initializing all the required states

  const [data, dataUpdate] = useState([]);

  const [dataToDisplay, toDisplayUpdate] = useState([]);

  const [currentPage, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const [allSelected, setAllSelected] = useState(false);

  const [showEditDisplay, setEditDisplay] = useState(false);

  const [dataToEdit, setDataToEdit] = useState({});

  // A function that handles pagination. Avoids Repeatedly using the same set of lines

  const setPagination = (referenceArray, pageNumber = 1) => {
    setTotalPages(Math.ceil((referenceArray.length / DATA_ON_EACH_PAGE)));
    setPage(pageNumber);
  }

  // Obtain data from the API

  const fetchContactDataFromAPI = useCallback(
    async () => {
      try {
        const response = await fetch(URL);

        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const result = await response.json();
        result.sort((a, b) => a.name < b.name ? -1 : 1);

        const addingCheckBoxState = result.map(eachUser => {
          const res = {
            ...eachUser,
            "ischecked": false
          }
          return res;
        });
        dataUpdate(addingCheckBoxState);
        toDisplayUpdate(addingCheckBoxState);
        setPagination(addingCheckBoxState);
      } catch (e) {
        console.log(e);
      }
    }, []
  );

  useEffect(() => {
    fetchContactDataFromAPI();
  }, [fetchContactDataFromAPI]);

  // Delete a single user through the action button

  const deleteAUserHandler = (id) => {
    const deleteData = data.filter(item => item.id === id);
    const updatedData = data.filter(item => item.id !== id);
    if (!window.confirm(`Are you sure you want to delete ${deleteData[0].name}'s data?`)) {
      return;
    }
    const updatedShowData = dataToDisplay.filter(item => item.id !== id);
    toDisplayUpdate(updatedShowData);
    dataUpdate(updatedData);

    const limit = Math.ceil((updatedShowData.length / DATA_ON_EACH_PAGE))
    setPagination(updatedShowData, currentPage > limit ? limit : currentPage);
  }

  /****  All for Pagination ****/

  // When we try to change the page through the arrow buttons
  const nextPageHandler = () => {
    if (currentPage === totalPages) {
      return;
    }
    else {
      setPage(currentPage + 1);
      setAllSelected(false);
    }
  }

  const prevPageHandler = () => {
    if (currentPage === 1) {
      return;
    }
    else {
      setPage(currentPage - 1);
      setAllSelected(false);
    }
  }

  const goToFirstPageHandler = () => {
    if (currentPage === 1) {
      return;
    }
    setPage(1);
    setAllSelected(false);
  }

  const goToLastPageHandler = () => {
    if (currentPage === totalPages) {
      return;
    }
    setPage(totalPages);
    setAllSelected(false);
  }

  const onClickingAPageNumberHandler = (num) => {
    setPage(num);
    setAllSelected(false);
  }

  // Function for SearchBar- This is triggered whenever user types something in the searchbar

  const showSearchedValueHandler = (event) => {
    setAllSelected(false);
    if (event.target.value === '') {
      toDisplayUpdate(data);
      setPagination(data, 1);
      return;
    }
    let filteredData = ShortListSearchedValues(data, event.target.value);
    toDisplayUpdate(filteredData);
    setPagination(filteredData, 1);

  }

  // Function for toggling checkbox of a single row
  const toggleCheckBoxHandler = (id) => {
    let updatedData = toggleHandler(data, id);
    let updatedShowData = toggleHandler(dataToDisplay, id);

    toDisplayUpdate(updatedShowData);
    dataUpdate(updatedData);
  }

  // Delete All selected
  const deleteSelectedHandler = () => {
    if (!window.confirm('Are you sure you want to delete Selected data?')) {
      return;
    }
    const updatedData = data.filter(item => !item.ischecked);
    const updatedShowData = dataToDisplay.filter(item => !item.ischecked);
    toDisplayUpdate(updatedShowData);
    dataUpdate(updatedData);

    const limit = Math.ceil((updatedShowData.length / DATA_ON_EACH_PAGE))
    setPagination(updatedShowData, currentPage > limit ? limit : currentPage);

  }

  // Select all from the currently visible list
  const selectAllHandler = () => {
    const updateAllSelected = allSelected;
    setAllSelected(!updateAllSelected);
    const filteredDataAsPerPageNumber = SelectAllFromCurrentList(dataToDisplay, currentPage, updateAllSelected);

    const filteredDataAsPerPageNumberForMainData = updateMainList(filteredDataAsPerPageNumber, data);

    toDisplayUpdate(filteredDataAsPerPageNumber);
    dataUpdate(filteredDataAsPerPageNumberForMainData);
  }

  const onClickEditHandler = (id) => {
    const currState = showEditDisplay;
    setEditDisplay(!currState);

    if (currState) {
      return;
    }

    const selectedData = dataToDisplay.filter(eachUser => eachUser.id === id);
    setDataToEdit(selectedData[0]);
  }

  // When user edits some data, the below function is called 

  const submitHandler = (state) => {

    onClickEditHandler();

    let index = dataToDisplay.findIndex(eachUser => eachUser.id === state.id);
    let updatedData = [...dataToDisplay];
    updatedData[index] = state;

    updatedData.sort((a, b) => a.name < b.name ? -1 : 1);

    toDisplayUpdate(updatedData);

    index = data.findIndex(eachUser => eachUser.id === state.id);
    updatedData = [...data];
    updatedData[index] = state;
    updatedData.sort((a, b) => a.name < b.name ? -1 : 1);
    dataUpdate(updatedData);

  }


  return (
    <>
      {showEditDisplay && <EditDisplay user={dataToEdit} submit={submitHandler} />}
      <SearchBar
        onSelectAll={allSelected}
        showSearchedValue={showSearchedValueHandler}
        selectAll={selectAllHandler}
      />
      <ContactsContainer
        data={dataToDisplay}
        onPage={currentPage}
        onDeleteUser={deleteAUserHandler}
        onCheckBoxClick={toggleCheckBoxHandler}
        onClickEdit={onClickEditHandler}
      />
      <Pagination
        onPage={currentPage}
        onNextPage={nextPageHandler}
        onPrevPage={prevPageHandler}
        onFirstPage={goToFirstPageHandler} onLastPage={goToLastPageHandler} onPageNumberClick={onClickingAPageNumberHandler}
        total={totalPages}
        onDeleteSelected={deleteSelectedHandler} />
    </>
  );
}

export default App;