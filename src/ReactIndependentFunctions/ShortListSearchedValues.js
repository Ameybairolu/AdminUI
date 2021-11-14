// Based on the search query, retreive relevant data

const ShortListSearchedValues = (obtainedData, obtainedString) => {
    const filteredData = obtainedData.filter((eachPerson) => {
        let searchQuery = obtainedString.toLowerCase();
        return eachPerson.name.toLowerCase().includes(searchQuery) || eachPerson.email.toLowerCase().includes(searchQuery) || eachPerson.role.toLowerCase().includes(searchQuery)
    });
    return filteredData;
}

export default ShortListSearchedValues;