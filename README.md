# 名片機 MEISHIcian | 電子商務名片網站

火箭隊第 10 梯專案作品，製作者：Shun、Alex。
網址：https://meishician.vercel.app/

## 專案特色

- 創造名片：功能齊全的名片編輯器，內建數種樣版，快速上手名片製作
- 分享名片：打造個人名片入口網頁，呈現名片、職務資訊、個人連結，並可將他人名片進行收藏
- 管理名片：名片群組化管理、分門別類，也可以貼上標籤，迅速找尋目標對象
- 同步名片：離職刪除名片或是更改職務資訊，同步發送給名片收藏者，資訊零落差

## 專案規劃

### 前端開發

- 框架選擇 Next.js、切板使用 TailwindCSS
- 個人名片入口有 SEO 需求，設計為 Server-side render
- 使用 Redux 配合 Redux Thunk 因應複雜狀態管理及非同步請求
- 使用 ESLint Airbnb、Prettier 進行程式碼風格與排版管理
- 使用 Fabric.js 操作 canvas 製作編輯器
- 使用 React-DnD 實現拖曳功能，以達成良好的 UX 體驗

### 後端開發

- 使用 Node.js + Express.js
- 以 RESTful 原則設計，並拆分 MVC 結構
- 以 Joi 設計 Request 驗證 Middleware，配合 Error Handler 完善錯誤管理
- Schema 依照需求情景選擇 Embedded / Reference
- 以 JWT 實作會員驗證功能

## Features

### 製作名片

- 在打造名片頁中填寫職務相關資料
- 可調整背景顏色
- 可選擇樣板以快速製作名片
- 可新增一般文字或職務資料，並進行細部調整
- 可新增圖庫物件，並進行細部調整
- 可上傳圖片，上限為 5 張，並可刪除。圖片支援格式： PNG、JPG、JPEG、SVG 。最大容量：2 MB
- 可調整物件圖層
- 可翻轉畫布置背面
- 可調整名片為直式或橫式
- 可調存檔
- 支援群組同時修改
- 部份功能支援快捷鍵
  - 【全體】 backspace 或 delete 刪除
  - 【全體】 ctrl + z 上一步
  - 【全體】 ctrl + y 還原
  - 【全體】 ctrl + s 存檔
  - 【全體】 ctrl + space 翻轉
  - 【物件】 ctrl + c 複製
  - 【物件】 ctrl + v 貼上
  - 【文字】 ctrl + b 粗體
  - 【文字】 ctrl + i 斜體
  - 【文字】 ctrl + u 底限

### 編輯個人頁

- 在管理名片頁中點選自己創建的名片可來到個人名片頁
- 點選「編輯名片」修改名片樣式或修改職務資訊
- 點選「修改資訊」可來到編輯模式
- 編輯模式中，可針對公開資訊進行調整
- 編輯模式中，可新增 / 刪除相關外部連結
- 編輯模式中，可調整外部連結順序（暫無支援手機版）

### 收藏名片

- 掃描他人 QR code 或前往名片牆尋找可進入他人名片頁
- 登入狀態下可收藏他人名片
- 可下載他人名片的圖片檔（格式： PNG）

### 管理名片

- 收藏的名片可新增標籤、修改群組、編寫注記、刪除
- 收藏的名片可新增 / 取消至頂
- 可新增 / 刪除群組。刪除群組後，原群組內名片將前往預設區
- 可更改群組名稱
- 可拖曳名片制欲收藏群組 （暫無支援手機板）
- 可拖曳群組進行排列 （暫無支援手機板）
- 可點選標籤尋找名片
- 可輸入關鍵字搜尋名片
- 點選「我的名片」可看到自製名片狀態
- 已發布名片可進行展示、修改、刪除
- 已發布名片可打開 QR code 供他人進行掃描
- 未發布名片可繼續進行編輯

### 更動資訊

- 名片刪除 / 職務更動時，可自訂義傳所要傳送的訊息

### 接收資訊

- 他人名片刪除 / 職務更新時，可皆收到對方所傳送的訊息

## 其他好用的 Package Kit

- uiball/loaders：用於轉場動畫處理
- aos：用於首頁滾動視差處理
- cookies-next：Next.js 中的 Cookie 處理
- date-fns：用於日期資料的處理
- fabric-pure-browser：用來操縱 canvas tag 以製作編輯器
- framer-motion：頁面動畫效果處理
- immer：immutable state 處理
- next-redux-wrapper：Next.js 與 Redux 整合
- qrcode.react：用來生成網址 QR code
- react-color：用來處理編輯器的調色盤
- react-dnd：用來開發拖拉功能
- react-fast-marquee：首頁滾動名片處理
- react-hook-form：表單處理
- react-icons：畫面 icon 使用
- react-redux：資料狀態管理
- react-toastify：錯誤資訊顯示
- redux-logger：確認 redux 狀態
- tippy：用來顯示工具提示框
