import { BASE_URL_API } from 'config/constants';
import { Status } from 'config/enum';
import { Variant } from 'features/Toast';
import { formatDateStringFromISO, getCurrentYear } from 'utils/date';

// TODO: move to api lib
async function getData(url) {
  return await fetch(
    url +
      new URLSearchParams({
        year: getCurrentYear(),
        'statuses_in[0]': Status.APPROVED,
      }),
  );
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
      a.download = `ObjectivesReport.xlsx (${formatDateStringFromISO(
        new Date().toISOString(),
        'dd LLL yyyy HH:mm:ms',
      )})`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  });
};

// TODO: move to api lib
async function getReportStatistics(url, { year, topics }) {
  const params = new URLSearchParams(topics.map((topic, index) => [`topics_in[${index}]`, topic]));
  params.append('year', year);
  return await fetch(url + params);
}

export const downloadReportStatistics = async (queryParams) => {
  getReportStatistics(`${BASE_URL_API}/reports/statistics-report/formats/excel?`, queryParams).then((resp) =>
    resp.blob().then((blob) => {
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = `Statistics Report.xlsx (${formatDateStringFromISO(
        new Date().toISOString(),
        'dd LLL yyyy HH:mm:ms',
      )})`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }),
  );
};
