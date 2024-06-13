const useCheckHistory = () => {
  const savedItem = localStorage.getItem('history');
  const savedHistory = JSON.parse(savedItem);
  return savedHistory || []; // Initialize with saved data or an empty array
};

export default useCheckHistory;
