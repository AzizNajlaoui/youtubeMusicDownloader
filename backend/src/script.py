

import yt_dlp
import os

import uvicorn


from fastapi import FastAPI , BackgroundTasks , HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from fastapi.middleware.cors import CORSMiddleware

from fastapi.responses import FileResponse

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            
    allow_credentials=True,
    allow_methods=["*"],             
    allow_headers=["*"],            
)

app.mount("/assets" , StaticFiles(directory="frontend/dist/assets"))

def remove_file(path : str):
    if os.path.exists(path):
        os.remove(path)


@app.get("/")
def read_root():
    return FileResponse(os.path.join("frontend/dist/index.html"))





@app.get("/download_audio")
async def download_audio_endpoint(url : str , downloadPlayList : bool = False , background_tasks : BackgroundTasks = None):
    
    output_template = "%(title)s.%(ext)s"

    ydl_opts = {
        "format": "bestaudio/best",
        "outtmpl": output_template,
        "noplaylist": not downloadPlayList,
        "quiet": True 
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url,download=True)

            fileName = ydl.prepare_filename(info if not downloadPlayList else info['entries'][0])

            background_tasks.add_task(remove_file,fileName)

            return FileResponse(
                path=fileName,
                filename=os.path.basename(fileName),
                media_type='application/octet-stream'
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))





if __name__ == "__main__":
    

    if not os.path.exists("downloads"):
        os.makedirs("downloads")

    uvicorn.run(
        app,
        host="0.0.0.0",   # VERY important for Render
        port=int(os.environ.get("PORT", 8000))
    )
