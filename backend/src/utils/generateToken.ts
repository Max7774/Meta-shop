export function generateToken(length: any) {
  // Возможные символы, которые могут быть использованы в токене
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let token = '';
  for (let i = 0; i < length; i++) {
    // Генерируем случайный индекс символа
    const randomIndex = Math.floor(Math.random() * chars.length);
    // Получаем символ по индексу и добавляем к токену
    token += chars[randomIndex];
  }

  return token;
}
