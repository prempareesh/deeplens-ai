import os
import time
import torch
from backend.ai_model.cvit import CViT
from backend.utils.face_helpers import df_face_video, df_face_image, device

class PredictionService:
    def __init__(self):
        self.model = None
        self.network_type = "cvit2"
        self.weights_file = "cvit2_deepfake_detection_ep_50.pth"

    def load_model(self):
        """Loads the CViT2 model and its pretrained weights."""
        if self.model is not None:
            return

        print(f"Loading {self.network_type} model onto {device}...")
        
        # Instantiate CViT model exactly as in training/inference script
        self.model = CViT(
            image_size=224, 
            patch_size=7, 
            num_classes=2, 
            channels=512,
            dim=1024, 
            depth=6, 
            heads=8, 
            mlp_dim=2048
        )
        self.model.to(device)

        # Look for weights in the weight/ directory under root or backend/ai_model/weights/
        weights_path = os.path.join("weight", self.weights_file)
        if not os.path.exists(weights_path):
            raise FileNotFoundError(f"Pretrained weights not found at {weights_path}")

        checkpoint = torch.load(weights_path, map_location=torch.device('cpu'))
        
        if 'state_dict' in checkpoint:
            self.model.load_state_dict(checkpoint['state_dict'])
        else:
            self.model.load_state_dict(checkpoint)

        self.model.eval()
        print("Model loaded successfully.")

    def max_prediction_value(self, y_pred):
        """Aggregates frame predictions and computes predicted class and confidence."""
        mean_val = torch.mean(y_pred, dim=0)

        if mean_val.numel() == 1:
            mean_val = y_pred

        predicted_class_idx = torch.argmax(mean_val).item()
        
        # Calculate standard fake score matching the repository's logic
        if mean_val[0] > mean_val[1]:
            fake_score = mean_val[0].item()
        else:
            fake_score = abs(1 - mean_val[1]).item()

        # Class 0: REAL (fake_score < 0.5), Class 1: FAKE (fake_score >= 0.5)
        if predicted_class_idx == 1:
            prediction_label = "REAL"
            confidence = 1.0 - fake_score
        else:
            prediction_label = "FAKE"
            confidence = fake_score
        
        # Convert confidence to percentage format
        confidence_pct = round(confidence * 100, 2)
        
        return prediction_label, confidence_pct

    def predict(self, file_path: str, media_type: str):
        """Runs the complete inference pipeline on the input media file."""
        self.load_model()
        
        start_time = time.perf_counter()
        
        try:
            if media_type == "video":
                df = df_face_video(file_path, num_frames=15)
            elif media_type == "image":
                df = df_face_image(file_path)
            else:
                raise ValueError("Unsupported media type.")

            if df is None or len(df) == 0:
                raise ValueError("No face detected in the input media.")

            # Run forward pass through the model
            with torch.no_grad():
                outputs = self.model(df)
                y_pred = torch.sigmoid(outputs.squeeze())
                prediction, confidence = self.max_prediction_value(y_pred)
            
            processing_time = round(time.perf_counter() - start_time, 2)
            
            return {
                "prediction": prediction,
                "confidence": confidence,
                "processing_time": processing_time,
                "media_type": media_type
            }

        except Exception as e:
            raise e
        finally:
            # Clean up the uploaded temporary file
            if os.path.exists(file_path):
                try:
                    os.remove(file_path)
                except Exception as cleanup_err:
                    print(f"Failed to remove temp file {file_path}: {str(cleanup_err)}")

prediction_service = PredictionService()
