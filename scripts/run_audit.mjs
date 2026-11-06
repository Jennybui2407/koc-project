import fs from 'fs';
import { checkDuplicate, insertKoc, getRows, deleteRow } from './koc_audit.mjs';

const inputPath = './scratch/current_koc.json';

async function main() {
  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file ${inputPath} not found`);
    process.exit(1);
  }

  const payload = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const action = payload.action || 'insert';

  if (action === 'get') {
    const result = await getRows(payload.range || 'A2:Q10');
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  }

  if (action === 'delete') {
    const result = await deleteRow(payload.rowNumber);
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  }

  if (action === 'check') {
    const result = await checkDuplicate(payload.query);
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  }

  if (action === 'insert') {
    const dataToInsert = payload.data || payload;
    const result = await insertKoc(dataToInsert);
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  }

  console.error(`Unknown action: ${action}`);
  process.exit(1);
}

main().catch(err => {
  console.error('Execution error:', err);
  process.exit(1);
});
