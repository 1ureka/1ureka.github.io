/**
 * @file virtualize.core.ts
 * 瀑布流虛擬化的純計算部分：欄位分配與可視項目搜尋，不碰 DOM 也不碰響應式。
 *
 * 版面以「權重」表示：每個項目的權重是它的高寬比，乘上欄寬才是像素高度。
 * 所以欄寬改變時佈局本身不必重算，只有換算係數跟著變。
 *
 * 可視範圍以數字傳入而不是捲動容器，捲動來源是視窗還是某個元素由呼叫端決定。
 */

/** 帶有尺寸的項目；尺寸只用來算高寬比，單位不拘 */
export interface ItemWithSize {
  id: string;
  width: number;
  height: number;
}

/** 單個項目在軌道中的垂直權重位置 */
interface TrackItem<T> {
  item: T;
  /** 權重座標起點 */
  yStart: number;
  /** 權重座標終點 */
  yEnd: number;
}

/** 一欄的有序項目 `[item_index]` */
type Track<T> = TrackItem<T>[];

/** 以權重為基礎的佈局結果 */
export interface VirtualizeLayout<T> {
  /** 第一層為欄，第二層為該欄的項目 `[column][item_index]` */
  tracks: Track<T>[];
  /** 所有欄中最高的權重高度 */
  yMax: number;
}

/** 目前看得見的範圍，皆為相對於內容容器頂端的像素 */
export interface VirtualizeView {
  /** 可視範圍的頂端，捲過頭時為負 */
  top: number;
  /** 可視範圍的高度 */
  height: number;
  /** 內容容器的寬度 */
  width: number;
}

/** 帶有最終渲染像素座標的項目 */
export type VirtualizeItem<T> = T & {
  pixelX: number;
  pixelY: number;
  pixelW: number;
  pixelH: number;
  style: string;
};

/**
 * 貪婪欄位分配：依序把每個項目放進目前最短的那一欄。
 *
 * 項目的先後順序因此大致由上往下保持，最新的在最上面時看起來就是時間順序。
 */
export function createVirtualizeLayout<T extends ItemWithSize>(params: {
  items: T[];
  columns: number;
}): VirtualizeLayout<T> {
  const { items } = params;
  const columns = Math.max(1, Math.floor(params.columns));
  const tracks: Track<T>[] = Array.from({ length: columns }, () => []);

  if (items.length === 0) return { tracks, yMax: 0 };

  const heights = new Float64Array(columns);
  let yMax = 0;

  for (const item of items) {
    // 寬為 0 的項目沒有比例可言，當成正方形
    const ratio = item.width > 0 ? item.height / item.width : 1;

    let shortest = 0;
    for (let i = 1; i < columns; i++) {
      if (heights[i] < heights[shortest]) shortest = i;
    }

    const yStart = heights[shortest];
    const yEnd = yStart + ratio;

    tracks[shortest].push({ item, yStart, yEnd });
    heights[shortest] = yEnd;
    if (yEnd > yMax) yMax = yEnd;
  }

  return { tracks, yMax };
}

/** 二分搜尋第一個底端越過 `top` 的項目，沒有則回傳 -1 */
function findFirstInView<T>(track: Track<T>, top: number): number {
  let low = 0;
  let high = track.length - 1;
  let found = -1;

  while (low <= high) {
    const mid = (low + high) >>> 1;
    if (track[mid].yEnd > top) {
      found = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return found;
}

/** 二分搜尋最後一個頂端還沒越過 `bottom` 的項目 */
function findLastInView<T>(track: Track<T>, bottom: number, first: number): number {
  let low = first;
  let high = track.length - 1;
  let found = first;

  while (low <= high) {
    const mid = (low + high) >>> 1;
    if (track[mid].yStart > bottom) {
      high = mid - 1;
    } else {
      found = mid;
      low = mid + 1;
    }
  }

  return found;
}

/**
 * 算出可視範圍內的項目與它們的像素座標。
 *
 * 每一欄各自二分搜尋，成本只跟欄數與可見項目數有關，跟總項目數無關。
 */
export function createVirtualizeContent<T extends ItemWithSize>(params: {
  layout: VirtualizeLayout<T>;
  view: VirtualizeView;
  /** 項目之間的間距，以項目內的 padding 實現，只在呼叫端套用 style 時才生效；容器外圈會多出半個間距 */
  gap?: number;
  /** 可視範圍上下各多算的像素，捲動時才不會看到還沒畫上的空白 */
  overscan?: number;
}): { visibleItems: VirtualizeItem<T>[]; contentHeight: number } {
  const { layout, view, gap = 0, overscan = 0 } = params;
  const columns = layout.tracks.length;

  if (columns === 0 || layout.yMax <= 0 || view.width <= 0) {
    return { visibleItems: [], contentHeight: 0 };
  }

  const columnWidth = view.width / columns;
  const contentHeight = layout.yMax * columnWidth;

  const pixelTop = view.top - overscan;
  const pixelBottom = view.top + view.height + overscan;

  if (pixelBottom <= 0 || pixelTop >= contentHeight) {
    return { visibleItems: [], contentHeight };
  }

  const weightTop = pixelTop / columnWidth;
  const weightBottom = pixelBottom / columnWidth;

  const visibleItems: VirtualizeItem<T>[] = [];

  for (let column = 0; column < columns; column++) {
    const track = layout.tracks[column];
    if (track.length === 0) continue;

    const first = findFirstInView(track, weightTop);
    if (first < 0) continue;

    const last = findLastInView(track, weightBottom, first);

    for (let i = first; i <= last; i++) {
      const { item, yStart, yEnd } = track[i];

      const pixelX = column * columnWidth;
      const pixelY = yStart * columnWidth;
      const pixelW = columnWidth;
      const pixelH = (yEnd - yStart) * columnWidth;

      let style = `position: absolute; left: 0px; top: 0px; width: ${pixelW}px; height: ${pixelH}px; transform: translate3d(${pixelX}px, ${pixelY}px, 0);`;

      // 間距做成項目四周各半個間距的 padding，每一欄因此一樣寬；
      // 最外圈多出來的半個間距由呼叫端以負 margin 把容器往外推來抵銷
      if (gap > 0) style += `box-sizing: border-box; padding: ${gap / 2}px;`;

      visibleItems.push({ ...item, pixelX, pixelY, pixelW, pixelH, style });
    }
  }

  return { visibleItems, contentHeight };
}
