import { BASE_URL_API } from 'config/constants';
import { years } from '../config';
import { Status } from 'config/enum';

async function getData(url) {
  const response = await fetch(
    url +
      new URLSearchParams({
        year: years[2021],
        'statuses_in[0]': Status.APPROVED,
      }),
  );
  return await response;
}

const downloadCsvFile = async () => {
  getData(`${BASE_URL_API}reports/linked-objective-report/formats/excel?`).then((resp) =>
    resp.blob().then((blob) => {
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = 'ObjectivesReport.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }),
  );
};

export default downloadCsvFile;
