import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

interface Photo {
  height: number,
  width: number,
  uri: string,
  exif?: Object,
  base64?: string
}

export default function App() {
  const camera = useRef<Camera>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      setIsLoading(false);
    })();
  }, []);

  function scan(photo: Photo) {
    console.log(photo);
  }

  if (isLoading) {
    return <View />;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={camera}
        onCameraReady={() => setIsCameraReady(true)}
      >
        <View style={styles.buttonContainer}>
          {isCameraReady && <TouchableOpacity
            style={styles.shutter}
            onPress={() => {
              if (!camera.current) return;
              camera.current.takePictureAsync({
                quality: 1,
                base64: false,
                exif: false,
                onPictureSaved: scan
              });
            }}
          >
            <Text style={styles.text}>scan</Text>
          </TouchableOpacity>}
        </View>
      </Camera>
    </View>
  );
}

/* @hide const styles = StyleSheet.create({ ... }); */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  shutter: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20

  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});
/* @end */
