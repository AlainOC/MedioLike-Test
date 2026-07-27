import json
import sys

lines = []
with open(r'C:\Users\Equal\.gemini\antigravity\brain\e92cbba7-8a75-4fe2-8cd3-836dada55a37\.system_generated\logs\transcript.jsonl', encoding='utf8') as f:
    for line in f:
        if 'firebaseConfig' in line or 'apiKey' in line or 'GoogleService-Info' in line:
            lines.append(json.loads(line))

with open('keys.json', 'w', encoding='utf-8') as f:
    json.dump(lines, f, indent=2)
