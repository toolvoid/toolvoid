class ClaudeParser:
    def __init__(self, client):
        self.client = client

    async def extract(self):
        js = """
        (function() {
            function clean(text) {
                return (text || '')
                    .replace(/\\u00a0/g, ' ')
                    .replace(/Claude's response/gi, '')
                    .replace(/CopyRetry/gi, '')
                    .replace(/\\s+/g, ' ')
                    .trim();
            }

            function textFrom(node) {
                const blocks = Array.from(node.querySelectorAll('p, li, pre, code, h1, h2, h3, h4, h5, h6, blockquote'))
                    .map(el => clean(el.textContent || el.innerText))
                    .filter(Boolean);
                if (blocks.length) return blocks.join('\\n');
                return clean(node.textContent || node.innerText);
            }

            const turns = document.querySelectorAll([
                '[data-testid="human-turn"]',
                '[data-testid="ai-turn"]',
                '[data-testid="user-message"]',
                '[data-is-streaming]'
            ].join(','));

            let out = '';
            turns.forEach(t => {
                const testid = t.getAttribute('data-testid') || '';
                const isUser = testid === 'human-turn' || testid === 'user-message';
                const content = isUser
                    ? t
                    : (t.querySelector('.font-claude-response') || t.querySelector('[class*="claude-response"]') || t);
                const text = textFrom(content);
                if (text) out += (isUser ? 'User' : 'Claude') + ': ' + text + '\\n\\n';
            });

            if (out.trim()) return out.trim();

            const fallbackNodes = document.querySelectorAll('[class*="font-user-message"], [class*="claude-response"]');
            fallbackNodes.forEach((node, index) => {
                const text = textFrom(node);
                if (text) out += (index % 2 === 0 ? 'User' : 'Claude') + ': ' + text + '\\n\\n';
            });

            if (out.trim()) return out.trim();
            const app = document.querySelector('[data-testid="conversation"]') || document.querySelector('[data-testid="chat-page"]') || document.body;
            return clean(app.textContent || app.innerText);
        })()
        """
        return await self.client.evaluate(js)
