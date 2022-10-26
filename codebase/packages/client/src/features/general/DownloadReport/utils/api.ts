import { BASE_URL_API } from 'config/constants';
import { formatDateStringFromISO } from 'utils';

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
      a.download = `Statistics Report (${formatDateStringFromISO(
        new Date().toISOString(),
        'dd LLL yyyy HH:mm:ms',
      )}).xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }),
  );
};
