import sys
import json
import asyncio
from cdp_client import CDPClient
from chat_reader import ChatReader

async def read_current_chat():
    client = CDPClient()
    try:
        await client.connect()
        active_tab = await client.get_active_tab()
        url = active_tab.get('url', '')
        reader = ChatReader(client)
        raw_text = await reader.read(url)
        await client.disconnect()
        return {
            'success': True,
            'url': url,
            'raw_text': raw_text,
            'source_ai': detect_source(url)
        }
    except Exception as e:
        return { 'success': False, 'error': str(e), 'raw_text': '', 'source_ai': 'Unknown' }

def detect_source(url):
    if 'claude.ai'         in url: return 'Claude'
    if 'chat.openai.com'   in url: return 'ChatGPT'
    if 'gemini.google'     in url: return 'Gemini'
    if 'deepseek.com'      in url: return 'DeepSeek'
    if 'x.com/i/grok'      in url: return 'Grok'
    return 'Unknown'

if __name__ == '__main__':
    result = asyncio.run(read_current_chat())
    print(json.dumps(result))
