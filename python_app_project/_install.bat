@echo off

IF NOT EXIST venv\Scripts\activate (
    python -m venv venv
)

"venv\Scripts\python.exe" -m pip install -r requirements.txt