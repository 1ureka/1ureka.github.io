import { Typography, Box, Divider } from "@mui/material";

const Autobiography: React.FC = () => {
  return (
    <>
      <Box>
        <Typography variant="h5" component="h3" gutterBottom>
          起點：從展示數位作品的需求開始
        </Typography>
        <Typography variant="body1" gutterBottom>
          就如同畫家會想要把自己的畫裱框、攝影師會想要將照片洗出來保存，我也希望能夠有一種具有紀念意義的方式來保存我的數位作品。當我開始思考如何以合適的形式展示時，HTML
          和 CSS
          的網頁技術進入了我的視野。它們讓我意識到，我可以透過簡單的標記語言與樣式表，將我的數位作品以精美且結構化的方式呈現在瀏覽器中，讓它們不僅是靜態的文件，更能以互動的方式存在。
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h5" component="h3" gutterBottom>
          初探 JavaScript 與組件化概念的萌芽
        </Typography>
        <Typography variant="body1" gutterBottom>
          在經過一段時間的學習後，我開始接觸 JavaScript 和 jQuery。JavaScript 讓網頁有了動態交互能力，而 jQuery 則讓 DOM
          操作變得更為簡潔與直觀。隨著學習的深入，我不僅僅停留在基本的動畫與事件處理，還開始使用 JavaScript
          的物件導向概念來組織代碼，並將 jQuery 包裝成可重用的類，作為工廠來創建元素，並且使元素有像是show,
          hide等方法，這讓我開始對於「組件化」有了初步的理解。
        </Typography>
        <Typography variant="body1" gutterBottom>
          此外，我也開始嘗試不同的技術，如 Electron 和 GitHub Pages。Electron 讓我能夠將網頁技術應用於桌面應用程式，而
          GitHub Pages
          則提供了一個免費且方便的靜態網站部署方式。然而，當時我對於「應用程式」的理解仍然較為膚淺，這些技術對我來說更像是單純的工具，而非完整的開發概念。
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h5" component="h3" gutterBottom>
          接觸 React：從排斥到接受的質變
        </Typography>
        <Typography variant="body1" gutterBottom>
          在真正開始學習 React 之前，我其實對這類框架有些排斥。當時的我認為，自己寫出的架構已經足夠完美，沒有必要使用
          React 這類框架來「強加規則」。然而，當我深入研究 React 之後，我發現它遠遠不只是「組件」而已。
        </Typography>
        <Typography variant="body1" gutterBottom>
          React 採用虛擬 DOM 來提升效能，使得 UI
          更新更加高效。此外，它的單向數據流與狀態管理機制讓程式碼更具可維護性。當我開始熟悉 React 的 Hooks（如
          useState、useEffect）與 Context API
          時，我意識到這不僅能提升開發效率，更讓前端開發的方式變得更為模組化與工程化。
        </Typography>
        <Typography variant="body1" gutterBottom>
          隨著使用 React 的深入，我開始接觸 npm（Node Package
          Manager），理解了什麼是「專案管理」、開發與生產環境的區別，以及 Webpack、Babel
          這類工具如何將代碼進行打包與編譯。同時，隨著專案的規模變大，我開始學習 Git 來進行版本控制，並引入 TypeScript
          來提升代碼的可讀性與安全性。
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h5" component="h3" gutterBottom>
          進一步挑戰：從前端框架到網站架構
        </Typography>
        <Typography variant="body1" gutterBottom>
          在熟悉 React
          之後，我的野心也逐漸擴大。我不再滿足於只開發個人用的靜態網頁，而是希望能夠架構出真正可供使用者互動的網站。這時，我選擇了
          Next.js 作為下一步的學習目標。
        </Typography>
        <Typography variant="body1" gutterBottom>
          Next.js 除了保留 React 的組件化設計外，還提供了伺服器端渲染（SSR）、靜態生成（SSG）以及 API
          Routes，讓前端開發者可以更輕鬆地處理後端邏輯。透過學習
          Next.js，我對於「前端與後端的界線」有了更清晰的認識，也開始理解什麼是 RESTful API，以及如何在 Next.js
          中撰寫簡單的 API 來處理請求。
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h5" component="h3" gutterBottom>
          完整網站的打造：引入後端與資料庫
        </Typography>
        <Typography variant="body1" gutterBottom>
          為了打造一個完整的網站，我開始研究後端技術。在探索過程中，我選擇了 Next.js 推薦的 Serverless 架構，並使用
          Vercel 來部署應用程式。Serverless 架構讓我不需要管理伺服器，而是讓我的 API 端點在有請求時動態執行。
        </Typography>
        <Typography variant="body1" gutterBottom>
          在資料庫方面，我選擇了 Neon Postgres 作為我的主要數據存儲方案。Neon 提供雲端託管的
          PostgreSQL，讓我能夠輕鬆管理動態數據。同時，為了在開發時能夠快速測試資料庫，我開始學習
          Docker，使用容器技術來模擬不同的運行環境，確保開發與生產環境的一致性。
        </Typography>
        <Typography variant="body1" gutterBottom>
          此外，我也回頭重新學習 Electron，這次不再只是將它當作單純的網頁載體，而是嘗試透過 Node.js 與 Electron
          的整合，來開發具有完整應用程式架構的跨平台桌面應用。當我回顧這段學習歷程時，我發現，曾經那些讓我感到陌生的概念，如「狀態管理」、「打包與編譯」、「API
          設計」等，如今都變得直觀且易於理解。
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h5" component="h3" gutterBottom>
          結語
        </Typography>
        <Typography variant="body1" gutterBottom>
          這段學習旅程，讓我從單純想展示作品的網頁，逐步走向完整的應用程式開發。我學會了如何使用 React 來組織
          UI，如何透過 Next.js 來架構網站，如何使用 Serverless
          與資料庫來儲存與管理動態數據，並且在開發過程中，也逐步掌握了 Git、TypeScript、Docker 等開發工具。
        </Typography>
      </Box>
    </>
  );
};

export default Autobiography;
