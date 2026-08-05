# Component Splitting Rules

符合以下任一條件時，應視為獨立元件：

- 相同 UI 模式出現 2 次以上
- 該區塊有自己的互動行為
- 該區塊有明確的語義職責
- 該區塊很可能跨頁重用
- 該區塊有獨立狀態或多種變體

建議的層級：

- `Primitive`：Button、Input、Tag、Avatar、Badge
- `Composite`：SearchBar、FeatureCard、PricingCard、LoginForm
- `Section`：HeroSection、FeatureGrid、FAQSection、PricingSection
- `Page`：LandingPage、DashboardPage、SettingsPage

拆分時的判斷原則：

- 先看語義與重用價值，再看視覺邊界
- 先抽有互動或可重複的區塊，再抽純包裹容器
- 同一組內容若只有文案不同，通常應共用同一個 component
- Figma 畫面裡的每一層 wrapper 不等於程式中的元件

避免：

- 用一個超大的 page component 包全部
- 把每個小 wrapper 都拆成元件
- 直接把 Figma node 名稱原封不動變成程式碼名稱
- 還沒整理層級就先開始寫 template
