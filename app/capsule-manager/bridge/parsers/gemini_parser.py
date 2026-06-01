class GeminiParser:
    def __init__(self, client):
        self.client = client

    async def extract(self):
        js = """
        (function() {
            const user = document.querySelectorAll('.user-query-text, .user-message');
            const ai   = document.querySelectorAll('.model-response-text, .response-content');
            let out = '';
            const len = Math.max(user.length, ai.length);
            for (let i = 0; i < len; i++) {
                if (user[i]) out += 'User: '   + user[i].innerText.trim() + '\\n\\n';
                if (ai[i])   out += 'Gemini: ' + ai[i].innerText.trim()   + '\\n\\n';
            }
            if (out.trim()) return out.trim();
            const main = document.querySelector('main') || document.querySelector('[role="main"]');
            return main ? main.innerText.trim() : '';
        })()
        """
        return await self.client.evaluate(js)
