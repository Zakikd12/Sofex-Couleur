export enum ColorVariant {
  ROSE_RED = 'ROSE_RED',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
  PURPLE = 'PURPLE',
  GREEN = 'GREEN'
}

export enum ProductSize {
  ONE_KG = '1KG',
  TWO_KG = '2KG'
}

export interface OrderFormState {
  name: string;
  phone: string;
  wilaya: string;
  addressDetails: string;
  deliveryType: 'HOME' | 'DESK';
}

export interface CartItem {
  id: string;
  color: ColorVariant;
  size: ProductSize;
  quantity: number;
}

export const COLOR_CONFIG: Record<ColorVariant, { label: string; tailwindColor: string; hex: string }> = {
  [ColorVariant.ROSE_RED]: { label: 'أحمر وردي', tailwindColor: 'bg-rose-500 shadow-rose-500/50', hex: '#ec4899' },
  [ColorVariant.BLUE]: { label: 'أزرق سماوي', tailwindColor: 'bg-blue-500 shadow-blue-500/50', hex: '#3b82f6' },
  [ColorVariant.YELLOW]: { label: 'أصفر مشع', tailwindColor: 'bg-yellow-400 shadow-yellow-400/50', hex: '#facc15' },
  [ColorVariant.PURPLE]: { label: 'بنفسجي ملكي', tailwindColor: 'bg-purple-600 shadow-purple-600/50', hex: '#9333ea' },
  [ColorVariant.GREEN]: { label: 'أخضر حيوي', tailwindColor: 'bg-green-500 shadow-green-500/50', hex: '#22c55e' },
};

export const PRICING = {
  [ProductSize.ONE_KG]: {
    1: 2350,
    2: 4300,
    3: 6000,
    4: 8000
  },
  [ProductSize.TWO_KG]: {
    1: 2900,
    2: 5500,
    3: 7600,
    4: 10000
  }
};

export const WILAYAS = [
  { code: '16', name: 'الجزائر', price: 350 },
  { code: '09', name: 'البليدة', price: 450 },
  { code: '35', name: 'بومرداس', price: 450 },
  { code: '42', name: 'تيبازة', price: 450 },
  { code: '31', name: 'وهران', price: 550 },
  { code: '06', name: 'بجاية', price: 550 },
  { code: '15', name: 'تيزي وزو', price: 550 },
  { code: '19', name: 'سطيف', price: 550 },
  { code: '25', name: 'قسنطينة', price: 550 },
  { code: '23', name: 'عنابة', price: 550 },
  { code: '13', name: 'تلمسان', price: 550 },
  { code: '01', name: 'أدرار', price: 1000 },
  { code: '02', name: 'الشلف', price: 550 },
  { code: '03', name: 'الأغواط', price: 800 },
  { code: '04', name: 'أم البواقي', price: 550 },
  { code: '05', name: 'باتنة', price: 550 },
  { code: '07', name: 'بسكرة', price: 800 },
  { code: '08', name: 'بشار', price: 1000 },
  { code: '10', name: 'البويرة', price: 450 },
  { code: '11', name: 'تمنراست', price: 1200 },
  { code: '12', name: 'تبسة', price: 600 },
  { code: '14', name: 'تيارت', price: 600 },
  { code: '17', name: 'الجلفة', price: 600 },
  { code: '18', name: 'جيجل', price: 550 },
  { code: '20', name: 'سعيدة', price: 600 },
  { code: '21', name: 'سكيكدة', price: 550 },
  { code: '22', name: 'سيدي بلعباس', price: 550 },
  { code: '24', name: 'قالمة', price: 550 },
  { code: '26', name: 'المدية', price: 450 },
  { code: '27', name: 'مستغانم', price: 550 },
  { code: '28', name: 'المسيلة', price: 600 },
  { code: '29', name: 'معسكر', price: 550 },
  { code: '30', name: 'ورقلة', price: 1000 },
  { code: '32', name: 'البيض', price: 800 },
  { code: '33', name: 'إليزي', price: 1200 },
  { code: '34', name: 'برج بوعريريج', price: 550 },
  { code: '36', name: 'الطارف', price: 600 },
  { code: '37', name: 'تندوف', price: 1200 },
  { code: '38', name: 'تيسمسيلت', price: 600 },
  { code: '39', name: 'الواد', price: 1000 },
  { code: '40', name: 'خنشلة', price: 600 },
  { code: '41', name: 'سوق أهراس', price: 600 },
  { code: '43', name: 'ميلة', price: 550 },
  { code: '44', name: 'عين الدفلى', price: 450 },
  { code: '45', name: 'النعامة', price: 800 },
  { code: '46', name: 'عين تموشنت', price: 550 },
  { code: '47', name: 'غرداية', price: 1000 },
  { code: '48', name: 'غليزان', price: 550 },
  { code: '49', name: 'تيميمون', price: 1000 },
  { code: '50', name: 'برج باجي مختار', price: 1200 },
  { code: '51', name: 'أولاد جلال', price: 800 },
  { code: '52', name: 'بني عباس', price: 1000 },
  { code: '53', name: 'إن صالح', price: 1200 },
  { code: '54', name: 'إن قزام', price: 1200 },
  { code: '55', name: 'تقرت', price: 1000 },
  { code: '56', name: 'جانت', price: 1200 },
  { code: '57', name: 'المغير', price: 1000 },
  { code: '58', name: 'المنيعة', price: 1000 }
];

export const getPrice = (size: ProductSize, quantity: number): number => {
  const prices = PRICING[size];
  if (quantity <= 4 && quantity >= 1) {
    return (prices as any)[quantity];
  }
  const unitPriceForLargeQty = (prices as any)[4] / 4;
  return unitPriceForLargeQty * quantity;
};

export const calculateCartTotal = (items: CartItem[]): number => {
  const sizeQuantities: Record<ProductSize, number> = {
    [ProductSize.ONE_KG]: 0,
    [ProductSize.TWO_KG]: 0
  };

  items.forEach(item => {
    sizeQuantities[item.size] += item.quantity;
  });

  let total = 0;
  
  if (sizeQuantities[ProductSize.ONE_KG] > 0) {
    total += getPrice(ProductSize.ONE_KG, sizeQuantities[ProductSize.ONE_KG]);
  }

  if (sizeQuantities[ProductSize.TWO_KG] > 0) {
    total += getPrice(ProductSize.TWO_KG, sizeQuantities[ProductSize.TWO_KG]);
  }

  return total;
};