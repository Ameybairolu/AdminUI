const toggleHandler = (obtainedData, id) => {
    let updatedData = obtainedData.map(item => {
        if (item.id !== id) return item;
        const manipulatedItem = { ...item };
        const bool = manipulatedItem.ischecked;
        manipulatedItem.ischecked = !bool;
        return manipulatedItem;
    });

    return updatedData;
}

export default toggleHandler;