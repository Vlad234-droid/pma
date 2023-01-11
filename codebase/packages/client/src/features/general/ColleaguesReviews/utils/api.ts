import { BASE_URL_API } from 'config/constants';
import { Variant } from 'features/general/Toast';
import { formatDateStringFromISO, getFinancialYear } from 'utils/date';
import { Status } from 'config/enum';

const getData = (url) =>
  fetch(
    url +
      new URLSearchParams({
        year: getFinancialYear(),
        status: Status.APPROVED.toLocaleLowerCase(),
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
    return resp.blob().then((blob) => {
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = `ObjectivesReport (${formatDateStringFromISO(
        new Date().toISOString(),
        'dd LLL yyyy HH:mm:ms',
      )}).xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  });
};
