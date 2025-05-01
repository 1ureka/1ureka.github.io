/**
 * 建立一個延遲物件，包含一個 Promise 以及其對應的 resolve 方法。
 * 此函式常用於需要手動控制 Promise 狀態的情境。
 *
 * @template T - Promise 的解析值類型。
 * @returns 一個包含以下屬性的物件：
 * - `promise`：一個尚未完成的 Promise。
 * - `resolve`：用於解析 Promise 的函式。
 */
function createDeferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  const promise = new Promise<T>((res) => {
    resolve = res;
  });

  return { promise, resolve };
}

export { createDeferred };
