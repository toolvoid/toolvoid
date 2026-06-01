class DeepSeekParser:
    def __init__(self, client):
        self.client = client

    async def extract(self):
        js = """
        (function() {
            const turns = document.querySelectorAll('.fbb737a4, .ds-markdown');
            let out = '';
            let isUser = true;
            turns.forEach(t => {
                out += (isUser ? 'User' : 'DeepSeek') + ': ' + t.innerText.trim() + '\\n\\n';
                isUser = !isUser;
            });
            if (out.trim()) return out.trim();
            const main = document.querySelector('main') || document.querySelector('[role="main"]');
            return main ? main.innerText.trim() : '';
        })()
        """
        return await self.client.evaluate(js)
