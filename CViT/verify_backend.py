import os
import sys

# Add root directory to python path to resolve backend imports
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from backend.services.prediction_service import prediction_service

def verify_all():
    print("==================================================")
    print("Starting AI Model verification...")
    print("==================================================")
    
    # 1. Check weights file exists
    weights_path = os.path.join("weight", "cvit2_deepfake_detection_ep_50.pth")
    if not os.path.exists(weights_path):
        print(f"ERROR: Weights file does not exist at {weights_path}")
        sys.exit(1)
        
    print(f"Confirmed weights file exists: {weights_path} ({os.path.getsize(weights_path)} bytes)")
    
    # 2. Try loading model
    try:
        prediction_service.load_model()
        print("SUCCESS: Model and weights loaded successfully.")
    except Exception as e:
        print(f"ERROR: Failed to load model/weights: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
        
    # 3. Verify Video prediction
    sample_video = "sample__prediction_data/0017_fake.mp4.mp4"
    print(f"\nRunning video inference on: {sample_video}")
    
    # Copy the video because prediction_service deletes the input file after running
    temp_video_copy = "sample__prediction_data/temp_test_vid.mp4"
    if os.path.exists(sample_video):
        import shutil
        shutil.copyfile(sample_video, temp_video_copy)
        
        try:
            res_vid = prediction_service.predict(temp_video_copy, "video")
            print("SUCCESS: Video prediction returned successfully:")
            print(res_vid)
        except Exception as e:
            print(f"ERROR: Video prediction failed: {str(e)}")
            import traceback
            traceback.print_exc()
    else:
        print(f"WARNING: Sample video not found at {sample_video}, skipping video verification.")

    # 4. Verify Image prediction
    sample_image = "sample_train_data/test/real/asjeirtlwd_5.jpg"
    print(f"\nRunning image inference on: {sample_image}")
    
    temp_img_copy = "sample_train_data/test/real/temp_test_img.jpg"
    if os.path.exists(sample_image):
        import shutil
        shutil.copyfile(sample_image, temp_img_copy)
        
        try:
            res_img = prediction_service.predict(temp_img_copy, "image")
            print("SUCCESS: Image prediction returned successfully:")
            print(res_img)
        except Exception as e:
            print(f"ERROR: Image prediction failed: {str(e)}")
            import traceback
            traceback.print_exc()
    else:
        print(f"WARNING: Sample image not found at {sample_image}, skipping image verification.")

    print("\n==================================================")
    print("Verification completed.")
    print("==================================================")

if __name__ == "__main__":
    verify_all()
