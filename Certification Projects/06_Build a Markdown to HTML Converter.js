// Получаем DOM-элементы (глобально, чтобы были доступны)//
const markdownInput = document.getElementById('markdown-input');
const htmlOutput = document.getElementById('html-output');
const preview = document.getElementById('preview');  

// Вспомогательная функция для преобразования инлайн-элементов: жирный, курсив, ссылки, изображения //
function applyInline(text) {
    let result = text;
   
    // 1. Изображения: //
    result = result.replace(/!\[([^\]]*)\]\(([^)]*)\)/g, '<img alt="$1" src="$2">');

    // 2. Ссылки: //
    result = result.replace(/\[([^\]]*)\]\(([^)]*)\)/g, '<a href="$2">$1</a>');

    // 3. Жирный: //
    result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    result = result.replace(/__(.+?)__/g, '<strong>$1</strong>');

    // 4. Курсив://
    result = result.replace(/\*(.+?)\*/g, '<em>$1</em>');
    result = result.replace(/_(.+?)_/g, '<em>$1</em>');
    return result;
}

// Основная функция конвертации – должна быть глобальной, Возвращает строку с HTML-кодом //
function convertMarkdown() {
    const input = markdownInput.value;
    const lines = input.split('\n');
    const outputParts = [];
    for (let line of lines) {
        let processed = line;

        // Проверяем, является ли строка заголовком //
        const headerMatch = processed.match(/^\s*(#{1,3}) (.+)/);
        if (headerMatch) {
            const level = headerMatch[1].length;      // 1, 2 или 3
            let content = headerMatch[2];
            content = applyInline(content);           // применяем инлайн-форматирование внутри//
            processed = `<h${level}>${content}</h${level}>`;
        } else {
            
          // Проверяем, является ли строка цитатой //
            const quoteMatch = processed.match(/^\s*>\s*(.+)/);
            if (quoteMatch) {
                let content = quoteMatch[1];
                content = applyInline(content);       // применяем инлайн-форматирование внутри//
                processed = `<blockquote>${content}</blockquote>`;
            } else {
                // Обычная строка – применяем инлайн-преобразования ко всей строке//
                processed = applyInline(processed);
            }
        }
        outputParts.push(processed);
    }
// Объединяем все строки без дополнительных разделителей //
    return outputParts.join('');
}

function updateOutput() {
    const html = convertMarkdown();
    htmlOutput.textContent = html;   // сырой HTML-код
    preview.innerHTML = html;        // рендеринг в браузере
}

// Подписываемся на событие input
markdownInput.addEventListener('input', updateOutput);

// Первоначальный запуск (для пустого поля)
updateOutput();
