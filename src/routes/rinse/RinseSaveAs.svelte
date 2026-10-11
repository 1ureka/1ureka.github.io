<script lang="ts">
  import { untrack } from "svelte";

  import { IconDownload, IconMaximize } from "#lib/icons/index.ts";
  import Button from "#lib/components/actions/Button.svelte";
  import Select from "#lib/components/inputs/Select.svelte";
  import TextInput from "#lib/components/inputs/TextInput.svelte";
  import { OUTPUT_FORMATS, RINSE_FORMAT, baseName, getFormat, type OutputFormatId } from "#lib/utils/image.ts";

  import { getRinseContext, type RinseImage } from "./logic/rinse.svelte";
  import { getLightboxContext } from "../logic/lightbox.svelte";

  let { image, onclose }: { image: RinseImage; onclose: () => void } = $props();

  const rinse = getRinseContext();
  const lightbox = getLightboxContext();

  /**
   * 這些選項全部自當初沖洗出來的 PNG 重新編碼。
   * PNG 無損，所以換格式的結果與「從原圖直接轉成那個格式」是同一件事，
   * 不存在二次劣化——也因此這裡不需要留著原始檔。
   */
  const FORMAT_IDS = OUTPUT_FORMATS.map((f) => f.id);

  const SCALES: Record<string, string> = { "1": "原尺寸", "0.75": "75%", "0.5": "50%", "0.25": "25%" };
  const QUALITIES: Record<string, string> = { "0.92": "高", "0.8": "中", "0.6": "低" };
  const BACKGROUNDS: Record<string, string> = { "#ffffff": "白色", "#000000": "黑色" };

  const SCALE_IDS = Object.keys(SCALES);
  const QUALITY_IDS = Object.keys(QUALITIES);
  const BACKGROUND_IDS = Object.keys(BACKGROUNDS);

  // 對話框由外層的 Modal 在每次開啟時重新掛載，所以這裡要的就是當下那一張的名字，
  // 不是一個會跟著 image 走的衍生值
  let name = $state(untrack(() => image.name));
  let formatId = $state<OutputFormatId>(RINSE_FORMAT);
  let scaleId = $state("1");
  let qualityId = $state("0.92");
  let backgroundId = $state("#ffffff");

  const format = $derived(getFormat(formatId));
  const scale = $derived(Number(scaleId));

  const width = $derived(Math.max(1, Math.round(image.width * scale)));
  const height = $derived(Math.max(1, Math.round(image.height * scale)));

  const filename = $derived(`${baseName(name)}.${format.ext}`);

  function handleDownload() {
    void rinse.handleSave(
      image,
      {
        format: formatId,
        scale,
        quality: format.lossy ? Number(qualityId) : undefined,
        background: format.alpha ? undefined : backgroundId,
      },
      name,
    );
    onclose();
  }
</script>

<div class="body">
  <h3>另存為</h3>

  <div class="preview">
    <img src={image.url} alt={image.name} />

    <div>
      <Button variant="outlined" padding="icon" onclick={() => lightbox.handleOpen(image.url, `${image.name}.png`)}>
        <span class="zoom"><IconMaximize size={18} /></span>
        <span class="sr-only">放大 {filename}</span>
      </Button>
    </div>
  </div>

  <div class="fields">
    <TextInput
      label="檔名"
      value={name}
      oninput={(e) => (name = e.currentTarget.value)}
      spellcheck="false"
      autocomplete="off"
      rootProps={{ style: "grid-column: 1 / -1;" }}
    >
      {#snippet adornmentRight()}
        <span class="ext">.{format.ext}</span>
      {/snippet}
    </TextInput>

    <Select label="格式" value={formatId} options={FORMAT_IDS} onchange={(key) => (formatId = key as OutputFormatId)}>
      {#snippet option(key: string)}
        {getFormat(key as OutputFormatId).label}
      {/snippet}
    </Select>

    <Select label="尺寸" value={scaleId} options={SCALE_IDS} onchange={(key) => (scaleId = key)}>
      {#snippet option(key: string)}
        {SCALES[key]}
      {/snippet}
    </Select>

    {#if format.lossy}
      <Select label="品質" value={qualityId} options={QUALITY_IDS} onchange={(key) => (qualityId = key)}>
        {#snippet option(key: string)}
          {QUALITIES[key]}
        {/snippet}
      </Select>
    {/if}

    {#if !format.alpha}
      <Select label="透明處填色" value={backgroundId} options={BACKGROUND_IDS} onchange={(key) => (backgroundId = key)}>
        {#snippet option(key: string)}
          {BACKGROUNDS[key]}
        {/snippet}
      </Select>
    {/if}
  </div>

  <p class="summary">
    將輸出 <strong>{width} × {height}</strong> 的 {format.label}{#if !format.alpha}，原本透明的地方會填成{BACKGROUNDS[
        backgroundId
      ]}{/if}。
  </p>

  <div class="footer">
    <Button variant="outlined" onclick={onclose}>取消</Button>
    <!-- 按鈕預設不會縮得比內容窄，檔名過長時要讓它能縮，省略號才有作用 -->
    <Button variant="primary" onclick={handleDownload} style="min-width: 0;">
      <span class="icon"><IconDownload size={16} /></span>
      <span class="ellipsis">下載 {filename}</span>
    </Button>
  </div>
</div>

<style>
  .body {
    width: 26rem;
    max-width: 100%;
    padding: 1.625rem;
  }

  h3 {
    margin-bottom: 1rem;
    font: var(--font-title3);
  }

  .preview {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 16rem;
    margin-bottom: 1.125rem;
    padding: 0.5rem;
    overflow: hidden;
    background-color: var(--color-bg-subtle);
    border: var(--border-style);
    border-radius: var(--radius-control);
  }

  .preview > img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .preview > div {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0.5rem;
  }

  /* Select 與 TextInput 的 root 在格線裡會被拉滿，控制項因此自動同寬 */
  .fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  .ext {
    display: flex;
    align-items: center;
    padding-right: 0.65rem;
    font: var(--font-kbd);
    color: var(--color-text-muted);
  }

  .summary {
    margin-top: 1.125rem;
    font: var(--font-body2);
    color: var(--color-text-muted);
    text-wrap: pretty;
  }

  .summary strong {
    font: var(--font-kbd);
    font-weight: 700;
    color: var(--color-text);
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1.25rem;
    min-width: 0;
  }

  /* 按鈕縮窄時只讓檔名讓位，圖示維持原尺寸 */
  .icon {
    display: inline-flex;
    flex-shrink: 0;
  }
</style>
