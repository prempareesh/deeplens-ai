import os
import cv2
import torch
import dlib
import face_recognition
from torchvision import transforms
import numpy as np
from tqdm import tqdm
from PIL import Image
from decord import VideoReader, cpu
from backend.utils.loader import normalize_data

device = 'cuda' if torch.cuda.is_available() else 'cpu'

# We initialize mtcnn, blazeface, etc. if needed, but the original project uses face_recognition by default.
# We will use face_recognition for face detection, matching original pipeline.

def face_rec(frames):
    temp_face = np.zeros((len(frames), 224, 224, 3), dtype=np.uint8)
    count = 0
    mod = "cnn" if dlib.DLIB_USE_CUDA else "hog"
    padding = 10
    for frame in frames:
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        try:
            face_locations = face_recognition.face_locations(
                frame_rgb, number_of_times_to_upsample=0, model=mod
            )

            for face_location in face_locations:
                if count < len(frames):
                    top, right, bottom, left = face_location
                    top = max(0, top - padding)
                    bottom = min(frame.shape[0], bottom + padding)
                    left = max(0, left - padding)
                    right = min(frame.shape[1], right + padding)
                        
                    face_image = frame[top:bottom, left:right]
                    if face_image.size > 0:
                        face_image = cv2.resize(
                            face_image, (224, 224), interpolation=cv2.INTER_AREA
                        )
                        # The prediction expects RGB format, let's make sure it is converted properly
                        face_image_rgb = cv2.cvtColor(face_image, cv2.COLOR_BGR2RGB)
                        temp_face[count] = face_image_rgb
                        count += 1
                else:
                    break
        except Exception as e:
            print(f'Error encountered in face detection: {str(e)}')

    return ([], 0) if count == 0 else (temp_face[:count], count)


def preprocess_frame(frame):
    df_tensor = torch.tensor(frame, device=device).float()
    df_tensor = df_tensor.permute((0, 3, 1, 2))

    for i in range(len(df_tensor)):
        df_tensor[i] = normalize_data()["vid"](df_tensor[i] / 255.0)

    return df_tensor


def extract_frames(video_file, frames_nums=15):
    vr = VideoReader(video_file, ctx=cpu(0))
    step_size = max(1, len(vr) // frames_nums)
    frame_indices = list(range(0, len(vr), step_size))[:frames_nums]
    return vr.get_batch(frame_indices).asnumpy()


def df_face_video(vid, num_frames=15):
    img = extract_frames(vid, num_frames)
    face, count = face_rec(img)
    if count > 0:
        return preprocess_frame(face)
    return None


def df_face_image(img_path):
    frame = cv2.imread(img_path)
    if frame is None:
        raise ValueError("Could not read image file.")
    face, count = face_rec([frame])
    if count > 0:
        return preprocess_frame(face)
    return None
