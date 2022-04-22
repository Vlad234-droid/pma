import { BASE_URL_API } from 'config/constants';
import { formatDateStringFromISO } from 'utils/date';

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
