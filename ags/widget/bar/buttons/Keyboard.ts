// const hyprland = await Service.import("hyprland");

// interface HKeyboard {
//   address: string;
//   name: string;
//   rules: string;
//   model: string;
//   layout: string;
//   variant: string;
//   options: string;
//   active_keymap: string;
//   main: boolean;
// }

// const getKeyboardLayout = (kbName = "gaming-keyboard") => {
//   const devices = Utils.exec("hyprctl devices -j");
//   const { keyboards } = JSON.parse(devices) as { keyboards: HKeyboard[] };
//   const mainKb = keyboards.find(({ name }) => name === kbName);
//   return mainKb?.active_keymap ?? "??";  // Возвращает текущую раскладку или '??', если не найдено
// };

// // Обёртка для динамического отслеживания раскладки клавиатуры
// const layout = Utils.watch(
//   () => getKeyboardLayout(),
//   hyprland,
//   "keyboard-layout",
//   () => getKeyboardLayout(),
// );

// const Language = () =>
//   Widget.Label({
//     label: layout.as(
//       (layout) =>
//         ({
//           "Russian (QWERTY)": "ru",  // Определение сокращений для раскладок
//           "English (US)": "en",
//         })[layout] ?? layout,  // Если раскладка не в списке, отображаем её как есть
//     ),
//   });

// export default () =>
//   Widget.Box({
//     children: [Language()],  // Добавляем виджет для отображения раскладки
//   });

const hyprland = await Service.import("hyprland");

interface HKeyboard {
  address: string;
  name: string;
  rules: string;
  model: string;
  layout: string;
  variant: string;
  options: string;
  active_keymap: string;
  main: boolean;
}

const getKeyboardLayout = (kbName = "gaming-keyboard") => {
  const devices = Utils.exec("hyprctl devices -j");
  const { keyboards } = JSON.parse(devices) as { keyboards: HKeyboard[] };
  const mainKb = keyboards.find(({ name }) => name === kbName);
  return mainKb?.active_keymap ?? "??";
};

const layout = Utils.watch(
  getKeyboardLayout(),
  hyprland,
  "keyboard-layout",
  () => getKeyboardLayout(),
);

const Language = () =>
  Widget.Label({
    label: layout.as(
      (layout) =>
        ({
          "Russian (QWERTY)": "cs",
          "English (US)": "en",
        })[layout] ?? layout,
    ),
  });

export default () =>
  Widget.Box({
    children: Language(),
  });