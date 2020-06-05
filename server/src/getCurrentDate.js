const getCurrentDate = () => {
    date = new Date();
  
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
  
    const dateString = `${year}-${month}-${day}`
  
    return dateString;
  };

module.exports = getCurrentDate