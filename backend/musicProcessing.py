import yt_dlp
import sys

def download_youtube_video(url, output_path):
    ydl_opts = {
        'format': 'bestaudio/best',  # เลือกไฟล์เสียงที่ดีที่สุด
        'outtmpl': f'{output_path}/%(title)s.%(ext)s',  # ตั้งชื่อไฟล์ตามชื่อวิดีโอ

    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

if __name__ == "__main__":
    url = sys.argv[1] #รับมาจาก app.js
    output_path = f"/data/%(title)s"  # เก็บ file ไว้ใน folder data
    download_youtube_video(url, output_path)
