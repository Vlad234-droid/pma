import { BASE_URL_API } from 'config/constants';
import { Status } from 'config/enum';
import { Variant } from 'features/Toast';
import { getCurrentYear } from 'utils/date';

async function getData(url) {
  const response = await fetch(
    url +
      new URLSearchParams({
        year: getCurrentYear(),
        'statuses_in[0]': Status.APPROVED,
      }),
  );
  return await response;
}

export const downloadCsvFile = async (t, addToast) => {
  getData(`${BASE_URL_API}/reports/linked-objective-report/formats/excel?`).then((resp) => {
    if (!resp.ok) {
      return addToast({
        id: Date.now().toString(),
        title: t('objectives_statistics_not_found', 'Objectives statistics not found'),
        description: 'Try to select another year.',
        variant: Variant.ERROR,
      });
    }

    return resp.blob().then((blob) => {
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = 'ObjectivesReport.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  });
};

async function getReportStatistics(url, { year, topics }) {
  const params = new URLSearchParams(topics.map((topic, index) => [`topics_in[${index}]`, topic]));
  params.append('year', year);
  const response = await fetch(url + params);
  return await response;
}

export const downloadReportStatistics = async (queryParams) => {
  getReportStatistics(`${BASE_URL_API}/reports/statistics-report/formats/excel?`, queryParams).then((resp) =>
    resp.blob().then((blob) => {
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = 'Statistics Report.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }),
  );
};
