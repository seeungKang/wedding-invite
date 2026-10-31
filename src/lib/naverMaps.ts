type MapInstance = {
  destroy(): void;
  setSize(size: { width: number; height: number }): void;
};

type MarkerInstance = { setMap(map: MapInstance | null): void };

export type NaverMaps = {
  LatLng: new (latitude: number, longitude: number) => object;
  Map: new (container: HTMLElement, options: Record<string, unknown>) => MapInstance;
  Marker: new (options: Record<string, unknown>) => MarkerInstance;
};

type MapsWindow = Window & {
  naver?: { maps?: NaverMaps };
  weddingMapReady?: () => void;
  navermap_authFailure?: () => void;
};

let sdkPromise: Promise<NaverMaps> | undefined;

export function loadNaverMaps(keyId: string): Promise<NaverMaps> {
  const host = window as MapsWindow;
  if (host.naver?.maps) {return Promise.resolve(host.naver.maps);}
  if (sdkPromise) {return sdkPromise;}

  sdkPromise = new Promise<NaverMaps>((resolve, reject) => {
    const script = document.createElement("script");
    const cleanup = () => {
      window.clearTimeout(timer);
      delete host.weddingMapReady;
      script.onerror = null;
      script.onload = null;
    };
    const fail = (reason = "SDK_LOAD_FAILED") => {
      cleanup();
      script.remove();
      reject(new Error(reason));
    };
    const timer = window.setTimeout(() => fail("SDK_TIMEOUT"), 15000);
    host.weddingMapReady = () => {
      const maps = host.naver?.maps;
      if (!maps) {return;}
      cleanup();
      resolve(maps);
    };
    host.navermap_authFailure = () => {
      window.dispatchEvent(new Event("naver-map-auth-failed"));
      fail("SDK_AUTH_FAILED");
    };
    script.async = true;
    script.onload = () => {
      if (host.naver?.maps) {
        host.weddingMapReady?.();
      }
    };
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(keyId)}&callback=weddingMapReady`;
    script.onerror = () => fail("SDK_NETWORK_FAILED");
    document.head.append(script);
  }).catch((error: unknown) => {
    sdkPromise = undefined;
    throw error;
  });
  return sdkPromise;
}
