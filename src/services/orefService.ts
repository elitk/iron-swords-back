import axios from "axios";
import { Period } from "../enums/period";
import { formatDate } from "../utils/formatDate";

type CustomDates = {
  startDate: Date;
  endDate: Date;
};
export const fetchData = async (period: Period, customDates?: CustomDates) => {
  console.log(`Fetching data for period: ${period}`);
  let periodFormat;
  let languageFormat = "en";
  switch (period) {
    case Period.Daily:
      periodFormat = 1;
      break;
    case Period.Weekly:
      periodFormat = 2;
      break;
    case Period.Monthly:
      periodFormat = 3;
      break;
    case Period.Custom:
      periodFormat = 0;
      break;
    default:
      periodFormat = 1;
      break;
  }

  
  const url = `https://www.oref.org.il//Shared/Ajax/GetAlarmsHistory.aspx`;
  // &fromDate=07.03.2024&toDate=28.03.2024&mode=0
  try {
    const response = await axios.get(url, {
      params: {
        ...(customDates && {
          fromDate: formatDate(customDates.endDate),
          toDate: formatDate(customDates.startDate),
        }),
        mode: periodFormat,
        lang: languageFormat,
      },
    });
    return response.data; // This will return the fetched data
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error; // Rethrow or handle error appropriately
  }
};
