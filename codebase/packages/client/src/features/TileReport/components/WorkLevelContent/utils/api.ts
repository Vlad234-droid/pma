import { BASE_URL_API } from 'config/constants';
import { Variant } from 'features/Toast';
import { getCurrentYear, formatDateStringFromISO } from 'utils/date';
import { Status } from 'config/enum';

const getData = (url) =>
  fetch(
    url +
      new URLSearchParams({
        year: getCurrentYear(),
        'statuses_in[0]': Status.APPROVED,
      }),
  );

export const downloadCsvFile = (t, addToast) => {
  getData(`${BASE_URL_API}/reports/linked-objective-report/formats/excel?`).then((resp) => {
    if (!resp.ok) {
      return addToast({
        id: Date.now().toString(),
        title: t('objectives_statistics_not_found', 'Objectives statistics not found'),
        description: t('try_to_select_another_year', 'Try to select another year.'),
        variant: Variant.ERROR,
      });
    }
    console.log('resp', resp);
    return resp.blob().then((blob) => {
      console.log('blob', blob);
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
