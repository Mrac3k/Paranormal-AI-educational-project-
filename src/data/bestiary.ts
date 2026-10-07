export type DangerLevel = "I" | "II" | "III" | "IV" | "V" | "Ω";
export type EntityClass = "Ω" | "V" | "S" | "B" | "M" | "A" | "H";
export type Category = "ALL" | EntityClass;

export interface CreatureVariant {
  name: string;
  description: string;
}

export interface Creature {
  id: string;
  code: string;
  name: string;
  latinName?: string;
  entityClass: EntityClass[];
  dangerLevel: DangerLevel;
  tagline: string;
  quote: string;
  lore: string;
  firstSigns: string[];
  weaknesses: string[];
  variants: CreatureVariant[];
  lastDetected: string;
  detectionCount: number;
  unlocked: boolean;
}

export const classLabels: Record<EntityClass, { label: string; description: string; icon: string }> = {
  Ω: { label: "OMEGA", description: "Непостижимые", icon: "?" },
  V: { label: "VINTAGE", description: "Древние", icon: "☠" },
  S: { label: "SPIRIT", description: "Сверхъестественные", icon: "👻" },
  B: { label: "BIO", description: "Биологические", icon: "🧬" },
  M: { label: "MIMIC", description: "Миметические", icon: "🎭" },
  A: { label: "ANOMALY", description: "Аномальные", icon: "☢" },
  H: { label: "HABITAT", description: "Территориальные", icon: "🏚" },
};

export const dangerLabels: Record<DangerLevel, { label: string; color: string; description: string }> = {
  I: { label: "LOW", color: "#00ff00", description: "Минимальная угроза" },
  II: { label: "MODERATE", color: "#ffbf00", description: "Умеренная угроза" },
  III: { label: "DANGEROUS", color: "#ff8800", description: "Опасная угроза" },
  IV: { label: "CRITICAL", color: "#ff0000", description: "Критическая угроза" },
  V: { label: "CATASTROPHIC", color: "#000000", description: "Катастрофическая угроза" },
  Ω: { label: "UNKNOWN", color: "#a855f7", description: "Неизвестный уровень" },
};

export const categories: { id: Category; label: string }[] = [
  { id: "ALL", label: "ALL" },
  { id: "Ω", label: "CLASS Ω" },
  { id: "V", label: "CLASS V" },
  { id: "S", label: "CLASS S" },
  { id: "B", label: "CLASS B" },
  { id: "M", label: "CLASS M" },
  { id: "A", label: "CLASS A" },
  { id: "H", label: "CLASS H" },
];

// Base templates for procedural generation
const prefixes = [
  "Плачущая", "Двойник", "Король", "Тень", "Шепчущий", "Смотрящий", "Голодный",
  "Древний", "Погребённый", "Забытый", "Потерянный", "Красный", "Чёрный", "Белый",
  "Пустой", "Полый", "Длинноногий", "Многоглазый", "Безликий", "Скрипучий",
  "Мокрый", "Горящий", "Замёрзший", "Гниющий", "Живой", "Мёртвый", "Невидимый",
  "Скрытый", "Слепой", "Глухой", "Немой", "Кричащий", "Смеющийся", "Поющий",
  "Танцующий", "Ползущий", "Летающий", "Копающий", "Рыщущий", "Охотящийся",
  "Бродячий", "Стационарный", "Коллективный", "Раздвоенный", "Разрозненный",
  "Старый", "Молодой", "Детский", "Материнский", "Отец", "Мать", "Дитя",
  "Судья", "Палач", "Жрец", "Воин", "Царь", "Королева", "Слуга", "Хозяин",
];

const suffixes = [
  "Пустоты", "Тьмы", "Света", "Тумана", "Пепла", "Пыли", "Грязи", "Крови",
  "Костей", "Плоти", "Кожи", "Волос", "Зубов", "Глаз", "Рук", "Ног",
  "Леса", "Болота", "Озера", "Реки", "Моря", "Горы", "Пещеры", "Дома",
  "Подвала", "Чердака", "Коридора", "Комнаты", "Зеркала", "Двери", "Окна",
  "Лестницы", "Крыши", "Улицы", "Моста", "Тоннеля", "Шахты", "Башни",
  "Колодца", "Кладбища", "Больницы", "Школы", "Завода", "Тюрьмы", "Церкви",
  "Поля", "Огорода", "Сада", "Парка", "Лабиринта", "Ловушки", "Сна",
  "Кошмара", "Времени", "Пространства", "Памяти", "Забвения", "Безумия",
  "Страха", "Боли", "Горя", "Ярости", "Ненависти", "Любви", "Зависти",
];

const quoteTemplates = [
  "Если ты слышишь {sign}, {entity} уже близко.",
  "Не оглядывайся. {entity} любит зрителей.",
  "{entity} не убивает сразу. Сначала оно смотрит.",
  "Те, кто видел {entity}, перестают спать.",
  "{entity} помнит каждого, кто его назвал.",
  "В тишине {entity} слышит твой пульс.",
  "{entity} не имеет лица, но узнаёт твоё.",
  "Один взгляд на {entity} стоит недели кошмаров.",
  "{entity} приходит туда, где погас свет.",
  "Следы {entity} остаются на плёнке, не на стеклах.",
];

const signs = [
  "шорох", "плач", "стук", "шёпот", "смех", "скрип", "вой", "тонкий свист",
  "удар", "запах серы", "падение температуры", "мигание света", "статический шум",
  "блики в углу", "чужая тень", "неправильное эхо", "металлический вкус",
];

const weaknessPool = [
  "Соль", "Железо", "Серебро", "Священная вода", "Ультрафиолет", "Огонь",
  "Холод", "Звук колоколов", "Имя сущности", "Зеркала", "Круги", "Медь",
  "Электричество", "Магниты", "Камера с ИК-фильтром", "Чистый кварц",
  "Высокая частота", "Низкая частота", "Полное затемнение", "Яркий свет",
];

function generateCreatures(count: number, startIndex: number): Creature[] {
  const creatures: Creature[] = [];
  const classes: EntityClass[] = ["Ω", "V", "S", "B", "M", "A", "H"];
  const dangers: DangerLevel[] = ["I", "II", "III", "IV", "V", "Ω"];

  for (let i = 0; i < count; i++) {
    const idx = startIndex + i;
    const prefix = prefixes[idx % prefixes.length];
    const suffix = suffixes[Math.floor(idx / prefixes.length) % suffixes.length];
    const name = `${prefix} ${suffix}`;
    const code = String(idx).padStart(3, "0");
    const entityClass = [classes[idx % classes.length]];
    const dangerLevel = dangers[idx % dangers.length];
    const sign = signs[idx % signs.length];
    const quoteTemplate = quoteTemplates[idx % quoteTemplates.length];
    const quote = quoteTemplate.replace(/{entity}/g, name).replace(/{sign}/g, sign);

    const lore = `Запись #${code} зафиксирована в полевых условиях. ${name} демонстрирует ${sign} как основной признак присутствия. Классификация ${entityClass.join("/")} указывает на ${classLabels[entityClass[0]].description.toLowerCase()} природу объекта. Уровень угрозы: ${dangerLabels[dangerLevel].label}. Полные данные доступны подписчикам с уровнем доступа Investigator и выше.`;

    creatures.push({
      id: `entity-${idx}`,
      code,
      name,
      entityClass,
      dangerLevel,
      tagline: `Объект класса ${entityClass.join("/")}`,
      quote,
      lore,
      firstSigns: [sign, "Аномальное поведение техники", "Изменение температуры"],
      weaknesses: [weaknessPool[idx % weaknessPool.length], weaknessPool[(idx + 1) % weaknessPool.length]],
      variants: [
        { name: "Альфа", description: "Базовая форма, наиболее часто встречается в отчётах." },
        { name: "Бета", description: "Мутировавшая разновидность с усиленной агрессией." },
      ],
      lastDetected: `${(idx % 59) + 1} min ago`,
      detectionCount: Math.floor(Math.random() * 9000) + 100,
      unlocked: false,
    });
  }

  return creatures;
}

// Featured unlocked demo creatures
const featuredCreatures: Creature[] = [
  {
    id: "weeper",
    code: "001",
    name: "ПЛАЧУЩАЯ",
    entityClass: ["S", "H"],
    dangerLevel: "III",
    tagline: "Акустическая аномалия жилых зон",
    quote: "Если плач слышен далеко... она уже рядом.",
    lore:
      "Плакальщица регистрируется как остаточная акустическая личность в диапазоне 18–22 кГц. P-AI выделяет её по периодичности всхлипов и отсутствию материального источника. Не агрессивна, но длительное воздействие вызывает бессонницу и auditory hallucinations.",
    firstSigns: ["Приглушённый плач в ночные часы", "Конденсат на холодных стёклах", "Запах старой дымки"],
    weaknesses: ["Звуковые ловушки", "Реконструкция имени", "Священная вода"],
    variants: [
      { name: "Детская", description: "Высокочастотный голос, связан с потерей ребёнка." },
      { name: "Невеста", description: "Тяжёлые шаги и шелест ткани." },
    ],
    lastDetected: "2 min ago",
    detectionCount: 3156,
    unlocked: true,
  },
  {
    id: "doppelganger",
    code: "006",
    name: "ДВОЙНИК",
    entityClass: ["M", "S"],
    dangerLevel: "V",
    tagline: "Миметическая замена наблюдателя",
    quote: "Не доверяй отражению.",
    lore:
      "Двойник — миметическая сущность, копирующая внешность и поведение человека с задержкой 3–7 секунд. P-AI распознаёт его по нарушению перспективы в зеркалах и отсутствию теплового следа. Наиболее опасен в изолированных пространствах.",
    firstSigns: ["Задержка движений в зеркале", "Чужой голос из соседней комнаты", "Дезориентация во времени"],
    weaknesses: ["Зеркала с серебряной амальгамой", "Прямой вопрос о имени", "УФ-излучение"],
    variants: [
      { name: "Зеркальный", description: "Действует только через отражения." },
      { name: "Полевой", description: "Материализуется вне зеркал, наиболее агрессивен." },
    ],
    lastDetected: "14 min ago",
    detectionCount: 892,
    unlocked: true,
  },
  {
    id: "king-of-void",
    code: "050",
    name: "КОРОЛЬ ПУСТОТЫ",
    entityClass: ["Ω"],
    dangerLevel: "Ω",
    tagline: "Непостижимая фрактальная сущность",
    quote: "Никто не видел его полностью.",
    lore:
      "Король Пустоты — единственная запись класса Ω с подтверждёнными взаимодействиями. Проявляется как геометрически невозможная тень, поглощающая свет в радиусе до 50 метров. P-AI не способна классифицировать его полностью. Контакт с объектом запрещён протоколом безопасности.",
    firstSigns: ["Исчезновение звёзд в поле зрения", "Геометрический узор на стенах", "Полная потеря глубины пространства"],
    weaknesses: ["Неизвестны", "Избегать прямого визуального контакта", "Эвакуация на 500+ метров"],
    variants: [
      { name: "Фрагмент", description: "Часть сущности, просачивающаяся в наше измерение." },
      { name: "Аватар", description: "Носитель воли Короля, встречается крайне редко." },
    ],
    lastDetected: "3 weeks ago",
    detectionCount: 17,
    unlocked: true,
  },
  {
    id: "umbral-stalker",
    code: "012",
    name: "ТЕНЕВОЙ СТАЛКЕР",
    entityClass: ["A"],
    dangerLevel: "IV",
    tagline: "Движущийся угол периферийного зрения",
    quote: "Он не отбрасывает тени. Он ими является.",
    lore:
      "Теневые Сталкеры фиксируются как двумерные силуэты в плоскости стен и пола. P-AI выделяет их по нарушению перспективы теней: в отличие от обычных теней, они не повторяют форму источника света.",
    firstSigns: ["Движение в периферийном зрении", "Неравномерное затемнение углов", "Потеря фокуса камерой"],
    weaknesses: ["Яркий направленный свет", "Ультрафиолет", "Соль на пороге"],
    variants: [
      { name: "Угловой", description: "Сидит строго в углах, не выходит за линию пересечения стен." },
      { name: "Ползучий", description: "Перемещается по полу, имитируя тень прохожего." },
    ],
    lastDetected: "2 min ago",
    detectionCount: 4821,
    unlocked: true,
  },
  {
    id: "mothman-cryptid",
    code: "033",
    name: "МОТОМАН",
    entityClass: ["B", "A"],
    dangerLevel: "III",
    tagline: "Крылатый предвестник катастроф",
    quote: "Красные огни в небе — не самолёты.",
    lore:
      "Мотоман — криптид, описанный десятками свидетелей. P-AI фиксирует его по нехарактерной для птиц биомеханике полёта и отсутствию теплового следа. Появление коррелирует с крупными авариями.",
    firstSigns: ["Красные огни в небе", "Гул без источника", "Массовое беспокойство животных"],
    weaknesses: ["Неизвестны", "Рекомендуется эвакуация", "Фиксация на видео отпугивает"],
    variants: [
      { name: "Городской", description: "Появляется перед авариями на мостах." },
      { name: "Лесной", description: "Охотится на одиноких путников." },
    ],
    lastDetected: "1 month ago",
    detectionCount: 215,
    unlocked: true,
  },
];

// Generate 200+ procedural creatures
const proceduralCreatures = generateCreatures(210, 101);

// Mark some procedural creatures as unlocked for free-trial feel
const unlockedIndexes = new Set([5, 12, 23, 31, 44, 58, 67, 75, 88, 96, 105, 118, 129, 137, 146, 158, 169, 177, 188, 199]);
proceduralCreatures.forEach((c, i) => {
  if (unlockedIndexes.has(i)) {
    c.unlocked = true;
  }
});

export const creatures: Creature[] = [...featuredCreatures, ...proceduralCreatures];
