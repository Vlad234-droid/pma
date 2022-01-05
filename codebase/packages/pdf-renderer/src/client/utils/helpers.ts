export const downloadPDF = (url: string, documentName = 'document.pdf') => {
  const link = window.document.createElement('a');
  link.href = url;
  link.download = documentName;
  link.dispatchEvent(new MouseEvent('click'));
};
