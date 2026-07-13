# 球服商城与定制 DEMO 改版计划

## 1. 改版目标

将当前球服 DEMO 从“工具型定制系统”改造成“营销型球服商城 + 定制体验 + 商家后台入口”的演示网站。

前台默认进入营销首页，整体参考 Nike 官网的电商与品牌展示风格：大图驱动、黑白灰极简视觉、清晰商品分类、强行动线入口。后台能力不直接暴露在主导航中，而是通过 `Merchant Portal / 商家入口` 进入。

本阶段仍为静态 DEMO，不接真实支付、用户系统、库存、生产接口和后台 API。

## 2. 核心业务结构

本 DEMO 将商品与下单模式拆成两条独立维度。

### 2.1 商品类型

#### 2.1.1 常规商品球服 / Replica Jerseys

常规电商商品，不属于自由定制。

用户购买逻辑：

- 选择球队。
- 选择球员。
- 自动带出球员姓名和号码。
- 选择尺码。
- 选择数量。
- 加入购物袋或进入普通下单。

示例：

- Inter Miami Home Jersey
- 球员：Messi
- 姓名号码：MESSI / 10

页面重点：

- 商品图、球队、球员、价格、尺码、库存/发货说明。
- 球员姓名号码来自预设名单，不提供自由输入。

#### 2.1.2 成品定制 / Finished Custom

基于已有成品款式做有限定制。

可配置内容：

- 选择成品款式或齐色方案。
- 添加局部图案。
- 添加文字。
- 添加号码。

不可配置内容：

- 不可选择面料。
- 不可选择图形版式。
- 不可修改整体结构或全身设计。

英文短名称：`Finished Custom`

中文名称：`成品定制`

#### 2.1.3 DIY 定制 / DIY Custom

从可配置底板开始做完整定制。

可配置内容：

- 选择面料 / Fabric。
- 选择图形版式 / Graphic Layout。
- 选择颜色 / Colors。
- 添加局部图案 / Artwork。
- 添加文字 / Text。
- 添加号码 / Number。

`Graphic Layout / 图形版式` 用于表达球服整体视觉版式，例如条纹、渐变、肩部拼色、侧边拼色、几何纹理、暗纹等。该命名比“全身图案”更专业，也比 `All-over Print / 满版印花` 更宽泛。

英文短名称：`DIY Custom`

中文名称：`DIY 定制`

### 2.2 下单模式

下单模式独立于商品类型。

#### 2.2.1 普通下单 / Standard Order

适合单人或少量购买。

包含：

- 商品摘要。
- 尺码。
- 数量。
- 已选球员或定制内容。
- 收货信息。
- 模拟提交订单。

#### 2.2.2 团队下单 / Team Order

适合同一款式或同一设计下批量购买。

包含：

- 统一商品或统一设计摘要。
- 队员名单。
- 队员姓名。
- 号码。
- 尺码。
- 数量。
- 批量生成号码、复制上一行、删除行。
- 价格汇总。
- 模拟提交订单。

## 3. 信息架构与路由

### 3.1 前台路由

- `#/home`：营销首页，默认入口。
- `#/jerseys`：全部商品列表。
- `#/jerseys?type=replica`：球队球服商品列表。
- `#/jerseys?type=finished`：成品定制商品列表。
- `#/jerseys?type=diy`：DIY 定制商品列表。
- `#/jerseys/:id`：定制商品详情页，包含商品信息、可定制范围和进入定制器按钮。
- `#/replica/:id`：常规商品球服详情，可选择球队球员、尺码和数量。
- `#/designer/:id`：定制器，服务成品定制和 DIY 定制。
- `#/order-type`：选择下单模式。
- `#/checkout-standard`：普通下单。
- `#/checkout-team`：团队下单。
- `#/order-success`：模拟订单成功。

### 3.2 商家后台路由

- `#/merchant`：商家入口页。
- `#/admin/customization-rules`：定制规则配置。
- `#/admin/customer-products`：客户产品配置。
- `#/admin/orders`：生产订单查看与下载。

后台不放在前台主导航中，只通过 `Merchant Portal / 商家入口` 进入。

## 4. 导航结构

### 4.1 英文版

顶部工具栏：

- Help
- Join Us
- Sign In
- Merchant Portal

主导航：

- New
- Custom

右侧功能：

- Search
- Favorites
- Bag
- Chinese

### 4.2 中文版

顶部工具栏：

- 帮助
- 加入我们
- 登录
- 商家入口

主导航：

- 新品
- 专属定制

右侧功能：

- 搜索
- 收藏
- 购物袋
- English

### 4.3 专属定制 Mega Menu

主导航不直接平铺 `球队球服 / 成品定制 / DIY 定制`。用户 hover 或点击 `Custom / 专属定制` 后，展开全宽 mega menu。

Mega menu 采用三列结构：

#### Replica Jerseys / 球队球服

常规商品球服，不是自由定制。

菜单项：

- 选择球队 / Choose Team
- 选择球员 / Choose Player
- 俱乐部球衣 / Club Jerseys
- 国家队球衣 / National Team Jerseys
- 球员版球衣 / Player Jerseys

点击该列标题或任意子项，进入 `#/jerseys?type=replica`。

#### Finished Custom / 成品定制

基于已有成品款式做有限定制。

菜单项：

- 选择成品款 / Choose Finished Style
- 选择齐色 / Choose Colorway
- 添加图案 / Add Artwork
- 添加文字 / Add Text
- 添加号码 / Add Number

点击该列标题或任意子项，进入 `#/jerseys?type=finished`。

#### DIY Custom / DIY 定制

从底板开始完整设计。

菜单项：

- 选择面料 / Choose Fabric
- 图形版式 / Graphic Layout
- 选择颜色 / Choose Colors
- 添加图案 / Add Artwork
- 添加文字与号码 / Add Text and Number

点击该列标题或任意子项，进入 `#/jerseys?type=diy`。

### 4.4 Mega Menu 交互规则

桌面端：

- hover `Custom / 专属定制` 展开 mega menu。
- 鼠标进入 mega menu 时保持展开。
- 鼠标离开主导航和 mega menu 后关闭。
- 点击 `Custom / 专属定制` 可进入全部定制商品列表或保持展开，具体实现阶段二选一。

移动端：

- 点击 `Custom / 专属定制` 展开折叠菜单。
- 点击子项后进入对应商品列表。

视觉规则：

- 白底全宽面板。
- 紧贴主导航下方。
- 三列布局，列间距较大。
- 列标题黑色粗体。
- 子项灰色文字，hover 变黑。
- 不使用蓝色，不使用重阴影。
- 页面内容可被 menu 覆盖或轻微压暗，但不进入独立页面。

### 4.5 商品入口链路

三类入口都必须先进入商品列表，不直接进入定制器。

标准链路：

`专属定制 Mega Menu -> 分类商品列表 -> 商品详情 -> 定制器或购买 -> 下单模式`

具体规则：

- 点击 `球队球服`：进入球队球服商品列表；点击具体商品后进入球队球服商详页；在商详页选择球队、球员、尺码、数量。
- 点击 `成品定制`：进入成品定制商品列表；点击具体商品后进入成品定制商详页；商详页展示齐色、可定制位置和开始定制按钮。
- 点击 `DIY 定制`：进入 DIY 定制商品列表；点击具体商品后进入 DIY 定制商详页；商详页展示面料、图形版式、颜色能力和开始 DIY 定制按钮。

## 5. 营销首页规划

默认打开首页，不直接进入商品列表。

### 5.1 顶部活动条

用于展示活动或主张，例如：

- `Custom Kit Studio`
- `Build your look, order one piece or outfit the whole team.`

中文版：

- `球服定制工作室`
- `为个人、俱乐部或团队打造专属比赛装备。`

### 5.2 首屏 Hero

参考 Nike 首页风格，使用大幅横向真实图片或产品陈列图，不使用卡片包裹。

英文文案建议：

- 标题：`Create Your Matchday Kit`
- 副标题：`Choose a player jersey, personalize a finished kit, or build your own design.`
- 主按钮：`Start Customizing`
- 次按钮：`Shop Jerseys`

中文文案建议：

- 标题：`打造你的比赛日球服`
- 副标题：`选择球员款、成品定制，或从零开始 DIY 设计。`
- 主按钮：`开始定制`
- 次按钮：`浏览球服`

### 5.3 三类商品入口

首页展示三个入口模块：

- Replica Jerseys / 球队球衣
- Finished Custom / 成品定制
- DIY Custom / DIY 定制

每个模块需要说明用户能做什么，而不是只展示类型名称。

### 5.4 下单模式入口

定制完成后再选择下单模式：

- Order One / 普通下单
- Order for Team / 团队下单

首页可以轻量展示该能力，但不把“团定”作为唯一主卖点。

## 6. Nike 风格设计规范

### 6.1 整体视觉

- 极简。
- 黑白灰为主。
- 大图驱动。
- 少用装饰性渐变和复杂卡片。
- 前台强调品牌感和购买动线。
- 后台保持工具型信息密度，但统一黑白灰视觉。

### 6.2 色彩

基础色：

- 页面背景：`#FFFFFF`
- 浅灰背景：`#F5F5F5`
- 主文字：`#111111`
- 次级文字：`#707072`
- 分割线：`#E5E5E5`
- 主按钮：`#111111`

前台尽量减少蓝色选中态，蓝色只保留在极少数系统状态里，避免 SaaS 感。

### 6.3 字体

建议使用系统无衬线字体：

```css
font-family: Helvetica, Arial, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

排版要求：

- 导航文字 15-16px。
- 营销标题使用粗体大字号。
- 商品标题黑色粗体。
- 辅助信息使用灰色。
- 不使用复杂字重和花哨装饰。

### 6.4 按钮

主按钮：

- 黑底白字。
- 胶囊形。
- 用于主要行动，例如 `Start Customizing`、`Add to Bag`、`Checkout`。

次按钮：

- 白底黑字。
- 黑色或浅灰边框。
- 胶囊形。

图标按钮：

- 尽量使用纯 icon。
- 不使用明显边框或蓝色底。

### 6.5 商品卡片

商品列表参考电商商品网格：

- 商品图占主要面积。
- 图片区域使用白色或浅灰背景。
- 不使用重阴影。
- 不使用强卡片边框。
- 商品名、类型、价格直接排在图片下方。
- 标签和描述使用灰色小字。

### 6.6 前台与后台视觉边界

前台：

- 大图。
- 营销标题。
- 商品网格。
- 黑色胶囊按钮。
- 购物感强。

后台：

- 表格。
- 表单。
- 配置面板。
- 状态标签。
- 信息密度高。
- 从 `Merchant Portal / 商家入口` 进入。

## 7. 页面改造清单

### 阶段 1：首页和导航

- 新增营销首页。
- 默认路由改为 `#/home`。
- 改造顶部工具栏和主导航。
- 主导航只保留 `新品 / 专属定制` 两个核心入口。
- `专属定制` 通过 mega menu 展开三类业务入口。
- 将后台入口移动到 `Merchant Portal / 商家入口`。
- 前台主导航不直接展示后台页面。

验收：

- 打开英文版默认看到营销首页。
- 首页具备大图首屏、活动条、三类商品入口。
- 顶部主导航不平铺三类商品，只通过 `专属定制` mega menu 展开。
- Mega menu 中三类入口都跳转到对应商品列表。
- 商家后台入口不干扰消费者导航。

### 阶段 2：商品类型重构

- 将商品分为三类：
  - Replica Jerseys / 球队球衣。
  - Finished Custom / 成品定制。
  - DIY Custom / DIY 定制。
- 商品列表增加类型筛选或菜单筛选。
- 商品卡片按 Nike 风格重排。

验收：

- 三类商品入口清晰。
- 商品列表可按类型筛选。
- 用户从 mega menu 点击三类入口时，先进入对应商品列表。
- 用户点击具体商品后，才进入商详页。
- 商品卡片更像电商商品网格，而不是后台卡片。

### 阶段 3：常规商品球服购买流程

- 新增球队和球员 mock 数据。
- 常规商品详情页支持选择球队。
- 选择球员后自动带出姓名和号码。
- 支持尺码、数量和加入购物袋。

验收：

- 用户可完成“选择球队 -> 选择球员 -> 选择尺码 -> 加入购物袋”的常规商品购买路径。

### 阶段 4：定制器流程调整

- 定制器不作为 mega menu 的直接跳转目标。
- 成品定制和 DIY 定制必须先经过商品列表与商品详情页。
- 成品定制流程：
  - Colorway。
  - Artwork。
  - Text。
  - Number。
- DIY 定制流程：
  - Fabric。
  - Graphic Layout。
  - Colors。
  - Artwork。
  - Text。
  - Number。
- 将“白板球衣”文案替换为 `DIY 定制 / DIY Custom`。
- 将“成品球衣”文案替换为 `成品定制 / Finished Custom`。

验收：

- 成品定制不可选择面料和图形版式。
- DIY 定制可以选择面料、图形版式和颜色。
- 两类定制都可以添加图案、文字和号码。

### 阶段 5：下单模式拆分

- 定制完成后进入下单模式选择页。
- 支持：
  - Standard Order / 普通下单。
  - Team Order / 团队下单。
- 现有团队名单表格迁移到 Team Order。
- 新增简化普通下单页。

验收：

- 定制商品可选择普通下单或团队下单。
- 常规商品球服可走普通商品下单逻辑。

### 阶段 6：商家后台入口与后台页面

- 新增 `Merchant Portal / 商家入口` 页面。
- 后台三页从商家入口进入。
- 后台顶部导航只在后台区域展示。
- 后台视觉统一黑白灰。

验收：

- 前台消费者不会直接看到后台导航。
- 商家可以通过入口进入后台页面。

### 阶段 7：中英文一致性

- 英文版不出现中文残留。
- 中文版不出现英文业务残留，品牌名和必要技术词除外。
- 统一术语表：
  - Replica Jerseys / 球队球衣
  - Finished Custom / 成品定制
  - DIY Custom / DIY 定制
  - Graphic Layout / 图形版式
  - Standard Order / 普通下单
  - Team Order / 团队下单
  - Merchant Portal / 商家入口

验收：

- 主要页面中英文文案完整。
- 菜单、标题、按钮、表格、提示文案无混排问题。

## 8. Mock 数据建议

### 8.1 常规商品球服

```ts
type ReplicaJersey = {
  id: string
  productType: 'replica'
  name: string
  teamId: string
  playerOptions: PlayerOption[]
  colorways: Colorway[]
  sizes: string[]
  basePrice: number
}
```

### 8.2 球员选项

```ts
type PlayerOption = {
  id: string
  teamId: string
  displayName: string
  printName: string
  number: string
}
```

### 8.3 成品定制商品

```ts
type FinishedCustomProduct = {
  id: string
  productType: 'finished-custom'
  name: string
  colorways: Colorway[]
  printPositions: PrintPosition[]
  allowedPrintTypes: ('artwork' | 'text' | 'number')[]
  basePrice: number
}
```

### 8.4 DIY 定制商品

```ts
type DiyCustomProduct = {
  id: string
  productType: 'diy-custom'
  name: string
  fabrics: Fabric[]
  graphicLayouts: GraphicLayout[]
  colorPalette: string[]
  printPositions: PrintPosition[]
  allowedPrintTypes: ('artwork' | 'text' | 'number')[]
  basePrice: number
}
```

## 9. 非目标范围

本阶段不做：

- 真实登录注册。
- 真实购物袋持久化。
- 真实支付。
- 真实库存。
- 真实球队授权数据。
- 真实图片上传与抠图。
- 真实 3D 模型。
- 真实后台接口。
- 真实权限系统。

## 10. 最小演示路径

### 10.1 常规商品路径

1. 用户进入首页。
2. 点击 `Replica Jerseys / 球队球衣`。
3. 选择一个球队球衣商品。
4. 选择球队和球员。
5. 自动显示球员姓名和号码。
6. 选择尺码和数量。
7. 加入购物袋或进入普通下单。

### 10.2 成品定制路径

1. 用户进入首页。
2. 点击 `Finished Custom / 成品定制`。
3. 选择成品款式和齐色。
4. 添加图案、文字或号码。
5. 选择普通下单或团队下单。

### 10.3 DIY 定制路径

1. 用户进入首页。
2. 点击 `DIY Custom / DIY 定制`。
3. 选择面料。
4. 选择图形版式。
5. 选择颜色。
6. 添加图案、文字或号码。
7. 选择普通下单或团队下单。

### 10.4 商家后台路径

1. 用户在顶部工具栏点击 `Merchant Portal / 商家入口`。
2. 进入商家入口页。
3. 点击进入后台 DEMO。
4. 查看定制规则、客户产品和生产订单。
