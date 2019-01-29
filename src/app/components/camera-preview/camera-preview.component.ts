import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-camera-preview',
  templateUrl: './camera-preview.component.html',
  styleUrls: ['./camera-preview.component.scss']
})
export class CameraPreviewComponent implements OnInit, OnDestroy {
  @ViewChild('cameraPreview') cameraPreview: any;
  private _video: HTMLVideoElement;
  private _navigator: Navigator;
  private _stream: MediaStream;
  ngOnDestroy() {
    this.stopAllMediaTrack();
  }

  ngOnInit() {
    this._video = this.cameraPreview.nativeElement;
    this._navigator = window.navigator;
  }

  initMediaDevice(audio: boolean) {
    const vgaConstraints = {
      audio: audio,
      video: { width: { exact: 640 }, height: { exact: 480 } }
    };
    this._navigator.mediaDevices
      .getUserMedia(vgaConstraints)
      .then((stream: MediaStream) => {
        this._stream = stream;
        this._video.srcObject = stream;
        this._video.play();
      })
      .catch(err => {
        console.error(err);
      });
  }

  onToggleChange($event: MatSlideToggleChange) {
    if ($event.checked) {
      this.initMediaDevice(false);
    } else {
      this.stopAllMediaTrack();
      this._video.pause();
    }
  }

  private stopAllMediaTrack() {
    this._stream.getTracks().forEach(track => {
      track.stop();
    });
  }

  getCameraFilters(): string[] {
    const filters = [
      '',
      'grayscale',
      'sepia',
      'blur',
      'brightness',
      'contrast',
      'hue-rotate',
      'hue-rotate2',
      'hue-rotate3',
      'saturate',
      'invert'
    ];
    return filters;
  }

  onFilterChange($event: string) {
    this._video.className = $event;
  }
}
