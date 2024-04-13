import gsap from "gsap";
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
 * 滑動至指定元素。
 * @param {Node} target @param {number} duration
 * @returns {Promise<void>}
 */
export const scrollTo = async (target, duration) => {
  return new Promise((resolve) => {
    gsap.to(target.parentElement, {
      scrollTop: target.offsetTop,
      duration: duration,
      overwrite: "auto",
      ease: "power2.inOut",
      onComplete: resolve,
    });
  });
};

/**
 * 上傳具有指定編碼的文件至指定路徑。
 * @param {string} file - 文件內容的 Base64 編碼。
 * @param {string} path - 欲上傳的路徑。
 * @returns {Promise<void>} 當上傳完成時解析的 Promise。
 */
export async function uploadFile(file, path) {
  // const message = `uplaod ${path} ${Date()}`;
  // const detail = { file, path, message };
  await delay(2000);
  try {
    const origin = JSON.parse(base64ToString(file));
    console.log("上傳");
    console.log(origin);
    console.log(`至 ${path}`);
  } catch (err) {
    console.log("file is not valid json");
  }
}

/**
 * 加載指定路徑的文件。
 * @param {string} path - 文件的路徑。
 * @returns {Promise<string>} 包含文件內容編碼而成的Base64的 Promise。
 */
export async function loadFile(path) {
  try {
    console.log(`準備開始載入${path}`);
    const octokit = new Octokit({ auth: sessionStorage.getItem("password") });
    const fileContent = await octokit.rest.repos.getContent({
      owner: sessionStorage.getItem("username"),
      repo: "Repo",
      path,
    });
    console.log(`載入${path}完成`);
    return fileContent.data.content;
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
  // const message = `delete ${path} ${Date()}`;
  // const detail = { path, message };
  await delay(2000);
}

/**
 * 檢查有效性並返回通知及時間戳。
 * @returns {Promise<{ notifications: string[], timeStamp: number }>} 返回一個包含通知和時間戳的 Promise 對象。
 */
export async function checkValid() {
  const octokit = new Octokit({ auth: sessionStorage.getItem("password") });
  const startTimeStamp = Date.now();
  console.log("按下按鈕，開始執行程式。當前時間戳：", startTimeStamp);

  await octokit.request(
    "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches",
    {
      owner: sessionStorage.getItem("username"),
      repo: "Repo",
      workflow_id: "validator.yml",
      ref: "main",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  const fetchValid = async () => {
    await delay(2500);

    const {
      data: { content },
    } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner: sessionStorage.getItem("username"),
      repo: "Repo",
      path: "valid.json",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
        "If-None-Match": "",
      },
    });

    let data = JSON.parse(base64ToString(content));
    console.log(data.timeStamp, startTimeStamp);

    if (!(data.timeStamp > startTimeStamp)) data = await fetchValid();
    return data;
  };

  const data = await fetchValid();
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
 * 壓縮圖片並返回 base64 編碼的數據 URL。
 * @param {File} file - 要壓縮的圖片檔案。
 * @param {number} width - 壓縮後圖片的寬度。
 * @param {number} height - 壓縮後圖片的高度。
 * @returns {Promise<{dataUrl:string, size:number}>} 返回dataUrl與大小(mb)。
 */
export async function compressImage(file, width, height) {
  let quality = 1.0;
  let retryCount = 0;
  let blob = { size: 1024 * 1024 * 2 };

  while (blob.size > 1024 * 1024 && retryCount < 8) {
    console.log(`第${retryCount + 1}次壓縮圖片中`);
    quality -= 0.1 * (retryCount + 1); // Adjust quality based on retry count
    blob = await new Promise((resolve) => {
      new Compressor(file, {
        width,
        height,
        mimeType: "image/webp",
        convertSize: Infinity,
        quality,
        success: resolve,
      });
    });
    retryCount++;
  }

  const dataUrl = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(blob);
  });

  const KB = blob.size / 1024;
  const size = Math.round((KB + Number.EPSILON) * 100) / 100;

  return { dataUrl, size };
}
