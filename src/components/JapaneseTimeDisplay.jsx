const JapaneseTimeDisplay = ({ utcTimeString }) => {
  const utcDate = new Date(utcTimeString);
  const japanDate = new Date(
    utcDate.toLocaleString("en-US", { timeZone: "Asia/Tokyo" })
  );

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
  };

  return formatDate(japanDate);
};

export default JapaneseTimeDisplay;
