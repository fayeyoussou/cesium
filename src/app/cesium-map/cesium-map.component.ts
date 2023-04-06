import { Component, OnInit } from '@angular/core';
import { Viewer, Cartesian3, Color, Entity, PointGraphics, SceneMode, ScreenSpaceEventHandler, ScreenSpaceEventType, Cartographic } from 'cesium';
import * as Cesium from 'cesium';

@Component({
  selector: 'app-cesium-map',
  templateUrl: './cesium-map.component.html',
  styleUrls: ['./cesium-map.component.css']
})
export class CesiumMapComponent implements OnInit {
  viewer!: Viewer;

  constructor() { }

  ngOnInit(): void {
    this.setCesium()
    this.setClickMap()
    this.setHoverOnMap()



  }
  setCesium() {
    this.viewer = new Cesium.Viewer('cesium-container', {
      terrainProvider: new Cesium.CesiumTerrainProvider({
        url: Cesium.IonResource.fromAssetId(1)
      })
    });
    this.viewer.scene.mode = Cesium.SceneMode.SCENE2D;

    // Set the sandbox attribute for the div element
    const cesiumContainer = document.getElementById('cesium-container');
    if (cesiumContainer) {
      cesiumContainer.setAttribute('sandbox', 'allow-scripts');
    }

    this.viewer.infoBox.frame.removeAttribute("sandbox");
    this.viewer.infoBox.frame.src = "about:blank";
  }
  setClickMap() {
    const handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);
    handler.setInputAction((clickEvent: any) => {
      const position = this.viewer.scene.camera.pickEllipsoid(
        clickEvent.position,
        this.viewer.scene.globe.ellipsoid
      );
      console.log(position);
      const cartographicPosition = Cesium.Cartographic.fromCartesian(position as Cartesian3);
      const longitude = Cesium.Math.toDegrees(cartographicPosition.longitude);
      const latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);
      console.log("long :", longitude, "lat :", latitude);
      if (Cesium.defined(position)) {
        const point = this.viewer.entities.add({
          position: position,
          point: {
            pixelSize: 10,
            color: Cesium.Color.RED
          }
        });
      }
      console.log(this.viewer.entities)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
  setHoverOnMap() {
    const handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);
    const tooltip = document.querySelector('#cesium-tooltip') as HTMLElement;

    handler.setInputAction((movement: any) => {
      const position = this.viewer.scene.camera.pickEllipsoid(
        movement.endPosition,
        this.viewer.scene.globe.ellipsoid
      );
      if (Cesium.defined(position) && position) {
        const cartographicPosition = Cesium.Cartographic.fromCartesian(position);
        const longitudeString = Cesium.Math.toDegrees(cartographicPosition.longitude).toFixed(5);
        const latitudeString = Cesium.Math.toDegrees(cartographicPosition.latitude).toFixed(5);
        tooltip.innerHTML = `<p>${longitudeString} , ${latitudeString}</p>`;
        tooltip.style.top = (movement.endPosition.y + window.pageYOffset + 20) + 'px';
        tooltip.style.left = (movement.endPosition.x + window.pageXOffset + 20) + 'px';
        tooltip.style.display = 'block';
      } else {
        tooltip.style.display = 'none';
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    handler.setInputAction(() => {
      tooltip.style.display = 'none';
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }
  showPositions() {
    this.viewer.entities.values.forEach((entity: Entity) => {
      if (entity.position != undefined) {
        const position = entity.position.getValue(Cesium.JulianDate.now());
        if (Cesium.defined(position)) {
          const cartographic = Cesium.Cartographic.fromCartesian(position as Cartesian3);
          const longitude = Cesium.Math.toDegrees(cartographic.longitude);
          const latitude = Cesium.Math.toDegrees(cartographic.latitude);
          console.log(`Entity ID: ${entity.id}, Lat: ${latitude}, Long: ${longitude}`);
        }
      }
    });
  }
}
