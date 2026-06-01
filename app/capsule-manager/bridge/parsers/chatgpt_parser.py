class ChatGPTParser:
    def __init__(self, client):
        self.client = client

    async def extract(self):
        js = """
        (function() {
            const main = document.querySelector('main') || document.querySelector('[role="main"]');
            const root = main || document;
            const turns = root.querySelectorAll('[data-message-author-role]');
            let out = '';

            turns.forEach(t => {
                if (!t.closest('main, [role="main"]')) return;
                const role = t.getAttribute('data-message-author-role') === 'user' ? 'User' : 'ChatGPT';
                const text = t.innerText.trim();
                if (text) out += role + ': ' + text + '\\n\\n';
            });

            if (out.trim()) return out.trim();

            const articles = root.querySelectorAll('article');
            articles.forEach((article, index) => {
                const text = article.innerText.trim();
                if (!text) return;
                const hasUser = !!article.querySelector('[data-message-author-role="user"]');
                const role = hasUser || index % 2 === 0 ? 'User' : 'ChatGPT';
                out += role + ': ' + text + '\\n\\n';
            });

            if (out.trim()) return out.trim();

            const chatText = root.innerText.trim();
            return chatText || '';
        })()
        """
        return await self.client.evaluate(js)
