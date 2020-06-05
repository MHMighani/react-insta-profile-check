function editInfoBeforeAdding(userInfo){
    const editedInfo = {...userInfo}

    editedInfo.full_name = userInfo.full_name.split("\\").join("\\\\");
    editedInfo.biography = userInfo.biography.split("\\").join("\\\\").split(`'`).join(`\\'`);

    return editedInfo
}

module.exports = editInfoBeforeAdding