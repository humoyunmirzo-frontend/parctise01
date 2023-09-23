export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log("Error saving data");
  }
};

export const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.log("Error getting data");
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing data");
  }
};
