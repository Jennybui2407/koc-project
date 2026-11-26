import fs from 'fs';
import { checkDuplicate, cleanChannelName, insertKoc, getRows, deleteRow } from './koc_audit.mjs';

const inputPath = './scratch/current_koc.json';

async function runAutoAudit(data) {
  const cleanName = cleanChannelName(data.channelName || data.name);
  const username = (data.username || '').trim().replace(/^@/, '');

  const seenRows = new Map();

  if (username) {
    const userRes = await checkDuplicate(username);
    for (const m of userRes.matchesCurrent) {
      seenRows.set(m.rowNumber, m);
    }
  }

  if (cleanName && cleanName !== 'không có') {
    const nameRes = await checkDuplicate(cleanName);
    for (const m of nameRes.matchesCurrent) {
      const existingChannel = (m.channelName || '').trim().toLowerCase();
      const existingReal = (m.name || '').trim().toLowerCase();
      if (existingChannel === cleanName.toLowerCase() || existingReal === cleanName.toLowerCase()) {
        seenRows.set(m.rowNumber, m);
      }
    }
  }

  const allMatches = Array.from(seenRows.values());
  const blockedMatches = allMatches.filter(m => m.isBlocked);

  if (blockedMatches.length > 0) {
    return {
      status: 'DUPLICATE_BLOCKED',
      blockedMatches,
      allMatches,
    };
  }

  const insertResult = await insertKoc(data);
  const verifiedRows = await getRows(`A${insertResult.rowNumber}:Q${insertResult.rowNumber}`);

  return {
    status: 'INSERTED',
    ...insertResult,
    duplicateHistory: allMatches,
    verifiedRow: verifiedRows[0] || [],
  };
}

async function main() {
  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file ${inputPath} not found`);
    process.exit(1);
  }

  const payload = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const action = payload.action || 'auto';

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

  if (action === 'auto') {
    const dataToInsert = payload.data || payload;
    const result = await runAutoAudit(dataToInsert);
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
