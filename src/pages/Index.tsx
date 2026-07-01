import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PhoneNumber {
  number: string;
  price: number;
  operator: string;
  category: string;
  available: boolean;
}

const NUMBERS: PhoneNumber[] = [
  { number: '+7 900 777-77-77', price: 250000, operator: 'МегаФон', category: 'VIP', available: true },
  { number: '+7 926 100-00-01', price: 45000, operator: 'МТС', category: 'Зеркальные', available: true },
  { number: '+7 999 888-88-88', price: 180000, operator: 'Билайн', category: 'VIP', available: true },
  { number: '+7 903 555-55-55', price: 120000, operator: 'МТС', category: 'VIP', available: false },
  { number: '+7 916 123-45-67', price: 8900, operator: 'МегаФон', category: 'Лесенка', available: true },
  { number: '+7 985 200-20-20', price: 32000, operator: 'Билайн', category: 'Пары', available: true },
  { number: '+7 977 007-00-07', price: 27500, operator: 'Tele2', category: 'Зеркальные', available: true },
  { number: '+7 995 321-00-00', price: 19000, operator: 'МТС', category: 'Нули', available: true },
  { number: '+7 968 111-11-22', price: 15400, operator: 'МегаФон', category: 'Пары', available: false },
  { number: '+7 999 456-78-90', price: 6200, operator: 'Tele2', category: 'Лесенка', available: true },
  { number: '+7 906 900-90-90', price: 41000, operator: 'Билайн', category: 'Пары', available: true },
  { number: '+7 925 100-01-00', price: 22300, operator: 'МТС', category: 'Нули', available: true },
];

const CATEGORIES = ['Все', 'VIP', 'Зеркальные', 'Пары', 'Лесенка', 'Нули'];

const TARIFFS = [
  { name: 'Старт', price: 350, gb: '15 ГБ', min: '400 мин', sms: '100 SMS', highlight: false },
  { name: 'Оптимальный', price: 600, gb: '30 ГБ', min: 'Безлимит', sms: '300 SMS', highlight: true },
  { name: 'Максимум', price: 1200, gb: 'Безлимит', min: 'Безлимит', sms: 'Безлимит', highlight: false },
];

const formatPrice = (p: number) => p.toLocaleString('ru-RU') + ' ₽';

const Index = () => {
  const [category, setCategory] = useState('Все');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return NUMBERS.filter((n) => {
      if (category !== 'Все' && n.category !== category) return false;
      if (onlyAvailable && !n.available) return false;
      if (maxPrice && n.price > Number(maxPrice)) return false;
      if (search && !n.number.replace(/\D/g, '').includes(search.replace(/\D/g, ''))) return false;
      return true;
    }).sort((a, b) => a.price - b.price);
  }, [category, onlyAvailable, maxPrice, search]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-primary">
              <Icon name="Signal" className="text-primary-foreground" size={20} />
            </div>
            <span className="font-display text-xl font-700 tracking-wide text-primary">СВЯЗЬ<span className="text-accent">ПАРТНЁР</span></span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <button onClick={() => scrollTo('numbers')} className="text-sm font-500 text-muted-foreground transition-colors hover:text-primary">Красивые номера</button>
            <button onClick={() => scrollTo('tariffs')} className="text-sm font-500 text-muted-foreground transition-colors hover:text-primary">Тарифы</button>
            <button onClick={() => scrollTo('contacts')} className="text-sm font-500 text-muted-foreground transition-colors hover:text-primary">Контакты</button>
          </nav>
          <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Icon name="User" size={16} />
            <span className="hidden sm:inline">Личный кабинет</span>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="container relative py-20 md:py-28">
          <div className="max-w-3xl animate-fade-in">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-4 py-1.5 text-sm text-primary-foreground/80">
              <Icon name="ShieldCheck" size={15} className="text-accent" />
              Официальный партнёр операторов связи
            </div>
            <h1 className="font-display text-4xl font-700 leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Красивые номера<br />и выгодные тарифы
            </h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/75">
              Подберите эксклюзивный номер за секунды. Прозрачные цены, проверенная доступность, оформление под ключ.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollTo('numbers')} className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                <Icon name="Search" size={18} /> Подобрать номер
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('tariffs')} className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                Смотреть тарифы
              </Button>
            </div>
            <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-primary-foreground/15 pt-8">
              {[['12 000+', 'номеров в базе'], ['4', 'оператора'], ['24/7', 'поддержка']].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl font-700 text-accent md:text-3xl">{v}</div>
                  <div className="text-xs text-primary-foreground/60">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Numbers + Search */}
      <section id="numbers" className="container py-16 md:py-24">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-3xl font-700 tracking-tight text-primary md:text-4xl">Подбор красивых номеров</h2>
            <p className="mt-2 text-muted-foreground">Фильтруйте по категории, цене и доступности</p>
          </div>
          <span className="text-sm text-muted-foreground">Найдено: <b className="text-primary">{filtered.length}</b></span>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-lg border border-border bg-card p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Поиск по цифрам номера..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="relative">
              <Icon name="Wallet" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input type="number" placeholder="Цена до, ₽" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="pl-10" />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-1.5 text-sm font-500 transition-colors ${category === c ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-border'}`}>
                {c}
              </button>
            ))}
            <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" checked={onlyAvailable} onChange={(e) => setOnlyAvailable(e.target.checked)} className="h-4 w-4 accent-[hsl(var(--accent))]" />
              Только доступные
            </label>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((n) => (
            <div key={n.number} className="group animate-fade-in rounded-lg border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded bg-secondary px-2 py-0.5 text-xs font-500 text-secondary-foreground">{n.category}</span>
                <span className={`flex items-center gap-1 text-xs font-500 ${n.available ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                  <Icon name={n.available ? 'CircleCheck' : 'CircleSlash'} size={13} />
                  {n.available ? 'Доступен' : 'Продан'}
                </span>
              </div>
              <div className="font-display text-2xl font-600 tracking-wide text-primary">{n.number}</div>
              <div className="mt-1 text-sm text-muted-foreground">{n.operator}</div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="font-display text-xl font-700 text-primary">{formatPrice(n.price)}</span>
                <Button size="sm" disabled={!n.available} className="gap-1.5 bg-primary hover:bg-primary/90 disabled:opacity-40">
                  <Icon name="ShoppingCart" size={15} /> Купить
                </Button>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-lg border border-dashed border-border py-16 text-center text-muted-foreground">
            <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-50" />
            По вашему запросу номеров не найдено
          </div>
        )}
      </section>

      {/* Tariffs */}
      <section id="tariffs" className="border-y border-border bg-secondary/40 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-700 tracking-tight text-primary md:text-4xl">Выгодные тарифы</h2>
            <p className="mt-2 text-muted-foreground">Прозрачные условия без скрытых платежей</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TARIFFS.map((t) => (
              <div key={t.name} className={`relative rounded-lg border bg-card p-8 shadow-sm transition-transform hover:-translate-y-1 ${t.highlight ? 'border-accent shadow-md md:scale-105' : 'border-border'}`}>
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-600 text-accent-foreground">Популярный</span>
                )}
                <h3 className="font-display text-xl font-700 text-primary">{t.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-700 text-primary">{t.price}</span>
                  <span className="text-muted-foreground">₽/мес</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {[['Wifi', t.gb + ' интернета'], ['Phone', t.min], ['MessageSquare', t.sms]].map(([icon, label]) => (
                    <li key={label} className="flex items-center gap-3">
                      <Icon name={icon} size={16} className="text-accent" />
                      <span className="text-foreground">{label}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`mt-8 w-full ${t.highlight ? 'bg-accent text-accent-foreground hover:bg-accent/90' : 'bg-primary hover:bg-primary/90'}`}>Подключить</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="container py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-700 tracking-tight text-primary md:text-4xl">Контакты</h2>
            <p className="mt-2 max-w-md text-muted-foreground">Свяжитесь с нами удобным способом — ответим в течение 15 минут.</p>
            <div className="mt-8 space-y-5">
              {[
                ['Phone', 'Телефон', '8 800 555-00-11'],
                ['Mail', 'Email', 'sale@svyazpartner.ru'],
                ['MapPin', 'Офис', 'Москва, ул. Тверская, 15'],
                ['Clock', 'Режим работы', 'Ежедневно, 9:00 – 21:00'],
              ].map(([icon, label, val]) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-secondary">
                    <Icon name={icon} size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{label}</div>
                    <div className="font-500 text-foreground">{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
            <h3 className="font-display text-xl font-700 text-primary">Оставить заявку</h3>
            <p className="mt-1 text-sm text-muted-foreground">Перезвоним и поможем с выбором</p>
            <div className="mt-6 space-y-4">
              <Input placeholder="Ваше имя" />
              <Input placeholder="Телефон" type="tel" />
              <Input placeholder="Какой номер интересует?" />
              <Button className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                <Icon name="Send" size={16} /> Отправить заявку
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <Icon name="Signal" size={18} className="text-accent" />
            <span className="font-display font-600 tracking-wide">СВЯЗЬПАРТНЁР</span>
          </div>
          <p className="text-sm text-primary-foreground/60">© 2026 СвязьПартнёр. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
