<template>
  <div id="cesiumContainer"></div>
</template>

<script>
import 'cesium/Source/Widgets/widgets.css'
import { Viewer, FeatureDetection, Ion, Cartesian3, Math } from 'cesium'
export default {
  mounted() {
    Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyZGIwMzRiMC00ODU0LTQyMmYtODk3YS1mNmY4NGE4NzA1YmIiLCJpZCI6OTA1OTUsImlhdCI6MTY1MDQ1NTIyMH0.m9TtQ1gFbbO-T3yLFVW-9zDfToZK6MKDXETIsfFkj4U'
    const viewer = new Viewer('cesiumContainer')
    this.init(viewer)
    this.setCenter(viewer)
  },
  methods: {
    init(viewer) {
      if (FeatureDetection.supportsImageRenderingPixelated()) {
        // 判断是否支持图像渲染像素化处理
        viewer.resolutionScale = window.devicePixelRatio
      }
      viewer.scene.postProcessStages.fxaa.enabled = true
    },
    setCenter(viewer) {
      viewer.camera.flyTo({
        // Cesium的坐标是以地心为原点，一向指向南美洲，一向指向亚洲，一向指向北极州
        // fromDegrees()方法，将经纬度和高程转换为世界坐标
        destination: Cartesian3.fromDegrees(108.95, 34.26, 5000000.0),
        orientation: {
          // 指向
          heading: Math.toRadians(0, 0),
          // 视角
          pitch: Math.toRadians(-90),
          roll: 0.0
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#cesiumContainer {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
