import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ShieldCheck,
  RotateCcw,
  CreditCard,
  Truck,
  Search,
  ShoppingCart,
  PhoneCall,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Tag,
  Flame,
} from "lucide-react";

type NavItem = { label: string; href?: string; megaKey?: string };
type MegaGroup = { title: string; items: { label: string; href?: string }[] };

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  badge?: string;
  note?: string; // e.g. "Trả góp 0%"
};

const formatVnd = (n: number) => n.toLocaleString("vi-VN") + "₫";

const NAV: NavItem[] = [
  { label: "Điện Thoại", megaKey: "phone" },
  { label: "Tablet", megaKey: "tablet" },
  { label: "Laptop", megaKey: "laptop" },
  { label: "Đồng hồ", megaKey: "watch" },
  { label: "Phụ kiện", megaKey: "accessory" },
  { label: "Đồ Gia Dụng", href: "#" },
  { label: "Thu cũ đổi mới", href: "#" },
  { label: "Khuyến mãi", href: "#" },
  { label: "Tin tức công nghệ", href: "#" },
];

const MEGA: Record<string, MegaGroup[]> = {
  phone: [
    {
      title: "Apple iPhone",
      items: [
        { label: "iPhone 17 Series" },
        { label: "iPhone 16 Series" },
        { label: "iPhone 15 Series" },
        { label: "iPhone 14 Series" },
        { label: "iPhone 13 Series" },
        { label: "iPhone 12 Series" },
        { label: "iPhone 11 Series" },
        { label: "iPhone X Series" },
        { label: "iPhone SE Series" },
        { label: "iPhone 6, 7, 8 Series" },
      ],
    },
    {
      title: "Samsung",
      items: [
        { label: "Galaxy S25 Series" },
        { label: "Galaxy S24 Series" },
        { label: "Galaxy S23 Series" },
        { label: "Galaxy S22 Series" },
        { label: "Galaxy S21 Series" },
        { label: "Samsung Note" },
        { label: "Galaxy A" },
        { label: "Galaxy M" },
        { label: "Galaxy Z" },
      ],
    },
    {
      title: "Xiaomi",
      items: [{ label: "Xiaomi Mi" }, { label: "Redmi" }, { label: "Redmi Note" }],
    },
    { title: "Oppo", items: [{ label: "OPPO Reno" }, { label: "OPPO A" }, { label: "OPPO Find" }] },
    { title: "Điện Thoại VN", items: [{ label: "Viettel / Vina / Mobi" }, { label: "Máy phổ thông" }] },
  ],
  tablet: [
    { title: "iPad Air", items: [{ label: "iPad Air M2" }, { label: "iPad Air M1" }] },
    { title: "iPad Gen", items: [{ label: "iPad Gen 11" }, { label: "iPad Gen 10" }] },
    { title: "iPad Mini", items: [{ label: "iPad Mini 6" }] },
    { title: "iPad Pro", items: [{ label: "iPad Pro M4" }, { label: "iPad Pro M2" }] },
    { title: "Samsung Tablet", items: [{ label: "Galaxy Tab S" }, { label: "Galaxy Tab A" }] },
    { title: "Tablet Xiaomi", items: [{ label: "Redmi Pad" }, { label: "Xiaomi Pad" }] },
  ],
  laptop: [
    { title: "Macbook Air", items: [{ label: "M3" }, { label: "M2" }, { label: "M1" }] },
    { title: "Macbook Pro", items: [{ label: "M3 Pro/Max" }, { label: "M2 Pro/Max" }] },
    { title: "Windows", items: [{ label: "Dell" }, { label: "HP" }, { label: "Lenovo" }] },
  ],
  watch: [{ title: "Apple Watch", items: [{ label: "Series" }, { label: "Ultra" }, { label: "SE" }] }],
  accessory: [
    { title: "Phụ kiện iPhone", items: [{ label: "Ốp lưng" }, { label: "Cường lực" }, { label: "Cáp sạc" }] },
    { title: "Phụ kiện iPad", items: [{ label: "Bàn phím" }, { label: "Bao da" }] },
    { title: "Phụ kiện Samsung", items: [{ label: "Ốp lưng" }, { label: "Cường lực" }] },
    { title: "Tai nghe", items: [{ label: "AirPods" }, { label: "Bluetooth" }] },
    { title: "Sạc dự phòng", items: [{ label: "10.000mAh" }, { label: "20.000mAh" }] },
    { title: "Cốc sạc", items: [{ label: "20W" }, { label: "30W" }, { label: "65W" }] },
  ],
};

const SIDEBAR = [
  { label: "Điện Thoại", icon: <Tag size={16} /> , megaKey: "phone" },
  { label: "Tablet", icon: <Tag size={16} /> , megaKey: "tablet" },
  { label: "Laptop", icon: <Tag size={16} /> , megaKey: "laptop" },
  { label: "Đồng hồ", icon: <Tag size={16} /> , megaKey: "watch" },
  { label: "Phụ kiện", icon: <Tag size={16} /> , megaKey: "accessory" },
  { label: "Đồ Gia Dụng", icon: <Tag size={16} /> },
  { label: "Thu cũ đổi mới", icon: <Tag size={16} /> },
  { label: "Khuyến mãi", icon: <Tag size={16} /> },
  { label: "Tin tức công nghệ", icon: <Tag size={16} /> },
];

const FLASH_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "iPhone 16 Pro Max 256GB (Cũ đẹp)",
    price: 23990000,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=600",
    badge: "Flash",
    note: "Đã bán 7/10",
  },
  {
    id: 2,
    name: "iPhone 15 Pro 128GB (Cũ đẹp)",
    price: 15090000,
    image: "https://images.unsplash.com/photo-1609692814857-d6683d664be9?auto=format&fit=crop&q=80&w=600",
    badge: "Flash",
    note: "Đã bán 6/10",
  },
  {
    id: 3,
    name: "iPhone 14 Pro Max 128GB (Cũ đẹp)",
    price: 13690000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600",
    badge: "Flash",
    note: "Đã bán 8/10",
  },
  {
    id: 4,
    name: "Samsung S24 Ultra 12/256GB (Cũ đẹp)",
    price: 17290000,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=600",
    badge: "Flash",
    note: "Đã bán 5/10",
  },
];

const HOT_DEAL_PRODUCTS: Product[] = [
  {
    id: 101,
    name: "iPhone 17 Pro Max 256GB (VN/A)",
    price: 36990000,
    image: "https://images.unsplash.com/photo-1512499617640-c2f999fe2a35?auto=format&fit=crop&q=80&w=600",
    note: "Trả góp 0%",
  },
  {
    id: 102,
    name: "iPhone 16 128GB (VN/A)",
    price: 19590000,
    image: "https://images.unsplash.com/photo-1580915411954-282cb1d1a8f1?auto=format&fit=crop&q=80&w=600",
    note: "Trả góp 0%",
  },
  {
    id: 103,
    name: "iPad Gen 11 128GB (VN/A)",
    price: 8990000,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600",
    note: "Trả góp 0%",
  },
  {
    id: 104,
    name: "Xiaomi Redmi 15 8/128GB (VN/A)",
    price: 4290000,
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&q=80&w=600",
    note: "Trả góp 0%",
  },
];

function useCountdown(targetMs: number) {
  const [left, setLeft] = useState(() => Math.max(0, targetMs - Date.now()));
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, targetMs - Date.now())), 1000);
    return () => clearInterval(t);
  }, [targetMs]);
  const sec = Math.floor(left / 1000);
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return { d, h, m, s };
}

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
    {children}
  </span>
);

const ProductCard = ({ p }: { p: Product }) => (
  <div className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="relative overflow-hidden rounded-t-2xl bg-slate-50">
      <img
        src={p.image}
        alt={p.name}
        className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
      />
      {p.badge && (
        <div className="absolute left-3 top-3">
          <Badge>{p.badge}</Badge>
        </div>
      )}
    </div>
    <div className="p-4">
      <div className="min-h-[40px] text-sm font-semibold text-slate-900 line-clamp-2">{p.name}</div>
      <div className="mt-2 flex items-end justify-between">
        <div className="text-lg font-black text-slate-900">{formatVnd(p.price)}</div>
      </div>
      {p.note && <div className="mt-1 text-xs text-slate-500">{p.note}</div>}
      <button className="mt-3 w-full rounded-xl bg-[#0b5ed7] py-2 text-xs font-bold text-white transition hover:bg-[#0a54c1]">
        Mua ngay
      </button>
    </div>
  </div>
);

export default function HomePage102() {
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Hero slider (simple)
  const slides = useMemo(
    () => [
      {
        title: "Tết Sum Vầy Deal Đong Đầy",
        subtitle: "Cơ hội nhận ngay chỉ vàng PNJ",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1400",
      },
      {
        title: "Dùng Thử Miễn Phí",
        subtitle: "Dùng thử miễn phí 7 ngày",
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1400",
      },
      {
        title: "Thu Cũ Đổi Mới",
        subtitle: "Trợ giá lên đến 3 Triệu",
        image:
          "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=1400",
      },
    ],
    []
  );
  const [slideIdx, setSlideIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlideIdx((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [slides.length]);

  const cd = useCountdown(Date.now() + 1000 * 60 * 60 * 5 + 1000 * 60 * 12 + 1000 * 28); // demo 5h12m28s

  const [tab, setTab] = useState<"iphone" | "samsung" | "ipad">("iphone");

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900">
      {/* TOP BAR (4 commitments) */}
      <div className="bg-[#0b5ed7] text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-9 items-center gap-8 overflow-hidden text-[11px] font-extrabold uppercase tracking-wide">
            <div className="flex w-max animate-marquee items-center gap-8">
              <span className="flex items-center gap-2"><ShieldCheck size={14} /> 100% Hàng chính hãng</span>
              <span className="flex items-center gap-2"><RotateCcw size={14} /> 30 ngày miễn phí 1 đổi 1</span>
              <span className="flex items-center gap-2"><CreditCard size={14} /> Trả góp 0% lãi suất</span>
              <span className="flex items-center gap-2"><Truck size={14} /> Giao nhanh miễn phí 2h</span>
              {/* duplicate for seamless loop */}
              <span className="flex items-center gap-2"><ShieldCheck size={14} /> 100% Hàng chính hãng</span>
              <span className="flex items-center gap-2"><RotateCcw size={14} /> 30 ngày miễn phí 1 đổi 1</span>
              <span className="flex items-center gap-2"><CreditCard size={14} /> Trả góp 0% lãi suất</span>
              <span className="flex items-center gap-2"><Truck size={14} /> Giao nhanh miễn phí 2h</span>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-3 py-3">
            {/* Mobile menu button */}
            <button
              className="lg:hidden rounded-lg p-2 hover:bg-slate-100"
              onClick={() => setMobileMenu((v) => !v)}
              aria-label="Menu"
            >
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#0b5ed7] text-white font-black">
                102
              </div>
              <div className="leading-tight">
                <div className="text-base font-black tracking-tight">Điện Thoại 102</div>
                <div className="text-[11px] text-slate-500 -mt-0.5">Hệ thống bán lẻ công nghệ</div>
              </div>
            </div>

            {/* Search */}
            <div className="relative hidden flex-1 lg:block">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#0b5ed7]/30"
              />
            </div>

            {/* Right actions */}
            <div className="ml-auto flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 border border-slate-200">
                <PhoneCall size={16} className="text-[#0b5ed7]" />
                <div className="leading-tight">
                  <div className="text-[11px] text-slate-500">Gọi mua hàng</div>
                  <div className="text-sm font-black">1900 4465</div>
                </div>
              </div>

              <a className="hidden md:inline text-sm font-semibold text-slate-700 hover:text-[#0b5ed7]" href="#">
                Chính sách bảo hành
              </a>

              <button className="relative rounded-xl border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={18} />
                  <span className="text-sm font-semibold">Giỏ hàng</span>
                  <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px] font-bold text-white">0</span>
                </div>
              </button>
            </div>
          </div>

          {/* NAV */}
          <div className="hidden lg:flex items-center gap-6 pb-3">
            {NAV.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.megaKey && setOpenMega(item.megaKey)}
                onMouseLeave={() => item.megaKey && setOpenMega(null)}
              >
                <a
                  href={item.href || "#"}
                  className="flex items-center gap-1 text-sm font-bold text-slate-800 hover:text-[#0b5ed7]"
                >
                  {item.label}
                  {item.megaKey && <ChevronDown size={14} className="opacity-60" />}
                </a>

                {/* Mega menu */}
                {item.megaKey && openMega === item.megaKey && (
                  <div className="absolute left-0 top-full mt-3 w-[860px] rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
                    <div className="grid grid-cols-5 gap-4">
                      {(MEGA[item.megaKey] || []).map((g) => (
                        <div key={g.title}>
                          <div className="mb-2 text-sm font-black text-slate-900">{g.title}</div>
                          <div className="space-y-1">
                            {g.items.map((x) => (
                              <a
                                key={x.label}
                                href={x.href || "#"}
                                className="block rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#0b5ed7]"
                              >
                                {x.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile search */}
          <div className="lg:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#0b5ed7]/30"
              />
            </div>
          </div>

          {/* Mobile menu list */}
          {mobileMenu && (
            <div className="lg:hidden pb-4">
              <div className="grid grid-cols-2 gap-2">
                {NAV.map((x) => (
                  <a
                    key={x.label}
                    href={x.href || "#"}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                  >
                    {x.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* LEFT CATEGORY */}
          <aside className="hidden lg:block">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-4 py-3 font-black text-slate-900 border-b border-slate-200">
                Danh mục
              </div>
              <div className="py-2">
                {SIDEBAR.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500">{c.icon}</span>
                      <span className="text-sm font-semibold">{c.label}</span>
                    </div>
                    <ChevronRight size={16} className="opacity-40" />
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <div className="space-y-6">
            {/* HERO + SIDE BANNER */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <img
                  src={slides[slideIdx].image}
                  alt="Hero"
                  className="h-[280px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-2xl md:text-3xl font-black">{slides[slideIdx].title}</div>
                  <div className="mt-1 text-sm font-semibold opacity-90">{slides[slideIdx].subtitle}</div>
                  <button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2 text-sm font-black text-slate-900 hover:bg-white">
                    Xem ưu đãi <ChevronRight size={16} />
                  </button>
                </div>

                {/* dots */}
                <div className="absolute right-4 top-4 flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIdx(i)}
                      className={`h-2.5 w-2.5 rounded-full ${i === slideIdx ? "bg-white" : "bg-white/50"}`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-sm font-black text-slate-900">Dùng thử miễn phí</div>
                  <div className="text-sm text-slate-600 mt-1">7 ngày trải nghiệm</div>
                  <div className="mt-4 h-24 rounded-xl bg-gradient-to-r from-[#0b5ed7] to-indigo-600" />
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-sm font-black text-slate-900">Bảo hành Care365+</div>
                  <div className="text-sm text-slate-600 mt-1">1 đổi 1 đến 12 tháng</div>
                  <div className="mt-4 h-24 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500" />
                </div>
              </div>
            </div>

            {/* 4 SMALL FEATURES */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Tag, title: "Tết Sum Vầy", desc: "Nhận quà hấp dẫn" },
                { icon: RotateCcw, title: "Dùng thử", desc: "Miễn phí 7 ngày" },
                { icon: Truck, title: "Thu cũ đổi mới", desc: "Trợ giá đến 3 triệu" },
                { icon: ShieldCheck, title: "Care365+", desc: "1 đổi 1 đến 12 tháng" },
              ].map((x, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-800">
                      <x.icon size={18} />
                    </div>
                    <div className="leading-tight">
                      <div className="text-sm font-black">{x.title}</div>
                      <div className="text-xs text-slate-600">{x.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FLASH SALE */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between px-5 py-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-50 text-red-600">
                    <Flame size={18} />
                  </div>
                  <div>
                    <div className="text-base font-black">Flash Sale</div>
                    <div className="text-xs text-slate-500">Khuyến mãi kết thúc sau</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {[
                    { label: "Ngày", v: cd.d },
                    { label: "Giờ", v: cd.h },
                    { label: "Phút", v: cd.m },
                    { label: "Giây", v: cd.s },
                  ].map((t) => (
                    <div key={t.label} className="flex items-center gap-2">
                      <div className="rounded-xl bg-slate-900 px-3 py-2 text-white">
                        <div className="text-sm font-black tabular-nums">
                          {String(t.v).padStart(2, "0")}
                        </div>
                        <div className="text-[10px] opacity-70 -mt-0.5">{t.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {FLASH_PRODUCTS.map((p) => (
                    <ProductCard key={p.id} p={p} />
                  ))}
                </div>
              </div>
            </section>

            {/* HOT DEAL + TABS */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between px-5 py-4 border-b border-slate-200">
                <div className="text-base font-black">HOT DEAL</div>

                <div className="flex gap-2">
                  {[
                    { key: "iphone", label: "iPhone VN/A" },
                    { key: "samsung", label: "Samsung VN/A" },
                    { key: "ipad", label: "iPad/Tablet VN/A" },
                  ].map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key as any)}
                      className={`rounded-xl px-4 py-2 text-xs font-black transition ${
                        tab === t.key
                          ? "bg-[#0b5ed7] text-white"
                          : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                  <button className="rounded-xl px-4 py-2 text-xs font-black bg-slate-50 border border-slate-200 hover:bg-slate-100">
                    Xem tất cả
                  </button>
                </div>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(tab === "iphone" ? HOT_DEAL_PRODUCTS : tab === "samsung" ? HOT_DEAL_PRODUCTS : HOT_DEAL_PRODUCTS).map(
                    (p) => (
                      <ProductCard key={p.id} p={p} />
                    )
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-600">
          © {new Date().getFullYear()} — Demo UI theo layout Điện Thoại 102 (không dùng asset gốc).
        </div>
      </footer>

      {/* Tailwind animation helper (you can move to global css) */}
      <style>{`
        @keyframes marquee { 
          0% { transform: translateX(0); } 
          100% { transform: translateX(-50%); } 
        }
        .animate-marquee { 
          animation: marquee 18s linear infinite; 
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; }
        }
      `}</style>
    </div>
  );
}
