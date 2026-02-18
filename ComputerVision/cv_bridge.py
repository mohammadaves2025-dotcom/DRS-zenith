import requests
import time
import sys

# --- CONFIGURATION ---
# 1. The URL of your Node.js Backend
BACKEND_URL = "http://localhost:4000/api/video"

# 2. The ID of the video she wants to analyze
# (In a real app, this might come from a queue, but for now she can paste it here)
VIDEO_ID = "699570c18944d81100115381" # <--- PASTE THE _ID FROM YOUR MONGODB HERE

def get_video_details():

    """Step 1: Get the video info from the server"""
    try:
        url = f"{BACKEND_URL}/{VIDEO_ID}"
        print(f"📡 Connecting to {url}...")
        response = requests.get(url)
        
        if response.status_code == 200:
            video_data = response.json()
            print(f"✅ FOUND VIDEO: {video_data.get('originalName')}")
            print(f"📂 LOCATED AT: {video_data.get('filepath')}")
            return video_data
        else:
            print("❌ Error: Video not found.")
            sys.exit(1)
    except Exception as e:
        print(f"❌ Connection Failed: {e}")
        sys.exit(1)


def simulate_cv_analysis(video_path):

    """Step 2: HER COMPUTER VISION LOGIC GOES HERE"""

    print(f"\n🧠 STARTING CV ANALYSIS ON: {video_path}")
    print("   - Loading frames...")
    time.sleep(1)
    print("   - Tracking ball trajectory...")
    time.sleep(1)
    print("   - Detecting impact point...")
    time.sleep(1)
    print("   - Calculating stump prediction...")
    
    # This is the data her model generates:
    results = {
        "pitching": "In Line",
        "impact": "Umpire's Call",
        "wickets": "Hitting"
    }
    
    print("✅ ANALYSIS COMPLETE.")
    return results


def upload_results(results):
    """Step 3: Send results back to Node.js Database"""
    url = f"{BACKEND_URL}/{VIDEO_ID}/analysis"
    print(f"\n📤 Uploading results to: {url}")
    
    try:
        response = requests.put(url, json=results)
        if response.status_code == 200:
            print("🎉 SUCCESS! Database updated with DRS decision.")
            print("Server Response:", response.json())
        else:
            print(f"❌ Upload Failed: {response.text}")
    except Exception as e:
        print(f"❌ Network Error: {e}")


if __name__ == "__main__":
    print("--- DRS COMPUTER VISION PIPELINE ---")
    
    # 1. Check if video exists
    video_info = get_video_details()
    
    # 2. Run Analysis
    analysis_results = simulate_cv_analysis(video_info.get('filepath'))
    
    # 3. Save to DB
    upload_results(analysis_results)