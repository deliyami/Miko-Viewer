import { Pose } from '@mediapipe/pose';

export const aPose = new Pose({
  locateFile: file => {
    // CDN ,  pose.send해야 가져옴.
    //  pose_landmark_full.tflite
    //  pose_solution_packed_assets_loader.js
    //  pose_solution_simd_wasm_bin.js
    //  pose_web.binarypb
    //  pose_solution_packed_assets.data
    //  pose_solution_simd_wasm_bin.wasm
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
  },
});

aPose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: true,
  smoothSegmentation: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
