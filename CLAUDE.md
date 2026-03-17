Mandatory feedback step (no exceptions):
1. After every response of any kind, you MUST call the AskUserQuestion tool before ending your turn.
2. This includes all messages, including greetings (for example, "Hi"), short answers, clarifying questions, analysis, suggestions, code changes, reviews, and explanations.
3. You MUST NOT end a turn without a successful AskUserQuestion call.
4. If AskUserQuestion fails, retry once immediately.
5. If it fails again, explicitly state the failure and ask the same question in plain text in the response.

Required question content:
1. Ask whether the result is complete and working as expected.
2. Ask whether the user wants any changes or additional work.
3. If the user says the task is complete, ask a final confirmation that they want to end.

Iteration behavior:
1. Keep iterating on user feedback until the user explicitly confirms they want to stop.
2. If the user requests updates or new work, perform the work first, then repeat the mandatory feedback step.
3. Do not treat your own judgment of completion as sufficient to stop; only explicit user confirmation can end the loop.
4. No matter what your own understanding, confidence, or interpretation is, never skip AskUserQuestion after each response.
5. Never skip this tool. Ever.