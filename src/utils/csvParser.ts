// Helper to parse CSV string into objects
export function parseCSV(text: string): Record<string, string>[] {
  if (!text || !text.trim()) return [];
  
  const lines: string[] = [];
  let row: string[] = [];
  let inQuotes = false;
  let currentVal = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentVal += '"';
          i++; // Skip the next quote
        } else {
          inQuotes = false;
        }
      } else {
        currentVal += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(currentVal.trim());
        currentVal = "";
      } else if (char === "\n" || char === "\r") {
        row.push(currentVal.trim());
        currentVal = "";
        if (row.length > 0 && (row.length > 1 || row[0] !== "")) {
          lines.push(row.join("\x1F")); // Use Unit Separator control char as temp delimiter
        }
        row = [];
        if (char === "\r" && nextChar === "\n") {
          i++; // Skip LF if it was CR-LF
        }
      } else {
        currentVal += char;
      }
    }
  }
  
  if (currentVal || row.length > 0) {
    row.push(currentVal.trim());
    if (row.length > 0 && (row.length > 1 || row[0] !== "")) {
      lines.push(row.join("\x1F"));
    }
  }

  if (lines.length === 0) return [];

  // Parse headers: clean spaces, quotes, and make lowercase
  const headers = lines[0]
    .split("\x1F")
    .map(h => h.toLowerCase().trim().replace(/^["']|["']$/g, ""));
    
  const data: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split("\x1F").map(v => v.trim());
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      // Map column values; fallback to empty string if column missing
      obj[header] = values[index] !== undefined ? values[index].replace(/^["']|["']$/g, "") : "";
    });
    data.push(obj);
  }

  return data;
}

// Convert objects back to CSV string for the raw preview editor
export function arrayToCSV(arr: Record<string, string>[]): string {
  if (arr.length === 0) return "";
  const headers = Object.keys(arr[0]);
  const headerRow = headers.join(",");
  const rows = arr.map(obj => 
    headers.map(header => {
      let val = obj[header] || "";
      if (val.includes(",") || val.includes('"') || val.includes("\n") || val.includes("\r")) {
        val = `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    }).join(",")
  );
  return [headerRow, ...rows].join("\n");
}
