import { Octokit } from "octokit";
import Compressor from "compressorjs";

/**
 * 延遲執行的 Promise 函式，用於等待一定的時間。
 * @param {number} ms - 要延遲的時間（毫秒）。
 * @returns {Promise<void>} 一個 Promise，在指定時間後被解析。
 */
export function delay(ms) {
  return new Promise((resolve) => {
    let start = performance.now();
    function frame(time) {
      if (time - start >= ms) {
        resolve();
      } else {
        requestAnimationFrame(frame);
      }
    }
    requestAnimationFrame(frame);
  });
}

/**
 * 取得系統主題模式。
 * @function getSystemTheme
 * @returns {string} 返回系統主題模式，可能值為 'dark'（暗色模式）或 'light'（亮色模式）。
 */
export const getSystemTheme = () => {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

/**
 * 上傳具有指定編碼的文件至指定路徑。
 * @param {string} content - 文件內容的 Base64 編碼。
 * @param {string} path - 欲上傳的路徑。
 * @returns {Promise<void>} 當上傳完成時解析的 Promise。
 */
export async function uploadFile(content, path) {
  const octokit = new Octokit({ auth: sessionStorage.getItem("password") });
  let sha;

  try {
    const request = "GET /repos/{owner}/{repo}/contents/{path}";
    const file = await octokit.request(request, {
      owner: sessionStorage.getItem("username"),
      repo: "1ureka.store",
      path,
    });
    sha = file?.data?.sha;
  } catch (error) {
    sha = null;
  }

  try {
    await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
      owner: sessionStorage.getItem("username"),
      repo: "1ureka.store",
      path,
      sha,
      content,
      message: `uplaod ${path}`,
      committer: {
        name: "Octokit",
        email: "Octokit@github.com",
      },
    });
  } catch (error) {
    console.error(`無法上傳檔案: ${path}`, error);
  }
}

/**
 * 加載指定路徑的文件。
 * @param {string} path - 文件的路徑。
 * @returns {Promise<string | Array>} 包含文件內容編碼而成的Base64的 Promise。
 */
export async function loadFile(path, avoidCache = false) {
  try {
    const octokit = new Octokit({ auth: sessionStorage.getItem("password") });
    const request = "GET /repos/{owner}/{repo}/contents/{path}";
    const { data } = await octokit.request(request, {
      owner: sessionStorage.getItem("username"),
      repo: "1ureka.store",
      path,
      headers: avoidCache ? { "If-None-Match": "" } : null,
    });
    if (data?.type === "file") return data.content;
    return data;
  } catch (error) {
    console.error(`無法讀取檔案: ${path}`, error);
  }
}

/**
 * 刪除指定路徑的文件。
 * @param {string} path - 文件的路徑。
 * @returns {Promise<void>} 當刪除完成時解析的 Promise。
 */
export async function deleteFile(path) {
  const octokit = new Octokit({ auth: sessionStorage.getItem("password") });

  try {
    const request = "GET /repos/{owner}/{repo}/contents/{path}";
    const file = await octokit.request(request, {
      owner: sessionStorage.getItem("username"),
      repo: "1ureka.store",
      path,
    });

    const sha = file?.data?.sha;

    await octokit.request("DELETE /repos/{owner}/{repo}/contents/{path}", {
      owner: sessionStorage.getItem("username"),
      repo: "1ureka.store",
      path,
      sha,
      message: `delete ${path}`,
      committer: {
        name: "Octokit",
        email: "Octokit@github.com",
      },
    });
  } catch (error) {
    console.error(`無法刪除檔案: ${path}`, error);
  }
}

/**
 * 執行指定後端程式碼並返回輸出。
 * @param {string} program  - 執行的程式名稱
 * @returns {Promise<{result: Object, timeStamp: Number}>}
 */
export async function runWorkflow(program) {
  const octokit = new Octokit({ auth: sessionStorage.getItem("password") });
  const startTimeStamp = Date.now();
  console.log("按下按鈕，開始執行程式。當前時間戳：", startTimeStamp);

  await octokit.request(
    "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches",
    {
      owner: sessionStorage.getItem("username"),
      repo: "1ureka.store",
      workflow_id: "backend_workflow.yml",
      ref: "main",
      inputs: { program },
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  const fetchResult = async () => {
    await delay(1000);

    const { data } = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: sessionStorage.getItem("username"),
        repo: "1ureka.store",
        path: `output.json`,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          "If-None-Match": "",
        },
      }
    );

    const { timeStamp } = JSON.parse(base64ToString(data.content));
    if (timeStamp <= startTimeStamp) return await fetchResult();

    return JSON.parse(base64ToString(data.content));
  };

  const data = await fetchResult();
  console.log("輪巡完畢");
  return data;
}

/**
 * 將字符串轉換為 Base64 編碼。
 * @param {string} str - 要進行編碼的字符串。
 * @returns {string} - 返回 Base64 編碼的結果。
 */
export function stringToBase64(str) {
  const encoder = new TextEncoder();
  const utf8Bytes = encoder.encode(str);
  return btoa(String.fromCharCode.apply(null, utf8Bytes));
}

/**
 * 將 Base64 編碼的字符串轉換為原始字符串。
 * @param {string} encodedStr - 要進行解碼的 Base64 編碼字符串。
 * @returns {string} - 返回解碼後的原始字符串。
 */
export function base64ToString(encodedStr) {
  const decoder = new TextDecoder();
  const utf8Bytes = new Uint8Array(
    atob(encodedStr)
      .split("")
      .map((char) => char.charCodeAt(0))
  );
  return decoder.decode(utf8Bytes);
}

/**
 * 使用 async/await 解碼圖片，如果解碼失敗，將進行重試直到成功。
 * @param {Image} image - 要解碼的圖片物件。
 * @returns {Promise<void>} 一個 Promise，在解碼完成後被解析。
 */
export async function decode(image, attempt = 0) {
  try {
    await image.decode();
  } catch (error) {
    if (attempt < 1000) {
      await decode(image, attempt + 1);
    } else {
      throw new Error(`Reached maximum decode attempts (1000)`);
    }
  }
}

/**
 * 獲取 Blob 或 File 的dataUrl。
 * @param {Blob | File} blob - 要獲取dataUrl的 Blob 或 File 對象。
 * @returns {Promise<String>} 包含 dataUrl 的 Promise。
 */
export function blobGetDataUrl(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(blob);
  });
}

/**
 * 獲取 Blob 或 File 的高度和寬度。
 * @param {Blob | File} blob - 要獲取尺寸的 Blob 或 File 對象。
 * @returns {Promise<{ width: number, height: number }>} 包含 width 和 height 的 Promise。
 */
export async function blobGetDimensions(blob) {
  try {
    const dataUrl = await blobGetDataUrl(blob);
    return await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function () {
        resolve({ width: this.width, height: this.height });
      };
      img.onerror = function () {
        reject(new Error("Failed to load image."));
      };
      img.src = dataUrl;
    });
  } catch {
    throw new Error("Failed to read blob.");
  }
}

/**
 * 創建包含飽和度、對比度和曝光度的 CSS 濾鏡字串。
 * @param {Object} options - 濾鏡選項。
 * @param {number} options.saturate - 飽和度。
 * @param {number} options.contrast - 對比度。
 * @param {number} options.exposure - 曝光度。
 * @returns {string} 返回 CSS 濾鏡字串。
 */
export function createFilter({ saturate, contrast, exposure }) {
  const filters = [
    saturate !== 1 ? `saturate(${saturate})` : "",
    contrast !== 1 ? `contrast(${contrast})` : "",
    exposure !== 1 ? `brightness(${exposure})` : "",
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return filters;
}

/**
 * 壓縮圖片並返回 Blob。
 * @param {Blob | File} file - 欲壓縮的圖片檔案。
 * @param {Object} options - 壓縮選項。
 * @param {string} [options.type="webp"] - 壓縮後的圖片格式，預設為 "webp"。
 * @param {number} [options.scale=1] - 圖片縮放比例，預設為 1。
 * @param {number} [options.maxSize=1048576] - 壓縮後的最大文件大小（以字節為單位），預設為 1024 * 1024 (1MB)。
 * @returns {Promise<Blob>} 回傳包含 Blob 的 Promise 物件。
 */
export async function compressImage(file, options) {
  let blob = new Blob([file], { type: file.type });

  options = options || {};
  const { type = "webp", scale = 1, maxSize = 1024 * 1024 } = options;
  const { width, height } = await blobGetDimensions(blob);

  let quality = 1.0;
  while (quality === 1.0 || blob.size > maxSize) {
    blob = await new Promise((resolve) => {
      new Compressor(blob, {
        width: width * scale,
        height: height * scale,
        mimeType: `image/${type}`,
        convertSize: Infinity,
        quality,
        success: resolve,
      });
    });

    if (type === "png") break;

    quality *= 0.9;
    if (quality < 0.05) {
      console.warn(`無法壓縮到指定大小以下，最終大小：${blob.size}`);
      break;
    }
  }

  return blob;
}

/**
 * 應用濾鏡，返回 Blob。
 * @param {Blob | File} file - 欲處理的圖片檔案。
 * @param {Object} options - 濾鏡選項。
 * @param {number} [options.saturate=1] - 飽和度，預設為 1。
 * @param {number} [options.contrast=1] - 對比度，預設為 1。
 * @param {number} [options.exposure=1] - 曝光度，預設為 1。
 * @returns {Promise<Blob>} 回傳包含 Blob 的 Promise 物件。
 */
export async function filterImage(file, options) {
  let blob = new Blob([file], { type: file.type });

  options = options || {};
  const { saturate = 1, contrast = 1, exposure = 1 } = options;
  const filters = createFilter({ saturate, contrast, exposure });

  blob = await new Promise((resolve) => {
    new Compressor(blob, {
      mimeType: `image/png`,
      convertSize: Infinity,
      success: resolve,
      beforeDraw(context) {
        context.filter = filters;
      },
    });
  });

  return blob;
}

/**
 * 從用戶的設備取得檔案 (例如: 圖片、文件等)。
 * @param {string} [accept="image/*"] - 指定接受的檔案類型，預設為所有圖片類型。
 * @param {boolean} [multiple=true] - 是否允許多選檔案，預設為允許。
 * @returns {Promise<File[]>} 包含所選檔案的 Promise。
 */
export async function getNativeFiles(accept = "image/*", multiple = true) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = accept;
  input.multiple = multiple;
  input.style.display = "none";

  const fileList = await new Promise((resolve) => {
    input.addEventListener("cancel", () => resolve([]));
    input.addEventListener("change", () => resolve(input.files));
    document.body.appendChild(input);
    input.click();
  });

  input.remove();
  return Array.from(fileList);
}
