"""Key parity de/ vs en/ dictionaries: same key paths, array lengths, types; non-string values equal. Lists identical string values."""
import json, os, sys
SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'i18n', '')
FOLDERS = ['mockups', 'services']
listing = lambda lang, folder: sorted(f for f in os.listdir(SRC + lang + '/' + folder) if f.endswith('.json')) if os.path.isdir(SRC + lang + '/' + folder) else []
files = ['site.json', 'pages.json'] + [folder + '/' + f for folder in FOLDERS for f in listing('de', folder)]
errors, same, strings = [f'en only: {folder}/{f}' for folder in FOLDERS for f in sorted(set(listing('en', folder)) - set(listing('de', folder)))], [], 0
def walk(a, b, path):
    global strings
    if type(a) is not type(b): errors.append(f'{path}: type {type(a).__name__} vs {type(b).__name__}'); return
    if isinstance(a, dict):
        if list(a) != list(b): errors.append(f'{path}: keys differ: de only {sorted(set(a)-set(b))}, en only {sorted(set(b)-set(a))}, order equal: {sorted(a)==sorted(b)}')
        for k in a:
            if k in b: walk(a[k], b[k], f'{path}.{k}')
    elif isinstance(a, list):
        if len(a) != len(b): errors.append(f'{path}: length {len(a)} vs {len(b)}')
        for i, (x, y) in enumerate(zip(a, b)): walk(x, y, f'{path}[{i}]')
    elif isinstance(a, str):
        strings += 1
        if a == b: same.append((path, a))
    elif a != b: errors.append(f'{path}: value {a!r} vs {b!r}')
for f in files:
    if not os.path.exists(SRC + 'en/' + f): errors.append(f'missing en/{f}'); continue
    walk(json.load(open(SRC + 'de/' + f)), json.load(open(SRC + 'en/' + f)), f)
print(f'files {len(files)}, string values {strings}, identical {len(same)}, errors {len(errors)}')
for e in errors: print('ERROR', e)
if '-v' in sys.argv:
    for p, v in same: print('  same', p, '=', json.dumps(v, ensure_ascii=False))
else:
    print('identical values (unique):', ' | '.join(sorted({v for _, v in same})))
sys.exit(1 if errors else 0)
