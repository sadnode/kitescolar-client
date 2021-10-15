export function PDFViewer() {
  const styles = {
    width: '90vw',
    height: '85vh'
  }

  const url = "http://localhost:3001/pdf.pdf";
  return(
    <iframe title="PDF" style={styles} src={url}></iframe>
  );
}