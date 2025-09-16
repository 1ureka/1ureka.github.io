import { getClient } from "./client";
import { tryCatch } from "@/utils/tryCatch";

const resetDatabase = () => {
  const client = getClient();
  return client.reset();
};

/**
 * 新增資料到指定表格
 * @param params 新增參數
 * @returns 操作結果
 */
const insertRow = async (params: {
  table: string;
  data: Record<string, any>;
}): Promise<{ success: boolean; error: string | null; insertId?: number }> => {
  try {
    const { table, data } = params;
    const client = getClient();

    // 建構 INSERT 語句
    const columns = Object.keys(data);
    const placeholders = columns.map(col => `$${col}`).join(', ');
    const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;

    // 建構參數對象
    const sqlParams = Object.fromEntries(
      columns.map(col => [`$${col}`, data[col]])
    );

    const { data: _, error } = await tryCatch(
      client.exec(sql, sqlParams)
    );

    if (error) {
      return { success: false, error: error.message || "新增資料失敗" };
    }

    // 獲取插入的 ID (如果有的話)
    const { data: lastIdResult } = await tryCatch(
      client.exec("SELECT last_insert_rowid() as id")
    );

    const insertId = lastIdResult && lastIdResult.length > 0 ? lastIdResult[0].id as number : undefined;

    return { success: true, error: null, insertId };
  } catch (error) {
    return { success: false, error: "新增資料過程中發生錯誤" };
  }
};

/**
 * 更新資料
 * @param params 更新參數
 * @returns 操作結果
 */
const updateRow = async (params: {
  table: string;
  data: Record<string, any>;
  where: Record<string, any>;
}): Promise<{ success: boolean; error: string | null; rowsAffected?: number }> => {
  try {
    const { table, data, where } = params;
    const client = getClient();

    // 建構 UPDATE 語句
    const setColumns = Object.keys(data);
    const whereColumns = Object.keys(where);
    
    const setClause = setColumns.map(col => `${col} = $set_${col}`).join(', ');
    const whereClause = whereColumns.map(col => `${col} = $where_${col}`).join(' AND ');
    
    const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;

    // 建構參數對象
    const sqlParams = {
      ...Object.fromEntries(setColumns.map(col => [`$set_${col}`, data[col]])),
      ...Object.fromEntries(whereColumns.map(col => [`$where_${col}`, where[col]])),
    };

    const { error } = await tryCatch(
      client.exec(sql, sqlParams)
    );

    if (error) {
      return { success: false, error: error.message || "更新資料失敗" };
    }

    // 獲取影響的行數
    const { data: changesResult } = await tryCatch(
      client.exec("SELECT changes() as rowsAffected")
    );

    const rowsAffected = changesResult && changesResult.length > 0 ? changesResult[0].rowsAffected as number : 0;

    return { success: true, error: null, rowsAffected };
  } catch (error) {
    return { success: false, error: "更新資料過程中發生錯誤" };
  }
};

/**
 * 刪除資料
 * @param params 刪除參數
 * @returns 操作結果
 */
const deleteRows = async (params: {
  table: string;
  where: Record<string, any>;
}): Promise<{ success: boolean; error: string | null; rowsAffected?: number }> => {
  try {
    const { table, where } = params;
    const client = getClient();

    // 建構 DELETE 語句
    const whereColumns = Object.keys(where);
    const whereClause = whereColumns.map(col => `${col} = $${col}`).join(' AND ');
    
    const sql = `DELETE FROM ${table} WHERE ${whereClause}`;

    // 建構參數對象
    const sqlParams = Object.fromEntries(
      whereColumns.map(col => [`$${col}`, where[col]])
    );

    const { error } = await tryCatch(
      client.exec(sql, sqlParams)
    );

    if (error) {
      return { success: false, error: error.message || "刪除資料失敗" };
    }

    // 獲取影響的行數
    const { data: changesResult } = await tryCatch(
      client.exec("SELECT changes() as rowsAffected")
    );

    const rowsAffected = changesResult && changesResult.length > 0 ? changesResult[0].rowsAffected as number : 0;

    return { success: true, error: null, rowsAffected };
  } catch (error) {
    return { success: false, error: "刪除資料過程中發生錯誤" };
  }
};

/**
 * 批次刪除資料 (根據 JSON 表示的行)
 * @param params 批次刪除參數
 * @returns 操作結果
 */
const deleteRowsByIds = async (params: {
  table: string;
  rowIds: string[]; // JSON 字串表示的行資料
}): Promise<{ success: boolean; error: string | null; rowsAffected?: number }> => {
  try {
    const { table, rowIds } = params;

    if (rowIds.length === 0) {
      return { success: true, error: null, rowsAffected: 0 };
    }

    let totalRowsAffected = 0;

    // 解析每個 rowId 並刪除對應的行
    for (const rowId of rowIds) {
      try {
        const rowData = JSON.parse(rowId);
        const result = await deleteRows({ table, where: rowData });
        
        if (!result.success) {
          return { success: false, error: result.error };
        }
        
        totalRowsAffected += result.rowsAffected || 0;
      } catch (parseError) {
        return { success: false, error: "無效的行資料格式" };
      }
    }

    return { success: true, error: null, rowsAffected: totalRowsAffected };
  } catch (error) {
    return { success: false, error: "批次刪除過程中發生錯誤" };
  }
};

export { resetDatabase, insertRow, updateRow, deleteRows, deleteRowsByIds };
