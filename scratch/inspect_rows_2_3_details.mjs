import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

const spreadsheetId = '1J7pUE_SV-ToO8jNuZZYktu8HsYhYVHVO5GjNwOWJolw';
const sheetTitle = 'Data KOC (11/2026)';

async function inspectRows2and3() {
  const auth = await getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: [`'${sheetTitle}'!A1:Q10`],
    includeGridData: true,
  });

  const sheet = res.data.sheets?.[0];
  const rowData = sheet?.data?.[0]?.rowData || [];

  for (let r = 0; r < rowData.length; r++) {
    const rowNum = r + 1;
    const cells = rowData[r]?.values || [];
    console.log(`\n================ ROW ${rowNum} ================`);
    cells.forEach((c, idx) => {
      const colLetter = String.fromCharCode(65 + idx);
      const val = c.formattedValue || '';
      const enteredVal = c.userEnteredValue ? JSON.stringify(c.userEnteredValue) : '';
      const effFmt = c.effectiveFormat || {};
      const tf = effFmt.textFormat || {};
      const bg = effFmt.backgroundColor || {};
      const halign = effFmt.horizontalAlignment || '';
      const valign = effFmt.verticalAlignment || '';
      const wrap = effFmt.wrapStrategy || '';
      const dataVal = c.dataValidation ? JSON.stringify(c.dataValidation) : '';

      if (val || enteredVal || dataVal || tf.fontFamily || halign) {
        console.log(`[${colLetter}] val: "${val}" | entered: ${enteredVal} | font: ${tf.fontFamily} ${tf.fontSize}pt | align: ${halign}/${valign} | wrap: ${wrap} | dataVal: ${dataVal ? 'YES' : 'no'}`);
        if (dataVal) {
          console.log(`     -> DataVal details: ${dataVal}`);
        }
      }
    });
  }
}

inspectRows2and3().catch(console.error);

