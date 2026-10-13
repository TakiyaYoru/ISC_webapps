const typeLabels: Record<string, string> = {
  Essence: 'Tinh chất',
  Cream: 'Kem dưỡng',
  Treatment: 'Dưỡng phục hồi',
  Concentrate: 'Tinh chất cô đặc',
  'Skin Booster': 'Tinh chất tăng cường',
  'Bộ Mini': 'Bộ dung tích nhỏ',
  'Set full size': 'Bộ dung tích đầy đủ',
  'Gift Set': 'Bộ quà tặng',
}

export function productTypeLabel(value: string) {
  return value.split('·').map(part => {
    const label = part.trim()
    return typeLabels[label] ?? label
  }).join(' · ')
}
