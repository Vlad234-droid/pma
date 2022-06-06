export const downloadPDF = async (url: string, documentName = 'document.pdf') => {
  const link = window.document.createElement('a');
  link.href = url;
  link.download = documentName;
  await link.dispatchEvent(new MouseEvent('click'));
};
