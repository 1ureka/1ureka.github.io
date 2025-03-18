[public] [conditional]
`/`
首頁，顯示最新/熱門帖子

`/search?q=[keyword]`
TODO: 還需要想參數怎麼設計
並且同時作為預設的類別頁面 (取代`/category/[categoryId]`)

`/user/[userId]`
若是自己的頁面且已登入，則可以編輯個人資料 (比如要求更新頭貼api)
若未登入，就正常呈現 (readonly)
若登入但不是自己的頁面，就正常呈現，但可以關注、封鎖

`/post/[postId]`
單個帖子頁面

`/post/[postId]/edit`
若發文者是自己且已登入，或是用戶權限是板主，可以編輯帖子
若未登入，就返回首頁，並toast提示登入
若登入但不是發文者，就返回首頁，並toast提示權限不足
但上述兩者理論上不應該出現，因為進到`/post/[postId]`時，若不符合條件，就不會有編輯按鈕

`/account/login` `/account/register` `/account/forgot-password` `/account/verify-email`
登入、註冊、忘記密碼、驗證郵箱
註冊：記得驗證emial格式，email, id的唯一性。

`/error` `/not-found`
錯誤頁面

---

[auth]
`/account`
更完整的需個人用戶編輯頁面，修改名稱、頭像、簽名、banner、狀態等資料，也可以做修改密碼等更高權限的操作

`/messages`
私訊功能

`/history`
瀏覽歷史

`/notifications`
通知系統

`/favorites`
收藏帖子

`/new-post`
發表新帖子

---

[api]

<!-- TODO -->
