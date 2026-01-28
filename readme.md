# Youtube Downloader app

A simple web app to download audio from YouTube links
built in a 30min challange

Frontend : **Vite + typescript**
Backend : **FastAPI**

## features

- Download audio from a YouTube URL

- Optional playlist download (backend)

## requirements

- Python ^3.10.0
- ty_dlp (library for youtube music downloading)

- fastapi (backend framework)

- uvicorn (backend server)

# steps

- clone the repo

- create a python virtual enviroment:
  - python -m venv venv

- activate the enviroment :
  (for windows)
  - venv\Scripts\activate
    (for macOS/linux)
    - source venv/bin/activate

-install dependencies
pip install -r requirements.txt

start the server :

uvicorn main:app --reload

#

the open your browser at http://127.0.0.1:8000
