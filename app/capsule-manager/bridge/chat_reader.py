from parsers.claude_parser   import ClaudeParser
from parsers.chatgpt_parser  import ChatGPTParser
from parsers.gemini_parser   import GeminiParser
from parsers.deepseek_parser import DeepSeekParser

PARSER_MAP = {
    'claude.ai':         ClaudeParser,
    'chat.openai.com':   ChatGPTParser,
    'gemini.google.com': GeminiParser,
    'chat.deepseek.com': DeepSeekParser,
}

class ChatReader:
    def __init__(self, client):
        self.client = client

    async def read(self, url):
        for domain, ParserClass in PARSER_MAP.items():
            if domain in url:
                return await ParserClass(self.client).extract()
        # Fallback: prefer the active app content, never sidebars/full page chrome.
        return await self.client.evaluate("""
        (function() {
            const main = document.querySelector('main') || document.querySelector('[role="main"]');
            return main ? main.innerText.trim() : '';
        })()
        """)
