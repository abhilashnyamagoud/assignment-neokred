const downloadHtml=(data)=>{
    const htmlContent = data
  // Create a Blob object from the HTML content
  const blob = new Blob([htmlContent], { type: 'text/html' });

  // Create a download link
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'markdown.html';
  document.body.appendChild(a);
  a.click();

  // Cleanup
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
export default downloadHtml