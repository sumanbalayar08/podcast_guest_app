"use server";
import { google } from "googleapis";

const SHEET_ID = process.env.SHEET_ID;

const credentialsBase64 = process.env.CREDENTIALS_BASE_64!;
const credentials = JSON.parse(
  Buffer.from(credentialsBase64, "base64").toString("utf8")
);

const auth = await google.auth.getClient({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const glSheets = google.sheets({ version: "v4", auth });

export async function updateRow(rowIndex: number, values: string[]) {
  try {
    const range = `Sheet1!A${rowIndex}:F${rowIndex}`;

    const response = await glSheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [values],
      },
    });

    return {
      status: true,
      message: "Row updated successfully",
      updatedCells: response.data.updatedCells,
    };
  } catch (error: any) {
    return {
      status: false,
      message: `Failed to update row: ${error.message}`,
    };
  }
}

export async function deleteRow(rowIndex: number) {
  try {
    const response = await glSheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0,
                dimension: "ROWS",
                startIndex: rowIndex - 1,
                endIndex: rowIndex,
              },
            },
          },
        ],
      },
    });

    return {
      status: true,
      message: "Row deleted successfully",
    };
  } catch (error: any) {
    return {
      status: false,
      message: `Failed to delete row: ${error.message}`,
    };
  }
}

const sheetMeta = await glSheets.spreadsheets.get({ spreadsheetId: SHEET_ID });

export async function getQuestionsData() {
  try {
    const data = await glSheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "question_sheet!A1:Z1000",
    });

    return {
      status: true,
      message: "Sheet data retrieved successfully",
      data: data.data.values,
    };
  } catch (error: any) {
    return {
      status: false,
      message: `Failed to fetch sheet data: ${error.message}`,
    };
  }
}

export async function addRow(values: string[]) {
  try {
    const response = await glSheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "guest_response!A1", 
      valueInputOption: "RAW",
      requestBody: {
        values: [values],
      },
    });

    return {
      status: true,
      message: "Row added successfully",
      updatedRange: response.data.updates?.updatedRange,
    };
  } catch (error: any) {
    return {
      status: false,
      message: `Failed to add row: ${error.message}`,
    };
  }
}