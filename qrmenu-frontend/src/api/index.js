import axios from 'axios';
export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');

        return data.map(({ delivered, pendingOrder, dateChecked: date }) => ({ delivered: delivered, pendingOrder: pendingOrder, date }));
    } catch (error) {
        return error;
    }
};
