// This is required in order to change the state of row selection

// The SelectAllFromCurrentList is required to update the list that is responsible for showcasing the rows

// The updateMainList is required to update the MAIN LIST. 

// Refer fetchContactDataFromAPI function in App to understand better
const SelectAllFromCurrentList = (obtainedData, currentPage, updateAllSelected) => {
    const filteredDataAsPerPageNumber = obtainedData.map((eachUser, index) => {
        if (index >= (currentPage - 1) * 6 && index < (currentPage) * 6) {
            const updatedEachUser = { ...eachUser };
            updatedEachUser.ischecked = !updateAllSelected;
            return updatedEachUser;
        }
        return eachUser;
    });

    return filteredDataAsPerPageNumber;
}

const updateMainList = (referenceData, mainData) => {
    const updated = mainData.map((eachUser) => {
        const getRef = referenceData.filter(eachRefUser => {
            return eachRefUser.id === eachUser.id;
        })
        if (getRef.length === 1) {
            return getRef[0];
        }
        else {
            return eachUser;
        }

    });

    return updated
}


export { SelectAllFromCurrentList, updateMainList };