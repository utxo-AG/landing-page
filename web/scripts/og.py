"""Render the share images from the built site: python3 scripts/og.py [base url, default http://localhost:4322]"""
import os
import sys
from playwright.sync_api import sync_playwright

base = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4322'
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'og')

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True, args=['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'])
    for lang in ('de', 'en'):
        page = browser.new_context(viewport={'width': 1200, 'height': 630}, device_scale_factor=1).new_page()
        page.goto(f'{base}/dev/og?lang={lang}')
        page.add_style_tag(content='.consent{display:none!important}')
        page.wait_for_timeout(4200)
        page.screenshot(path=os.path.join(out, f'og-{lang}.png'))
        page.close()
    browser.close()
